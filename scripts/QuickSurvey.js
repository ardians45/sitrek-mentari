function automateFlow(mode) {
  function clickRadios(mode) {
    if (mode === 'Setuju') {
      // Pilih "Sering" (index 2) untuk semua pertanyaan
      document.querySelectorAll('[role="radiogroup"]').forEach((group) => {
        const radios = Array.from(group.querySelectorAll('[role="radio"]'));
        if (radios.length >= 3) {
          radios[2].click(); // Index 2 = "Sering"
        }
      });
    } else if (mode === 'Random') {
      // Random tanpa "Tidak Pernah" - pilih dari index 1, 2, 3
      document.querySelectorAll('[role="radiogroup"]').forEach((group) => {
        const radios = Array.from(group.querySelectorAll('[role="radio"]'));
        if (radios.length >= 4) {
          // Buat array dengan weight: index 1 = 1x, index 2 = 2x, index 3 = 2x
          const weightedChoices = [];
          weightedChoices.push(1); // "Kadang-kadang" 1x
          weightedChoices.push(2, 2); // "Sering" 2x
          weightedChoices.push(3, 3); // "Selalu" 2x

          const randomChoice =
            weightedChoices[Math.floor(Math.random() * weightedChoices.length)];
          radios[randomChoice].click();
        }
      });
    } else if (mode.startsWith('star')) {
      const rating = parseInt(mode.slice(4));
      document.querySelectorAll('[role="radiogroup"]').forEach((group) => {
        const radios = Array.from(group.querySelectorAll('[role="radio"]'));

        // Urutan radio: [0="Tidak Pernah", 1="Kadang-kadang", 2="Sering", 3="Selalu"]
        let weights;
        switch (rating) {
          case 1: // ⭐ - Buruk
            weights = [0.7, 0.3, 0, 0]; // Lebih banyak "Tidak Pernah"
            break;
          case 2: // ⭐⭐ - Kurang
            weights = [0.3, 0.7, 0, 0]; // Lebih banyak "Kadang-kadang"
            break;
          case 3: // ⭐⭐⭐ - Cukup
            weights = [0, 0.4, 0.6, 0]; // Campuran "Kadang-kadang" dan "Sering"
            break;
          case 4: // ⭐⭐⭐⭐ - Baik
            weights = [0, 0, 0.7, 0.3]; // Lebih banyak "Sering"
            break;
          case 5: // ⭐⭐⭐⭐⭐ - Sangat Baik
            weights = [0, 0, 0.3, 0.7]; // Lebih banyak "Selalu"
            break;
        }

        const random = Math.random();
        let sum = 0;
        let selectedIndex = 0;
        for (let i = 0; i < weights.length; i++) {
          sum += weights[i];
          if (random < sum) {
            selectedIndex = i;
            break;
          }
        }

        if (radios[selectedIndex]) {
          radios[selectedIndex].click();
        }
      });
    } else {
      // FullRandom - pilih semua opsi termasuk "Tidak Pernah"
      document.querySelectorAll('[role="radiogroup"]').forEach((group) => {
        const radios = Array.from(group.querySelectorAll('[role="radio"]'));
        if (radios.length > 0) {
          const randomIndex = Math.floor(Math.random() * radios.length);
          radios[randomIndex].click();
        }
      });
    }
  }

  function clickNextButton() {
    function findAndClickButtons() {
      // Klik radio button terlebih dahulu
      clickRadios(mode);

      // Tunggu sebentar untuk memastikan radio button terpilih
      setTimeout(() => {
        const buttons = document.querySelectorAll(
          'button.q-btn.bg-blue-6.text-white',
        );
        let foundNextButton = false;

        buttons.forEach((button) => {
          const spanContent = button.querySelector('.block');
          if (spanContent) {
            if (spanContent.textContent === 'SELANJUTNYA') {
              foundNextButton = true;
              button.click();
              // Setelah klik next, tunggu sebentar lalu cari tombol lagi
              setTimeout(findAndClickButtons, 500);
              return;
            }
          }
        });

        // Jika tidak ada tombol SELANJUTNYA, cari tombol SIMPAN
        if (!foundNextButton) {
          buttons.forEach((button) => {
            const spanContent = button.querySelector('.block');
            if (spanContent && spanContent.textContent === 'SIMPAN') {
              button.click();
              return;
            }
          });
        }
      }, 500);
    }

    // Mulai proses
    findAndClickButtons();
  }
  clickRadios(mode);
  setTimeout(clickNextButton, 500);
}

