/**
 * Main Entry Point - Mengatur inisialisasi tracker di halaman Mentari
 */
import { storage, STORAGE_KEYS } from '../core/storage.js';
import { api } from '../core/api.js';
import { trackerUI } from '../components/tracker-ui.js';
import { initInterceptor } from '../core/interceptor.js';

async function initTracker() {
  console.log("SITREK Mentari: Initializing...");

  // 1. Jalankan penangkap token
  initInterceptor();

  // 2. Buat UI
  trackerUI.createContainer();
  
  // 3. Load cached data
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

  const lastSyncTime = storage.get(STORAGE_KEYS.LAST_UPDATE, false);
  const syncText = document.getElementById('last-sync');
  if (lastSyncTime && syncText) {
      syncText.innerText = `Updated: ${lastSyncTime}`;
  }

  // 4. Event Listeners
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
    const detailedCourses = [];
    const studentMap = new Map();
    const notifications = [];

    // Get my user info to identify my posts
    const userInfo = storage.get(STORAGE_KEYS.USER_INFO);
    const myNim = userInfo?.username;

    for (const course of courseList) {
      try {
        const detail = await api.getCourseDetail(course.kode_course);
        if (detail) {
          detailedCourses.push(detail);
          
          // Extract students (peserta)
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

          // Fetch topics: tag hasTopics on each forum + collect notifications
          const activeForums = detail.data.flatMap(section =>
            section.sub_section.filter(sub => sub.kode_template === "FORUM_DISKUSI")
          );

          for (const forum of activeForums) {
            const forumId = forum.id_trx_course_sub_section || forum.id;
            if (!forumId) continue;

            try {
              const topicsResponse = await api.getForumTopics(forumId);
              const topicsData = topicsResponse?.data || topicsResponse?.topics || [];

              // Tag the forum object so tracker-ui can render the correct status
              forum.hasTopics = Array.isArray(topicsData) && topicsData.length > 0;

              if (forum.hasTopics) {
                for (const topic of topicsData) {
                  try {
                    const replies = await api.getForumReplies(topic.id);
                    if (replies && Array.isArray(replies)) {
                      replies.forEach(reply => {
                        const isFromMe = (reply.username === myNim || reply.nim === myNim);
                        const isLecturer = reply.id_dosen !== null;

                        if (!isFromMe && (isLecturer || reply.is_reply_to_me)) {
                          notifications.push({
                            author: isLecturer ? (reply.dosen?.nama_gelar || reply.dosen?.nama_dosen || "Dosen") : (reply.nama_mahasiswa || reply.nama || "Teman"),
                            time: new Date(reply.createdAt).toLocaleString(),
                            text: reply.konten ? reply.konten.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : "Melihat balasan baru",
                            type: isLecturer ? 'lecturer' : 'friend'
                          });
                        }
                      });
                    }
                  } catch (replyErr) {
                    console.warn(`Failed to fetch replies for topic ${topic.id}`, replyErr);
                  }
                }
              }
            } catch (err) {
              // Forum with no topics may return 404 — treat as empty (no topics yet)
              forum.hasTopics = false;
              if (!err.message.includes('404')) {
                console.warn(`Failed to fetch topics for forum ${forumId}`, err);
              }
            }
          }
        }
      } catch (e) {
        console.warn(`Failed to fetch detail for ${course.kode_course}`, e);
      }
    }

    const uniqueStudents = Array.from(studentMap.values());
    uniqueStudents.sort((a, b) => a.nama.localeCompare(b.nama));

    // Keep only latest 20 notifications
    notifications.sort((a, b) => new Date(b.time) - new Date(a.time));
    const latestNotifications = notifications.slice(0, 20);

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

function toggleUI() {
  const app = document.getElementById('mentari-tracker-app');
  if (app) app.classList.toggle('tracker-collapsed');
}

function generateWASummary() {
  const data = storage.get(STORAGE_KEYS.COURSE_DATA);
  if (!data) return alert("Sync data first!");

  function getPekan(isIntensive, pert) {
    if (isIntensive) {
      if (pert % 3 === 1) return Math.floor((pert - 1) / 3) * 2 + 1;
      if (pert % 3 === 2) return Math.floor((pert - 2) / 3) * 2 + 1;
      return (pert / 3) * 2;
    }
    return pert;
  }

  function getExpectedPerts(isIntensive, pekan) {
    if (isIntensive) {
      if (pekan % 2 === 1) return [Math.floor((pekan - 1) / 2) * 3 + 1, Math.floor((pekan - 1) / 2) * 3 + 2];
      return [(pekan / 2) * 3];
    }
    return [pekan];
  }

  // 1. Ekstrak data dasar & kumpulkan voting Pekan
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
    
    const activePekans = new Set();
    course.data.forEach(s => {
      const forums = s.sub_section.filter(f => f.kode_template === "FORUM_DISKUSI" && (f.id || f.id_trx_course_sub_section));
      if (forums.length > 0) {
        const match = s.kode_section.match(/\d+/);
        if (match) {
          const pertNum = parseInt(match[0]);
          activePekans.add(getPekan(isIntensive, pertNum));
        }
      }
    });

    return { cleanName, sks, isIntensive, activePekans, originalData: course.data };
  });

  // 2. Tentukan Pekan Mayoritas (Active Week)
  const pekanVotes = {};
  coursesInfo.forEach(c => {
    c.activePekans.forEach(p => {
      pekanVotes[p] = (pekanVotes[p] || 0) + 1;
    });
  });

  if (Object.keys(pekanVotes).length === 0) {
    return alert("Tidak ada pertemuan aktif yang terdeteksi.");
  }

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

  // 3. Pengelompokan Data berdasarkan majorityWeek
  const offline = [];
  const online = [];
  let totalSks = 0;

  coursesInfo.forEach(c => {
    const expectedPerts = getExpectedPerts(c.isIntensive, majorityWeek);
    
    const activePertsThisWeek = [];
    expectedPerts.forEach(pert => {
      const section = c.originalData.find(s => {
        const m = s.kode_section.match(/\d+/);
        return m && parseInt(m[0]) === pert;
      });
      if (section) {
        const isActive = section.sub_section.some(f => f.kode_template === "FORUM_DISKUSI" && (f.id || f.id_trx_course_sub_section));
        if (isActive) {
          activePertsThisWeek.push(pert);
        }
      }
    });

    const formatPerts = (pertsArray) => {
      const perts = [...pertsArray];
      if (perts.length === 0) return '';
      if (perts.length === 1) return `*pert ${perts[0]}*`;
      if (perts.length === 2) return `*pert ${perts[0]} & ${perts[1]}*`;
      const last = perts.pop();
      return `*pert ${perts.join(', ')} & ${last}*`;
    };

    if (activePertsThisWeek.length > 0) {
      // ONLINE
      const pertText = formatPerts(activePertsThisWeek);
      online.push(`${c.cleanName} : ${pertText}\nSKS ${c.sks}`);
      totalSks += c.sks;
    } else {
      // OFFLINE
      const existingExpectedPerts = expectedPerts.filter(pert => 
        c.originalData.some(s => {
          const m = s.kode_section.match(/\d+/);
          return m && parseInt(m[0]) === pert;
        })
      );
      const pertText = formatPerts(existingExpectedPerts);
      const titleLine = pertText ? `${c.cleanName} : ${pertText}` : `${c.cleanName} :`;
      offline.push(`${titleLine}\nSKS ${c.sks}`);
      totalSks += c.sks;
    }
  });

  // 4. Bangun format teks
  let text = `*MATKUL PEKAN ${majorityWeek}*\n\n`;
  
  text += "*OFFLINE :*\n";
  if (offline.length > 0) {
    text += offline.join("\n\n") + "\n\n";
  } else {
    text += "_Tidak ada kelas offline_\n\n";
  }

  text += "*ONLINE :*\n";
  if (online.length > 0) {
    text += online.join("\n\n") + "\n\n";
  } else {
    text += "_Tidak ada kelas online_\n\n";
  }

  text += `*TOTAL SKS: ${totalSks}*\n\n`;
  text += "*NOTED :* ";

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
