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
  const cachedData = storage.get(STORAGE_KEYS.COURSE_DATA);
  if (cachedData) {
    trackerUI.updateList(cachedData);
    const lastSyncTime = storage.get(STORAGE_KEYS.LAST_UPDATE, false);
    const syncText = document.getElementById('last-sync');
    if (lastSyncTime && syncText) {
        syncText.innerText = `Updated: ${lastSyncTime}`;
    }
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

    for (const course of courseList) {
      try {
        const detail = await api.getCourseDetail(course.kode_course);
        if (detail) detailedCourses.push(detail);
      } catch (e) {
        console.warn(`Failed to fetch detail for ${course.kode_course}`, e);
      }
    }

    // Simpan data
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    storage.save(STORAGE_KEYS.COURSE_DATA, detailedCourses);
    storage.save(STORAGE_KEYS.LAST_UPDATE, now);
    
    // Update UI
    trackerUI.updateList(detailedCourses);
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

  let text = "*REKAP PERTEMUAN MENTARI PEKAN INI*\n\n";
  
  const activeMeetings = [];

  data.forEach(course => {
    // Bersihkan nama matkul: hilangkan [3] dan bagian setelah #
    let courseName = course.coursename.split("#")[0].replace(/^\[\d+\]\s*/, '').trim();
    
    // Cari section yang memiliki forum aktif (memiliki id)
    const activeSections = course.data
      .filter(s => s.sub_section.some(f => f.kode_template === "FORUM_DISKUSI" && f.id))
      .map(s => `pert ${s.kode_section.match(/\d+/)[0]}`);

    if (activeSections.length > 0) {
      // Hilangkan duplikat dan gabungkan (misal: pert 8 & pert 9)
      const uniqueSections = [...new Set(activeSections)].join(" & ");
      activeMeetings.push(`${courseName}: *${uniqueSections}*`);
    }
  });

  if (activeMeetings.length > 0) {
    text += activeMeetings.join("\n\n") + "\n\n";
  } else {
    text += "_Tidak ada pertemuan aktif pekan ini._\n\n";
  }

  text += "*NOTED : SINKRONISASI NEURAL BERHASIL*";

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');
}

// Jalankan inisialisasi
if (document.readyState === 'complete') {
  initTracker();
} else {
  window.addEventListener('load', initTracker);
}