function createQuickSurveyToggle() {
  // Remove existing elements first
  const existingToggle = document.getElementById('quickSurveyToggle');
  if (existingToggle) existingToggle.remove();

  // Gunakan container yang sama dengan presensi jika ada
  let container = document.getElementById('floatingButtonContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'floatingButtonContainer';
    container.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      display: flex;
      flex-direction: row;
      gap: 10px;
      z-index: 9999;
    `;
    document.body.appendChild(container);
  }

  // Buat tombol Quick Survey
  const toggleButton = document.createElement('button');
  toggleButton.id = 'quickSurveyToggle';
  toggleButton.textContent = 'Quick Survey';
  toggleButton.style.cssText = `
    padding: 10px 16px;
    background: linear-gradient(135deg, #0070f3 0%, #00f0ff 100%);
    color: white;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    cursor: pointer;
    font-family: 'Inter', -apple-system, sans-serif;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 4px 15px rgba(0,240,255,0.3);
  `;
  toggleButton.onmouseover = function () {
    this.style.boxShadow = '0 6px 20px rgba(0,240,255,0.5)';
    this.style.transform = 'translateY(-2px)';
  };
  toggleButton.onmouseout = function () {
    this.style.boxShadow = '0 4px 15px rgba(0,240,255,0.3)';
    this.style.transform = 'translateY(0)';
  };
  // Add click handler
  toggleButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const popup = document.getElementById('quickSurveyPopup');
    const overlay = document.getElementById('quickSurveyPopupOverlay');

    if (popup && overlay) {
      const isVisible = popup.style.display === 'block';

      if (isVisible) {
        popup.style.display = 'none';
        overlay.style.display = 'none';
        toggleButton.style.backgroundColor = '#1e293b';
      } else {
        popup.style.display = 'block';
        overlay.style.display = 'block';
        toggleButton.style.backgroundColor = '#334155';
      }
    } else {
      console.log('Popup or overlay not found, creating new ones...');
      createQuickSurveyPopup();
      // Try again after creation
      setTimeout(() => {
        const newPopup = document.getElementById('quickSurveyPopup');
        const newOverlay = document.getElementById('quickSurveyPopupOverlay');
        if (newPopup && newOverlay) {
          newPopup.style.display = 'block';
          newOverlay.style.display = 'block';
          toggleButton.style.backgroundColor = '#059669';
        }
      }, 100);
    }
  });

  container.appendChild(toggleButton);
}

function createQuickSurveyPopup() {
  // Remove existing popup elements
  const existingPopup = document.getElementById('quickSurveyPopup');
  if (existingPopup) {
    existingPopup.remove();
  }

  const existingOverlay = document.getElementById('quickSurveyPopupOverlay');
  if (existingOverlay) {
    existingOverlay.remove();
  }

  // Create popup container
  const popupContainer = document.createElement('div');
  popupContainer.id = 'quickSurveyPopup';
  popupContainer.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(15, 15, 18, 0.75);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    padding: 24px;
    border-radius: 20px;
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.1);
    border: 1px solid rgba(255, 255, 255, 0.08);
    z-index: 10000;
    width: 90%;
    max-width: 420px;
    max-height: 90vh;
    overflow-y: auto;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #e4e4e7;
    display: none;
  `;

  popupContainer.innerHTML = `
    <div style="margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <h2 style="margin: 0; font-size: 22px; font-weight: 700; color: #fff; letter-spacing:-0.5px;">Quick Survey</h2>
        <button id="close-quick-survey" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 50%; width: 32px; height: 32px; display:flex; align-items:center; justify-content:center; cursor: pointer; color: #a1a1aa; font-size: 18px; transition:all 0.2s;">&times;</button>
      </div>
      <p style="margin: 0; font-size: 13.5px; color: #a1a1aa;">Pilih opsi otomatis pengisian kuisioner</p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 14px;">
      <div style="background: rgba(255,255,255,0.03); border-radius: 16px; padding: 18px; border: 1px solid rgba(255,255,255,0.05);">
        <p style="margin: 0 0 12px 0; font-weight: 600; color: #f4f4f5; font-size:14px;">Penilaian kinerja dosen:</p>
        <div style="display: flex; justify-content: space-between; gap: 8px;">
          <button class="star-btn" data-rating="1" style="flex: 1; background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%); color: white; border: 1px solid rgba(255,255,255,0.1); padding: 10px 0; border-radius: 12px; cursor: pointer; font-weight: 600; box-shadow:0 4px 10px rgba(239,68,68,0.2); transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);">1<br><span style="font-size: 9px; opacity:0.8;">Sgt Krg</span></button>
          <button class="star-btn" data-rating="2" style="flex: 1; background: linear-gradient(135deg, #f97316 0%, #c2410c 100%); color: white; border: 1px solid rgba(255,255,255,0.1); padding: 10px 0; border-radius: 12px; cursor: pointer; font-weight: 600; box-shadow:0 4px 10px rgba(249,115,22,0.2); transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);">2<br><span style="font-size: 9px; opacity:0.8;">Kurang</span></button>
          <button class="star-btn" data-rating="3" style="flex: 1; background: linear-gradient(135deg, #eab308 0%, #a16207 100%); color: white; border: 1px solid rgba(255,255,255,0.1); padding: 10px 0; border-radius: 12px; cursor: pointer; font-weight: 600; box-shadow:0 4px 10px rgba(234,179,8,0.2); transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);">3<br><span style="font-size: 9px; opacity:0.8;">Cukup</span></button>
          <button class="star-btn" data-rating="4" style="flex: 1; background: linear-gradient(135deg, #84cc16 0%, #4d7c0f 100%); color: white; border: 1px solid rgba(255,255,255,0.1); padding: 10px 0; border-radius: 12px; cursor: pointer; font-weight: 600; box-shadow:0 4px 10px rgba(132,204,22,0.2); transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);">4<br><span style="font-size: 9px; opacity:0.8;">Baik</span></button>
          <button class="star-btn" data-rating="5" style="flex: 1; background: linear-gradient(135deg, #10b981 0%, #047857 100%); color: white; border: 1px solid rgba(255,255,255,0.1); padding: 10px 0; border-radius: 12px; cursor: pointer; font-weight: 600; box-shadow:0 4px 10px rgba(16,185,129,0.2); transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);">5<br><span style="font-size: 9px; opacity:0.8;">Sgt Baik</span></button>
        </div>
      </div>

      <div style="background: rgba(255,255,255,0.03); border-radius: 16px; padding: 18px; border: 1px solid rgba(255,255,255,0.05);">
        <p style="margin: 0 0 12px 0; font-weight: 600; color: #f4f4f5; font-size:14px;">Opsi lainnya:</p>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button id="setuju" style="background: rgba(255,255,255,0.05); color: #00f0ff; border: 1px solid rgba(0,240,255,0.3); padding: 10px 14px; border-radius: 12px; cursor: pointer; font-weight: 600; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);">Pilih Semua "Setuju"</button>
          <button id="random" style="background: rgba(255,255,255,0.05); color: #a1a1aa; border: 1px solid rgba(255,255,255,0.1); padding: 10px 14px; border-radius: 12px; cursor: pointer; font-weight: 600; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);">Random (Tanpa "Sangat Tidak Setuju")</button>
          <button id="fullRandom" style="background: rgba(255,255,255,0.05); color: #a1a1aa; border: 1px solid rgba(255,255,255,0.1); padding: 10px 14px; border-radius: 12px; cursor: pointer; font-weight: 600; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);">Acak Total</button>
        </div>
      </div>
    </div>

    <div style="margin-top: 16px; text-align: center; font-size: 11px; color: #777;">
      &copy; 2025 Created by <span style="color: #6d9ee7; text-decoration: none;">Asterix Studio</span>
    </div>
  `;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'quickSurveyPopupOverlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: none;
  `;

  // Add elements to document
  document.body.appendChild(overlay);
  document.body.appendChild(popupContainer);

  // Add close functionality
  document
    .getElementById('close-quick-survey')
    .addEventListener('click', () => {
      const toggleButton = document.getElementById('quickSurveyToggle');
      if (toggleButton) {
        toggleButton.click();
      }
    });

  overlay.addEventListener('click', () => {
    const toggleButton = document.getElementById('quickSurveyToggle');
    if (toggleButton) {
      toggleButton.click();
    }
  });

  // Add hover effects to buttons
  const buttons = popupContainer.querySelectorAll(
    'button:not(#close-quick-survey)',
  );
  buttons.forEach((button) => {
    button.onmouseover = function () {
      this.style.opacity = '0.9';
      this.style.transform = 'translateY(-1px)';
    };
    button.onmouseout = function () {
      this.style.opacity = '1';
      this.style.transform = 'translateY(0)';
    };
  });

  // Setup event listeners immediately after creating the popup
  setupQuickSurveyEventListeners();

  console.log('Popup created and added to DOM'); // Debug log
}

function setupQuickSurveyEventListeners() {
  // Check if we're in a Chrome extension context
  const isExtension =
    typeof chrome !== 'undefined' && chrome.tabs && chrome.scripting;

  // Event listeners for star rating buttons
  document.querySelectorAll('.star-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const rating = button.getAttribute('data-rating');
      console.log(`Star ${rating} button clicked`); // Debug log

      if (isExtension) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: automateFlow,
            args: [`star${rating}`],
          });
        });
      } else {
        // If not in extension context, run directly
        automateFlow(`star${rating}`);
      }

      // Hide popup
      const popup = document.getElementById('quickSurveyPopup');
      const overlay = document.getElementById('quickSurveyPopupOverlay');
      if (popup && overlay) {
        popup.style.display = 'none';
        overlay.style.display = 'none';
        const toggleButton = document.getElementById('quickSurveyToggle');
        if (toggleButton) {
          toggleButton.style.backgroundColor = '#1e293b';
        }
      }
    });
  });

  // Other button event listeners
  const buttons = [
    { id: 'setuju', mode: 'Setuju' },
    { id: 'random', mode: 'Random' },
    { id: 'fullRandom', mode: 'FullRandom' },
  ];

  buttons.forEach(({ id, mode }) => {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener('click', () => {
        console.log(`${id} button clicked`); // Debug log

        if (isExtension) {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              function: automateFlow,
              args: [mode],
            });
          });
        } else {
          // If not in extension context, run directly
          automateFlow(mode);
        }

        // Hide popup
        const popup = document.getElementById('quickSurveyPopup');
        const overlay = document.getElementById('quickSurveyPopupOverlay');
        if (popup && overlay) {
          popup.style.display = 'none';
          overlay.style.display = 'none';
          const toggleButton = document.getElementById('quickSurveyToggle');
          if (toggleButton) {
            toggleButton.style.backgroundColor = '#1e293b';
          }
        }
      });
    }
  });
}

// Fungsi untuk mengecek URL dan menampilkan popup jika sesuai
function checkUrlAndInitialize() {
  const currentUrl = window.location.href;
  // Toleran: abaikan query string/hash
  const targetPrefix = 'https://my.unpam.ac.id/data-akademik/khs';
  if (currentUrl.startsWith(targetPrefix)) {
    console.log(
      'URL matches target (with tolerance), initializing QuickSurvey...',
    );
    initializeQuickSurvey();
  } else {
    console.log('URL does not match target, removing QuickSurvey if exists...');
    // Remove existing elements if they exist
    const existingToggle = document.getElementById('quickSurveyToggle');
    if (existingToggle) existingToggle.remove();
    const existingPopup = document.getElementById('quickSurveyPopup');
    if (existingPopup) existingPopup.remove();
    const existingOverlay = document.getElementById('quickSurveyPopupOverlay');
    if (existingOverlay) existingOverlay.remove();
  }
}

// Fungsi untuk memantau perubahan URL
function observeUrlChanges() {
  let lastUrl = window.location.href;

  // Fungsi untuk mengecek perubahan URL
  function checkUrlChange() {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
      console.log('URL changed from', lastUrl, 'to', currentUrl);
      lastUrl = currentUrl;
      checkUrlAndInitialize();
    }
  }

  // Menggunakan MutationObserver untuk memantau perubahan pada history
  const observer = new MutationObserver(() => {
    checkUrlChange();
  });

  // Mulai observasi
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Tambahkan event listener untuk popstate (untuk navigasi browser)
  window.addEventListener('popstate', checkUrlChange);

  // Tambahkan event listener untuk pushState dan replaceState
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function () {
    originalPushState.apply(this, arguments);
    checkUrlChange();
  };

  history.replaceState = function () {
    originalReplaceState.apply(this, arguments);
    checkUrlChange();
  };

  // Cek URL saat script pertama kali dijalankan
  checkUrlAndInitialize();
}

// Modifikasi fungsi initializeQuickSurvey
function initializeQuickSurvey() {
  console.log('Initializing QuickSurvey...'); // Debug log

  // Hapus elemen yang ada terlebih dahulu
  const existingToggle = document.getElementById('quickSurveyToggle');
  if (existingToggle) {
    existingToggle.remove();
  }
  const existingPopup = document.getElementById('quickSurveyPopup');
  if (existingPopup) {
    existingPopup.remove();
  }
  const existingOverlay = document.getElementById('quickSurveyPopupOverlay');
  if (existingOverlay) {
    existingOverlay.remove();
  }

  // Buat elemen baru
  createQuickSurveyToggle();
  createQuickSurveyPopup();
}

// Jalankan observasi URL saat script dimuat
console.log('=== SCRIPT UNTUK QUICK SURVEY UNPAM ===');
console.log('Memulai observasi perubahan URL...');
observeUrlChanges();

// Pastikan tombol langsung muncul jika URL cocok saat script pertama kali dijalankan
checkUrlAndInitialize();
