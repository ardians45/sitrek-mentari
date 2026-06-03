/**
 * Main Entry Point - Mengatur inisialisasi tracker di halaman Mentari
 */
import { storage, STORAGE_KEYS } from '../core/storage.js';
import { api } from '../core/api.js';
import { trackerUI } from '../components/tracker-ui.js';
import { initInterceptor } from '../core/interceptor.js';

async function initTracker() {
  const isMyUnpam = window.location.hostname.includes('my.unpam.ac.id');
  console.log(`SITREK Tracker: Initializing (isMyUnpam: ${isMyUnpam})...`);

  // 1. Jalankan penangkap token
  initInterceptor();

  if (isMyUnpam) {
    // Inisialisasi Presensi Tracker di my.unpam.ac.id
    trackerUI.createContainer(true);

    // Expose detail modal handler
    window.runTokenPresensiDetails = (data) => trackerUI.showPresensiDetails(data);

    // Load cached presensi data
    const cachedPresensi = storage.get(STORAGE_KEYS.PRESENSI_DATA);
    if (cachedPresensi) {
      trackerUI.updatePresensiList(cachedPresensi);
    }

    const lastSyncTime = storage.get(STORAGE_KEYS.LAST_UPDATE, false);
    const syncText = document.getElementById('last-sync');
    if (lastSyncTime && syncText) {
      syncText.innerText = `Updated: ${lastSyncTime}`;
    }

    // Event Listeners
    const refreshBtn = document.getElementById('refresh-tracker');
    const toggleBtn = document.getElementById('toggle-tracker');
    const header = document.querySelector('.tracker-header');

    if (refreshBtn) refreshBtn.addEventListener('click', syncPresensiData);
    if (toggleBtn) toggleBtn.addEventListener('click', toggleUI);
    if (header) {
      header.addEventListener('click', (e) => {
        if (e.target.closest('.tracker-actions')) return;
        toggleUI();
      });
    }
  } else {
    // Inisialisasi Forum Tracker di mentari.unpam.ac.id
    trackerUI.createContainer(false);
    
    // Load cached data
    const cachedCourses = storage.get(STORAGE_KEYS.COURSE_DATA);
    if (cachedCourses) {
      trackerUI.updateList(cachedCourses);
    }

    const cachedStudents = storage.get(STORAGE_KEYS.STUDENT_DATA);
    if (cachedStudents) {
      trackerUI.updateStudents(cachedStudents);
    }

    const cachedNotifs = storage.get(STORAGE_KEYS.NOTIFICATIONS);
    if (cachedNotifs) {
      trackerUI.updateNotifications(cachedNotifs);
    }

    const userInfo = storage.get(STORAGE_KEYS.USER_INFO);
    trackerUI.updateProfile(userInfo, cachedCourses);

    const lastSyncTime = storage.get(STORAGE_KEYS.LAST_UPDATE, false);
    const syncText = document.getElementById('last-sync');
    if (lastSyncTime && syncText) {
        syncText.innerText = `Updated: ${lastSyncTime}`;
    }

    // Event Listeners
    const refreshBtn = document.getElementById('refresh-tracker');
    const toggleBtn = document.getElementById('toggle-tracker');
    const header = document.querySelector('.tracker-header');

    if (refreshBtn) refreshBtn.addEventListener('click', syncData);
    if (toggleBtn) toggleBtn.addEventListener('click', toggleUI);
    
    const shareBtn = document.getElementById('share-summary');
    if (shareBtn) shareBtn.addEventListener('click', generateWASummary);

    if (header) {
      header.addEventListener('click', (e) => {
        if (e.target.closest('.tracker-actions')) return;
        toggleUI();
      });
    }
  }
}

async function syncData() {
  const refreshBtn = document.getElementById('refresh-tracker');
  if (!refreshBtn) return;
  
  try {
    trackerUI.setLoading(true);
    refreshBtn.disabled = true;

    // Pastikan token tersedia
    const token = api.getAuthToken();
    if (!token) {
        throw new Error("Token belum ditemukan. Coba refresh halaman atau login ulang.");
    }

    console.log("Mentari Tracker: Starting sync...");

    // Ambil daftar mata kuliah
    const coursesResponse = await api.getCourses();
    if (!coursesResponse || !coursesResponse.data) throw new Error("Invalid response from courses API");
    
    const courseList = coursesResponse.data;
    const notifications = [];
    const studentMap = new Map();

    // Ambil detail seluruh mata kuliah secara paralel
    const detailedPromises = courseList.map(course => 
      api.getCourseDetail(course.kode_course).catch(err => {
        console.warn(`Failed to fetch detail for ${course.kode_course}`, err);
        return null;
      })
    );
    const detailedCoursesRaw = await Promise.all(detailedPromises);
    const detailedCourses = detailedCoursesRaw.filter(c => c !== null);

    // Get my user info to identify my posts
    const userInfo = storage.get(STORAGE_KEYS.USER_INFO);
    let myNim = userInfo?.username || userInfo?.nim;
    const myName = userInfo?.name || "";

    // Fallback decode token if myNim not found
    if (!myNim && token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const payload = JSON.parse(jsonPayload);
        myNim = payload?.username || payload?.nim;
      } catch (e) {
        console.warn("Failed to decode token for myNim fallback:", e);
      }
    }

    console.log('[SITREK DEBUG] userInfo:', JSON.stringify(userInfo));
    console.log('[SITREK DEBUG] myNim:', myNim);
    console.log('[SITREK DEBUG] myName:', myName);

    // Extract students (peserta)
    detailedCourses.forEach(detail => {
      if (detail.peserta && Array.isArray(detail.peserta)) {
        detail.peserta.forEach(s => {
          if (!studentMap.has(s.nim)) {
            studentMap.set(s.nim, {
              nim: s.nim,
              nama: s.nama_mahasiswa || s.nama || s.fullname || "Unknown"
            });
          }
        });
      }
    });

    // Helper: nomor pertemuan → nomor pekan
    function getPekan(isIntensive, pert) {
      if (isIntensive) {
        if (pert % 3 === 1) return Math.floor(pert / 3) * 2 + 1;
        if (pert % 3 === 2) return Math.floor(pert / 3) * 2 + 2;
        return (pert / 3) * 2;
      }
      return pert;
    }

    // Helper: apakah forum ini sudah dibuka?
    function isForumOpened(f) {
      return f.kode_template === "FORUM_DISKUSI" && (f.id || f.id_trx_course_sub_section);
    }

    // Hitung opened pekan untuk voting pekan aktif
    const pekanVotes = {};
    detailedCourses.forEach(course => {
      let maxPertNum = 0;
      course.data.forEach(s => {
        const match = s.kode_section.match(/\d+/);
        if (match) maxPertNum = Math.max(maxPertNum, parseInt(match[0]));
      });
      const isIntensive = maxPertNum > 14;

      course.data.forEach(s => {
        const hasOpenedForum = s.sub_section.some(f => isForumOpened(f));
        if (hasOpenedForum) {
          const match = s.kode_section.match(/\d+/);
          if (match) {
            const pertNum = parseInt(match[0]);
            const p = getPekan(isIntensive, pertNum);
            pekanVotes[p] = (pekanVotes[p] || 0) + 1;
          }
        }
      });
    });

    // Ambil pekan dengan suara terbanyak (majority week)
    let majorityWeek = 1;
    let maxVotes = 0;
    for (const p in pekanVotes) {
      const pekan = parseInt(p);
      const votes = pekanVotes[p];
      if (votes > maxVotes || (votes === maxVotes && pekan > majorityWeek)) {
        maxVotes = votes;
        majorityWeek = pekan;
      }
    }
    console.log(`[SITREK DEBUG] Calculated majorityWeek: ${majorityWeek}`);

    // Dapatkan daftar forum aktif yang belum selesai dikerjakan
    const forumsToFetch = [];
    detailedCourses.forEach(detail => {
      detail.data.forEach(section => {
        section.sub_section.forEach(sub => {
          if (sub.kode_template === "FORUM_DISKUSI") {
            const forumId = sub.id_trx_course_sub_section || sub.id;
            // Hanya fetch forum yang aktif (ada forumId) dan belum selesai (completion !== true)
            if (forumId && sub.completion !== true) {
              forumsToFetch.push({ forumId, forum: sub, detail });
            }
          }
        });
      });
    });

    console.log(`[SITREK DEBUG] Total forums to fetch: ${forumsToFetch.length}`);

    // Jalankan pemindaian topik forum secara paralel
    const forumPromises = forumsToFetch.map(async ({ forumId, forum, detail }) => {
      try {
        const topicsResponse = await api.getForumTopics(forumId);

        let allPosts = [];
        let hasTopics = false;
        if (topicsResponse?.id && Array.isArray(topicsResponse?.data)) {
          allPosts = topicsResponse.data;
          hasTopics = allPosts.length > 0;
        } else if (Array.isArray(topicsResponse?.topics)) {
          hasTopics = topicsResponse.topics.length > 0;
          topicsResponse.topics.forEach(t => {
            if (t.data && Array.isArray(t.data)) {
              allPosts.push(...t.data);
            }
          });
        }

        forum.hasTopics = hasTopics;

        if (myNim && allPosts.length > 0) {
          const myPosts = allPosts.filter(p => p.nim === myNim);
          const myPostIds = new Set(myPosts.map(p => p.id));

          if (myPostIds.size > 0) {
            // 1. Direct Replies ke post saya
            const repliesToMe = allPosts.filter(p =>
              p.id_parent !== null &&
              myPostIds.has(p.id_parent) &&
              p.nim !== myNim
            );

            repliesToMe.forEach(reply => {
              const isLecturer = reply.id_dosen !== null;
              notifications.push({
                id: reply.id,
                author: isLecturer
                  ? (reply.dosen?.nama_gelar || reply.dosen?.nama_dosen || 'Dosen')
                  : (reply.mahasiswa?.nama_mahasiswa || 'Mahasiswa'),
                type: isLecturer ? 'lecturer' : 'student',
                text: reply.konten
                  ? reply.konten.replace(/<[^>]*>/g, '').substring(0, 120) + '...'
                  : 'Melihat balasan baru',
                time: reply.createdAt,
                forumUrl: `https://mentari.unpam.ac.id/u-courses/${detail.kode_course}/forum/${forumId}`,
                courseName: detail.coursename
              });
            });

            // 2. Postingan Dosen baru setelah post saya
            const myFirstPostTime = new Date(Math.min(...myPosts.map(p => new Date(p.createdAt))));
            const lecturerPosts = allPosts.filter(p => 
              p.id_dosen !== null && 
              new Date(p.createdAt) > myFirstPostTime
            );

            lecturerPosts.forEach(reply => {
              notifications.push({
                id: reply.id,
                author: reply.dosen?.nama_gelar || reply.dosen?.nama_dosen || 'Dosen',
                type: 'lecturer',
                text: reply.konten
                  ? reply.konten.replace(/<[^>]*>/g, '').substring(0, 120) + '...'
                  : 'Dosen memposting tanggapan baru',
                time: reply.createdAt,
                forumUrl: `https://mentari.unpam.ac.id/u-courses/${detail.kode_course}/forum/${forumId}`,
                courseName: detail.coursename
              });
            });

            // 3. Mention nama panggilan saya di postingan orang lain setelah post saya
            if (myName) {
              const myFirstNames = myName.split(' ').filter(n => n.length > 2);
              if (myFirstNames.length > 0) {
                const otherPostsAfterMe = allPosts.filter(p =>
                  p.nim !== myNim &&
                  p.id_dosen === null &&
                  new Date(p.createdAt) > myFirstPostTime &&
                  !myPostIds.has(p.id_parent)
                );

                otherPostsAfterMe.forEach(post => {
                  const contentText = (post.konten || "").toLowerCase();
                  const isMentioned = myFirstNames.some(name => contentText.includes(name.toLowerCase()));
                  if (isMentioned) {
                    notifications.push({
                      id: post.id,
                      author: post.mahasiswa?.nama_mahasiswa || 'Mahasiswa',
                      type: 'student',
                      text: `[Mention] ${post.konten ? post.konten.replace(/<[^>]*>/g, '').substring(0, 120) + '...' : 'Menyebut nama Anda'}`,
                      time: post.createdAt,
                      forumUrl: `https://mentari.unpam.ac.id/u-courses/${detail.kode_course}/forum/${forumId}`,
                      courseName: detail.coursename
                    });
                  }
                });
              }
            }
          }
        }
      } catch (err) {
        forum.hasTopics = false;
        if (!err.message.includes('404')) {
          console.warn(`Gagal fetch forum ${forumId}`, err);
        }
      }
    });

    await Promise.all(forumPromises);


    const uniqueStudents = Array.from(studentMap.values());
    uniqueStudents.sort((a, b) => a.nama.localeCompare(b.nama));

    // Deduplicate by id, sort by time desc, keep 20
    const seen = new Set();
    const uniqueNotifs = notifications.filter(n => {
      if (seen.has(n.id)) return false;
      seen.add(n.id);
      return true;
    });
    uniqueNotifs.sort((a, b) => new Date(b.time) - new Date(a.time));
    const latestNotifications = uniqueNotifs.slice(0, 20);

    // Simpan data
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    storage.save(STORAGE_KEYS.COURSE_DATA, detailedCourses);
    storage.save(STORAGE_KEYS.STUDENT_DATA, uniqueStudents);
    storage.save(STORAGE_KEYS.NOTIFICATIONS, latestNotifications);
    storage.save(STORAGE_KEYS.LAST_UPDATE, now);
    
    // Update UI
    trackerUI.updateList(detailedCourses);
    trackerUI.updateStudents(uniqueStudents);
    trackerUI.updateNotifications(latestNotifications);
    
    // Update Profile
    const updatedUserInfo = storage.get(STORAGE_KEYS.USER_INFO);
    trackerUI.updateProfile(updatedUserInfo, detailedCourses);
    
    const syncText = document.getElementById('last-sync');
    if (syncText) syncText.innerText = `Updated: ${now}`;

  } catch (error) {
    console.error("Mentari Tracker: Sync failed:", error);
    alert(error.message || "Gagal sinkronisasi.");
  } finally {
    trackerUI.setLoading(false);
    refreshBtn.disabled = false;
  }
}

async function syncPresensiData() {
  const refreshBtn = document.getElementById('refresh-tracker');
  if (!refreshBtn) return;

  try {
    trackerUI.setLoading(true);
    refreshBtn.disabled = true;

    const token = api.getAuthToken();
    if (!token) {
      throw new Error("Token belum ditemukan. Coba refresh halaman, login ulang, atau buka menu presensi.");
    }

    console.log("Presensi Tracker: Starting sync...");

    // Fetch daftar jadwal kuliah
    const jadwalKuliah = await api.getJadwalKuliah();
    if (!jadwalKuliah || !jadwalKuliah.length) {
      throw new Error("Tidak ada jadwal kuliah yang ditemukan.");
    }

    console.log(`Ditemukan ${jadwalKuliah.length} mata kuliah`);

    // Ambil rincian pertemuan secara paralel
    const presensiPromises = jadwalKuliah.map(async (jadwal) => {
      const { id_kelas, id_mata_kuliah, nama_mata_kuliah, sks } = jadwal;
      try {
        const presensiPertemuan = await api.getPresensiPertemuan(id_kelas, id_mata_kuliah);
        return {
          nama_mata_kuliah,
          id_mata_kuliah,
          id_kelas,
          sks,
          pertemuan: presensiPertemuan
        };
      } catch (err) {
        console.warn(`Gagal mengambil data presensi untuk ${nama_mata_kuliah}:`, err);
        return {
          nama_mata_kuliah,
          id_mata_kuliah,
          id_kelas,
          sks,
          pertemuan: []
        };
      }
    });

    const allPresensiData = await Promise.all(presensiPromises);

    // Simpan data
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    storage.save(STORAGE_KEYS.PRESENSI_DATA, allPresensiData);
    storage.save(STORAGE_KEYS.LAST_UPDATE, now);

    // Update UI
    trackerUI.updatePresensiList(allPresensiData);

    const syncText = document.getElementById('last-sync');
    if (syncText) syncText.innerText = `Updated: ${now}`;

  } catch (error) {
    console.error("Presensi Tracker: Sync failed:", error);
    alert(error.message || "Gagal sinkronisasi data presensi.");
  } finally {
    trackerUI.setLoading(false);
    refreshBtn.disabled = false;
  }
}

function toggleUI() {
  const app = document.getElementById('mentari-tracker-app');
  if (app) app.classList.toggle('tracker-collapsed');
}

function generateWASummary() {
  const data = storage.get(STORAGE_KEYS.COURSE_DATA);
  if (!data) return alert("Sync data dulu!\n\nTekan tombol 🔄 untuk mengambil data terbaru.");

  // Helper: nomor pertemuan → nomor pekan
  function getPekan(isIntensive, pert) {
    if (isIntensive) {
      // Pola Intensif (3 SKS): 
      // Pekan ganjil (1, 3, 5) -> 1 pertemuan (pert 1, 4, 7, 10, 13)
      // Pekan genap (2, 4, 6) -> 2 pertemuan (pert 2&3, 5&6, 8&9, 11&12, 14&15)
      if (pert % 3 === 1) return Math.floor(pert / 3) * 2 + 1; // 1, 4, 7 -> 1, 3, 5
      if (pert % 3 === 2) return Math.floor(pert / 3) * 2 + 2; // 2, 5, 8 -> 2, 4, 6
      return (pert / 3) * 2; // 3, 6, 9 -> 2, 4, 6
    }
    return pert;
  }

  // Helper: nomor pekan → pertemuan apa saja yang ada di pekan itu
  function getExpectedPerts(isIntensive, pekan) {
    if (isIntensive) {
      if (pekan % 2 === 1) { // Pekan ganjil
        return [Math.floor((pekan - 1) / 2) * 3 + 1];
      } else { // Pekan genap
        return [
          Math.floor((pekan - 2) / 2) * 3 + 2,
          Math.floor((pekan - 2) / 2) * 3 + 3
        ];
      }
    }
    return [pekan];
  }

  // Helper: apakah forum ini sudah dibuka? (termasuk yang belum diisi topik/Empty)
  function isForumOpened(f) {
    return f.kode_template === "FORUM_DISKUSI" &&
           (f.id || f.id_trx_course_sub_section);
  }

  // 1. Ekstrak info tiap matkul & voting pekan
  const coursesInfo = data.map(course => {
    const sksMatch = course.coursename.match(/^\[(\d+)\]/);
    const sks = sksMatch ? parseInt(sksMatch[1]) : 0;
    const cleanName = course.coursename.split("#")[0].replace(/^\[\d+\]\s*/, '').trim().toUpperCase();

    let maxPertNum = 0;
    course.data.forEach(s => {
      const match = s.kode_section.match(/\d+/);
      if (match) maxPertNum = Math.max(maxPertNum, parseInt(match[0]));
    });
    const isIntensive = maxPertNum > 14;

    // Kumpulkan pekan-pekan yang sudah dibuka
    const openedPekans = new Set();
    course.data.forEach(s => {
      const hasOpenedForum = s.sub_section.some(f => isForumOpened(f));
      if (hasOpenedForum) {
        const match = s.kode_section.match(/\d+/);
        if (match) {
          const pertNum = parseInt(match[0]);
          openedPekans.add(getPekan(isIntensive, pertNum));
        }
      }
    });

    return { cleanName, sks, isIntensive, openedPekans, originalData: course.data };
  });

  // 2. Voting: pekan mana yang paling banyak matkul aktifnya?
  const pekanVotes = {};
  coursesInfo.forEach(c => {
    c.openedPekans.forEach(p => {
      pekanVotes[p] = (pekanVotes[p] || 0) + 1;
    });
  });

  if (Object.keys(pekanVotes).length === 0) {
    return alert("Tidak ada pertemuan aktif terdeteksi.\n\n• Pastikan dosen sudah membuka forum diskusi\n• Coba tekan 🔄 untuk sync ulang");
  }

  // Ambil pekan dengan voting tertinggi (jika seri, ambil yang lebih besar = lebih baru)
  let majorityWeek = 1;
  let maxVotes = 0;
  for (const p in pekanVotes) {
    const pekan = parseInt(p);
    const votes = pekanVotes[p];
    if (votes > maxVotes || (votes === maxVotes && pekan > majorityWeek)) {
      maxVotes = votes;
      majorityWeek = pekan;
    }
  }

  // 3. Bangun daftar matkul yang aktif di pekan ini
  const activeCourses = [];
  let totalSks = 0;

  coursesInfo.forEach(c => {
    const expectedPerts = getExpectedPerts(c.isIntensive, majorityWeek);

    const activePertsThisWeek = [];
    let hasEmpty = false;

    expectedPerts.forEach(pert => {
      const section = c.originalData.find(s => {
        const m = s.kode_section.match(/\d+/);
        return m && parseInt(m[0]) === pert;
      });
      if (section) {
        const forums = section.sub_section.filter(f => isForumOpened(f));
        if (forums.length > 0) {
          activePertsThisWeek.push(pert);
          if (forums.some(f => f.hasTopics === false)) {
            hasEmpty = true;
          }
        }
      }
    });

    if (activePertsThisWeek.length > 0) {
      // Format teks pertemuan: "pert 8", "pert 4 & 5", dll
      const perts = activePertsThisWeek;
      let pertText;
      if (perts.length === 1) pertText = `*pert ${perts[0]}*`;
      else if (perts.length === 2) pertText = `*pert ${perts[0]} & ${perts[1]}*`;
      else {
        const last = perts[perts.length - 1];
        pertText = `*pert ${perts.slice(0, -1).join(', ')} & ${last}*`;
      }
      
      if (hasEmpty) {
        pertText += ` _(Belum ada topik)_`;
      }

      activeCourses.push({ name: c.cleanName, sks: c.sks, pertText });
      totalSks += c.sks;
    }
  });

  if (activeCourses.length === 0) {
    return alert(`Tidak ada matkul aktif di Pekan ${majorityWeek}.\n\nCoba sync ulang nanti.`);
  }

  // 4. Format teks output WA
  const today = new Date();
  const days    = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const months  = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const dateStr = `${days[today.getDay()]}, ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

  let text = `*MATKUL PEKAN ${majorityWeek}*\n`;
  text += `_${dateStr}_\n\n`;

  activeCourses.forEach((c, i) => {
    text += `${i + 1}. *${c.name}*\n`;
    text += `   ${c.pertText} | SKS ${c.sks}\n\n`;
  });

  text += `*TOTAL SKS: ${totalSks}*\n\n`;
  text += `*NOTED :* `;

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');
}

// Jalankan inisialisasi
if (document.readyState === 'complete') {
  initTracker();
} else {
  window.addEventListener('load', initTracker);
}

// Ekspos ke window agar bisa dipanggil dari popup
window.runToken = initTracker;
