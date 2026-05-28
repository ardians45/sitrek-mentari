/**
 * Tracker UI - SITREK Mentari (Awwwards Edition)
 * Concept: Neoburatlism
 */
export const trackerUI = {
  activeTab: 'home',

  createContainer: (isMyUnpam = false) => {
    if (document.getElementById('mentari-tracker-root')) return document.getElementById('mentari-tracker-root');

    const root = document.createElement('div');
    root.id = 'mentari-tracker-root';
    
    if (isMyUnpam) {
      root.innerHTML = `
        <div id="mentari-tracker-app" class="tracker-collapsed">
          <div class="tracker-glow"></div>
          <div class="tracker-loading-bar" id="tracker-progress"></div>
          
          <div class="tracker-header">
            <div class="tracker-brand">
              <div class="brand-visual">
                <img src="${chrome.runtime.getURL('assets/icon.png')}" alt="Logo">
              </div>
              <div class="brand-info">
                <span class="brand-name">SITREK <span class="accent">Presensi</span></span>
                <span class="brand-tagline" id="last-sync">System Sync Ready</span>
              </div>
            </div>
            <div class="tracker-actions">
              <button id="refresh-tracker" class="action-btn sync-btn" title="Refresh">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M23 4v6h-6M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"></path></svg>
              </button>
              <button id="toggle-tracker" class="action-btn toggle-btn">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="18 15 12 9 6 15"></polyline></svg>
              </button>
            </div>
          </div>

          <div class="tracker-content">
            <div id="tab-presensi" class="tab-pane active">
              <div class="section-header-modern">
                <div style="display: flex; flex-direction: column; gap: 6px;">
                  <h3 style="margin: 0;">Ringkasan Presensi</h3>
                  <span id="total-sks-badge" style="font-size: 11px; font-weight: 900; background: var(--neo-accent-2); border: 2px solid var(--neo-border); padding: 2px 8px; width: max-content; box-shadow: 2px 2px 0px var(--shadow-color); font-family: 'JetBrains Mono', monospace; text-transform: uppercase; display: none;">Total: 0 SKS</span>
                </div>
                <span class="count-badge" id="overall-attendance">0%</span>
              </div>
              <div id="presensi-list" class="course-grid">
                <div class="empty-state">
                  <p>Klik tombol 🔄 untuk memuat data kehadiran.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="tracker-status-bar">
            <div class="status-item">
              <span class="dot green"></span>
              <span class="label">Aman (≥75%)</span>
            </div>
            <div class="status-item">
              <span class="dot orange"></span>
              <span class="label">Waspada (<75%)</span>
            </div>
          </div>
        </div>
      `;
    } else {
      root.innerHTML = `
        <div id="mentari-tracker-app" class="tracker-collapsed">
          <div class="tracker-glow"></div>
          <div class="tracker-loading-bar" id="tracker-progress"></div>
          
          <div class="tracker-header">
            <div class="tracker-brand">
              <div class="brand-visual">
                <img src="${chrome.runtime.getURL('assets/icon.png')}" alt="Logo">
              </div>
              <div class="brand-info">
                <span class="brand-name">SITREK <span class="accent">Mentari</span></span>
                <span class="brand-tagline" id="last-sync">System Sync Ready</span>
              </div>
            </div>
            <div class="tracker-actions">
              <button id="refresh-tracker" class="action-btn sync-btn" title="Refresh">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M23 4v6h-6M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"></path></svg>
              </button>
              <button id="toggle-tracker" class="action-btn toggle-btn">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="18 15 12 9 6 15"></polyline></svg>
              </button>
            </div>
          </div>

          <div class="tracker-tabs">
            <button class="tracker-tab active" data-tab="home">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              Forum
            </button>
            <button class="tracker-tab" data-tab="students">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              Mahasiswa
            </button>
            <button class="tracker-tab" data-tab="notifications">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              Notifikasi
            </button>
            <button class="tracker-tab" data-tab="profile">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Profil
            </button>
          </div>

          <div class="tracker-content">
            <div id="tab-home" class="tab-pane active">
              <div id="course-list" class="course-grid">
                <div class="empty-state">
                  <div class="empty-visual">
                    <div class="blob"></div>
                    <div class="icon">📡</div>
                  </div>
                  <h3>No Signal Detected</h3>
                  <p>Please initiate neural synchronization to map your academic progress.</p>
                  <button class="prime-btn" onclick="document.getElementById('refresh-tracker').click()">Start Sync</button>
                </div>
              </div>
            </div>
            <div id="tab-students" class="tab-pane">
              <div class="section-header-modern">
                <h3>Daftar Mahasiswa</h3>
                <span class="count-badge" id="student-count">0 Students</span>
              </div>
              <div id="student-list" class="student-grid">
                 <div class="empty-state">
                  <p>Sync data to view student list.</p>
                </div>
              </div>
            </div>
            <div id="tab-notifications" class="tab-pane">
              <div class="section-header-modern">
                <h3>Notifikasi</h3>
              </div>
              <div id="notifications-list" class="notif-grid">
                <div class="empty-state">
                  <p>No new notifications detected.</p>
                </div>
              </div>
            </div>
            <div id="tab-profile" class="tab-pane">
              <div class="section-header-modern">
                <h3>Profil Mahasiswa</h3>
              </div>
              <div id="profile-container" class="profile-grid">
                <div class="empty-state">
                  <p>Sync data to view profile info.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="tracker-status-bar">
            <div class="status-item">
              <span class="dot green"></span>
              <span class="label">Done</span>
            </div>
            <div class="status-item">
              <span class="dot orange"></span>
              <span class="label">Wait</span>
            </div>
            <div class="status-item">
              <span class="dot yellow"></span>
              <span class="label">Empty</span>
            </div>
            <div class="status-item">
              <span class="dot gray"></span>
              <span class="label">Locked</span>
            </div>
            <button id="share-summary" class="share-btn" title="Share Summary">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.626 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Summary
            </button>
          </div>
        </div>
      `;
    }
    document.body.appendChild(root);
    trackerUI.injectStyles();
    if (!isMyUnpam) {
      trackerUI.initTabs();
    }
    return root;
  },

  initTabs: () => {
    const tabs = document.querySelectorAll('.tracker-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');
        trackerUI.switchTab(target);
      });
    });
  },

  switchTab: (tabId) => {
    trackerUI.activeTab = tabId;
    
    // Update tab buttons
    document.querySelectorAll('.tracker-tab').forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-tab') === tabId);
    });

    // Update panes
    document.querySelectorAll('.tab-pane').forEach(p => {
      p.classList.toggle('active', p.id === `tab-${tabId}`);
    });
  },
  injectStyles: () => {
    if (document.getElementById('tracker-styles-awwwards')) return;
    const style = document.createElement('style');
    style.id = 'tracker-styles-awwwards';
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700;800&display=swap');

      :root {
        --neo-bg: #EAEAEA;
        --neo-card: #FFFFFF;
        --neo-border: #000000;
        --neo-accent: #FFEB3B;
        --neo-accent-2: #00E5FF;
        --neo-success: #00E676;
        --neo-warning: #FF3D00;
        --neo-text-main: #000000;
        --neo-text-secondary: #333333;
        --neo-text-muted: #666666;
        --shadow-color: #000000;
      }

      #mentari-tracker-root {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 2147483647;
        font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
      }

      #mentari-tracker-root, #mentari-tracker-root * {
        box-sizing: border-box;
      }

      #mentari-tracker-app {
        width: 100%;
        min-width: 320px;
        max-width: 440px;
        background: var(--neo-bg);
        border: 4px solid var(--neo-border);
        border-radius: 0;
        box-shadow: 8px 8px 0px var(--shadow-color);
        transition: all 0.3s ease;
        color: var(--neo-text-main);
        display: flex;
        flex-direction: column;
        max-height: calc(100vh - 60px);
      }

      /* Make responsive */
      @media (max-width: 500px) {
        #mentari-tracker-root {
          bottom: 10px;
          right: 10px;
          left: 10px;
        }
        #mentari-tracker-app {
          width: auto;
          max-width: none;
        }
      }

      #mentari-tracker-app.tracker-collapsed {
        width: max-content;
        min-width: 300px;
        height: 72px;
        border-radius: 0;
      }
      
      @media (max-width: 500px) {
        #mentari-tracker-app.tracker-collapsed {
           width: auto;
        }
      }

      #mentari-tracker-app.tracker-collapsed .tracker-header {
        padding: 0 16px;
        height: 100%;
        border-bottom: none;
      }

      #mentari-tracker-app.tracker-collapsed .tracker-tabs,
      #mentari-tracker-app.tracker-collapsed .tracker-content,
      #mentari-tracker-app.tracker-collapsed .tracker-status-bar {
        display: none;
      }

      .tracker-header {
        padding: 18px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--neo-accent-2);
        border-bottom: 4px solid var(--neo-border);
        cursor: pointer;
        user-select: none;
        flex-shrink: 0;
      }

      .tracker-brand { display: flex; align-items: center; gap: 12px; }

      .brand-visual {
        width: 44px;
        height: 44px;
        background: #fff;
        border: 3px solid var(--neo-border);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px;
        box-shadow: 3px 3px 0px var(--shadow-color);
      }

      .brand-visual img { width: 100%; height: 100%; object-fit: contain; }

      .brand-info { display: flex; flex-direction: column; }
      .brand-name { font-weight: 900; font-size: 18px; letter-spacing: -0.5px; text-transform: uppercase; }
      .brand-name .accent { color: #fff; text-shadow: 2px 2px 0 #000; background: #000; padding: 0 4px;}
      .brand-tagline { 
        font-size: 11px; 
        color: var(--neo-text-main); 
        font-weight: 800; 
        text-transform: uppercase; 
        letter-spacing: 1px;
      }

      .tracker-actions { 
        display: flex; 
        gap: 10px; 
        align-items: center;
      }

      .action-btn {
        background: #fff;
        border: 3px solid var(--neo-border);
        color: var(--neo-text-main);
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.1s ease;
        box-shadow: 4px 4px 0px var(--shadow-color);
      }

      .action-btn svg {
        transition: all 0.1s ease;
        stroke-width: 3;
      }

      .action-btn:hover {
        background: var(--neo-accent);
        transform: translate(-2px, -2px);
        box-shadow: 6px 6px 0px var(--shadow-color);
      }

      .action-btn:active {
        transform: translate(2px, 2px);
        box-shadow: 2px 2px 0px var(--shadow-color);
      }

      .sync-btn.loading svg {
        animation: neural-spin 1.2s linear infinite;
      }

      @keyframes neural-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .toggle-btn svg {
        transition: transform 0.3s ease;
      }

      #mentari-tracker-app.tracker-collapsed .toggle-btn svg {
        transform: rotate(180deg);
      }

      .tracker-tabs {
        display: flex;
        padding: 10px 12px;
        background: #fff;
        border-bottom: 4px solid var(--neo-border);
        gap: 6px;
        overflow: hidden;
        flex-shrink: 0;
      }

      .tracker-tab {
        flex: 1;
        min-width: 0;
        background: #fff;
        border: 3px solid var(--neo-border);
        color: var(--neo-text-main);
        padding: 8px 4px;
        font-size: 10px;
        font-weight: 900;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        transition: all 0.1s;
        box-shadow: 2px 2px 0px var(--shadow-color);
        text-transform: uppercase;
        white-space: nowrap;
      }

      .tracker-tab:hover { 
        background: #f0f0f0; 
        transform: translate(-1px, -1px);
        box-shadow: 3px 3px 0px var(--shadow-color);
      }
      .tracker-tab svg {
        flex-shrink: 0;
        width: 16px;
        height: 16px;
        stroke-width: 2.5;
      }
      .tracker-tab.active { 
        background: var(--neo-accent); 
        transform: translate(2px, 2px);
        box-shadow: 1px 1px 0px var(--shadow-color);
      }

      .tracker-content {
        height: 480px;
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 24px;
        padding-right: 28px; /* Extra padding for scrollbar shadow */
        background: var(--neo-bg);
      }
      
      /* Scrollbar for brutalism */
      .tracker-content::-webkit-scrollbar {
        width: 12px;
      }
      .tracker-content::-webkit-scrollbar-track {
        background: #fff;
        border-left: 3px solid var(--neo-border);
      }
      .tracker-content::-webkit-scrollbar-thumb {
        background: var(--neo-accent);
        border: 3px solid var(--neo-border);
      }

      .tab-pane { display: none; }
      .tab-pane.active { display: block; }

      .section-header-modern {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        padding-bottom: 12px;
        border-bottom: 4px solid var(--neo-border);
      }

      .section-header-modern h3 { margin: 0; font-size: 20px; font-weight: 900; text-transform: uppercase;}
      .count-badge {
        background: var(--neo-accent);
        border: 2px solid var(--neo-border);
        padding: 4px 12px;
        font-size: 12px;
        font-weight: 800;
        color: var(--neo-text-main);
        box-shadow: 2px 2px 0px var(--shadow-color);
      }

      /* Student List Styling */
      .student-card {
        background: var(--neo-card);
        border: 3px solid var(--neo-border);
        padding: 16px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 15px;
        box-shadow: 4px 4px 0px var(--shadow-color);
        transition: transform 0.1s;
      }
      
      .student-card:hover {
        transform: translate(-2px, -2px);
        box-shadow: 6px 6px 0px var(--shadow-color);
      }

      .student-avatar {
        width: 44px;
        height: 44px;
        background: var(--neo-accent-2);
        border: 2px solid var(--neo-border);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
        font-size: 16px;
        box-shadow: 2px 2px 0px var(--shadow-color);
      }

      .student-info { flex: 1; }
      .student-name { font-weight: 800; font-size: 16px; display: block; text-transform: uppercase; }
      .student-nim { font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 700; color: var(--neo-text-secondary); background: #eee; padding: 2px 6px; border: 1px solid #000; display: inline-block; margin-top: 4px;}

      /* Notif List Styling */
      .notif-badge {
        background: #FF3D00;
        color: #fff;
        border: 2px solid #000;
        border-radius: 0;
        font-size: 10px;
        font-weight: 900;
        padding: 1px 5px;
        margin-left: 6px;
        min-width: 18px;
        text-align: center;
        display: inline-block;
      }

      .notif-card {
        display: block;
        text-decoration: none;
        color: inherit;
        background: var(--neo-card);
        border: 3px solid var(--neo-border);
        padding: 16px;
        margin-bottom: 16px;
        box-shadow: 4px 4px 0px var(--shadow-color);
        transition: transform 0.1s;
        cursor: pointer;
      }

      .notif-card:hover {
        transform: translate(-2px, -2px);
        box-shadow: 6px 6px 0px var(--shadow-color);
      }

      .notif-card--lecturer {
        border-left: 6px solid #FFEB3B;
      }

      .notif-card--student {
        border-left: 6px solid #00E5FF;
      }

      .notif-header { 
        display: flex; 
        justify-content: space-between; 
        align-items: center;
        margin-bottom: 8px; 
        border-bottom: 2px solid #000; 
        padding-bottom: 8px;
      }

      .notif-author { 
        font-weight: 800; 
        font-size: 14px; 
        text-transform: uppercase;
      }

      .notif-badge-type {
        font-size: 10px;
        font-weight: 900;
        padding: 2px 6px;
        border: 2px solid #000;
      }

      .badge-lecturer { background: #FFEB3B; color: #000; }
      .badge-student { background: #00E5FF; color: #000; }

      .notif-course {
        font-size: 11px;
        font-weight: 700;
        color: #666;
        text-transform: uppercase;
        margin: 4px 0 6px 0;
        letter-spacing: 0.5px;
      }

      .notif-body { 
        font-size: 14px; 
        font-weight: 600; 
        line-height: 1.5; 
        color: var(--neo-text-secondary); 
      }

      .notif-time { 
        font-family: 'JetBrains Mono', monospace; 
        font-size: 11px; 
        font-weight: 700; 
        color: #999;
        margin-top: 8px;
        border-top: 1px solid #eee;
        padding-top: 6px;
      }

      /* Profile Card Styling */
      .profile-card {
        background: var(--neo-card);
        border: 4px solid var(--neo-border);
        padding: 20px;
        box-shadow: 6px 6px 0px var(--shadow-color);
        margin-bottom: 16px;
      }
      .profile-field {
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        border-bottom: 2px solid #eee;
        padding-bottom: 12px;
      }
      .profile-field:last-child {
        margin-bottom: 0;
        border-bottom: none;
        padding-bottom: 0;
      }
      .profile-label {
        font-size: 11px;
        font-weight: 800;
        text-transform: uppercase;
        color: var(--neo-text-muted);
        letter-spacing: 1px;
      }
      .profile-val {
        font-size: 16px;
        font-weight: 900;
        color: var(--neo-text-main);
        text-transform: uppercase;
      }
      .profile-val.nim {
        font-family: 'JetBrains Mono', monospace;
      }

      .course-card {
        background: var(--neo-card);
        border: 4px solid var(--neo-border);
        padding: 20px;
        margin-bottom: 20px;
        transition: transform 0.1s ease;
        box-shadow: 6px 6px 0px var(--shadow-color);
      }

      .course-card:hover {
        transform: translate(-2px, -2px);
        box-shadow: 8px 8px 0px var(--shadow-color);
      }

      .course-header-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 20px;
        gap: 12px;
        border-bottom: 3px solid var(--neo-border);
        padding-bottom: 12px;
      }

      .course-title { 
        font-weight: 900; 
        font-size: 16px; 
        color: var(--neo-text-main);
        line-height: 1.4;
        flex: 1;
        text-transform: uppercase;
      }
      
      .course-progress {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        min-width: 60px;
        margin-right: 4px;
      }
      .progress-label { 
        font-family: 'JetBrains Mono', monospace;
        font-size: 14px; 
        font-weight: 900; 
        color: #fff;
        background: #000;
        padding: 2px 6px;
      }
      .progress-bar-bg { width: 60px; height: 12px; background: #fff; border: 2px solid var(--neo-border); margin-top: 6px; }
      .progress-bar-fill { height: 100%; background: var(--neo-success); border-right: 2px solid var(--neo-border); transition: width 0.3s ease; }

      .forum-pills { display: flex; flex-wrap: wrap; gap: 10px; }

      .forum-pill {
        padding: 8px 12px;
        font-size: 13px;
        font-weight: 800;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.1s;
        border: 2px solid var(--neo-border);
        color: var(--neo-text-main);
        background: #fff;
        box-shadow: 3px 3px 0px var(--shadow-color);
      }

      .forum-pill.completed {
        background: var(--neo-success);
      }

      .forum-pill.locked {
        background: #ccc;
        color: #666;
      }

      .forum-pill:not(.completed):not(.locked):not(.empty) {
        background: var(--neo-warning);
        color: #fff;
      }

      .forum-pill.empty {
        background: #F5C518;
        color: #000;
        border-color: #000;
      }

      .forum-pill:hover:not(.locked) {
        transform: translate(-2px, -2px);
        box-shadow: 5px 5px 0px var(--shadow-color);
      }
      
      .forum-pill:active:not(.locked) {
        transform: translate(2px, 2px);
        box-shadow: 1px 1px 0px var(--shadow-color);
      }

      .tracker-status-bar {
        padding: 16px 24px;
        background: #fff;
        display: flex;
        align-items: center;
        gap: 16px;
        border-top: 4px solid var(--neo-border);
        flex-shrink: 0;
      }

      .status-item { display: flex; align-items: center; gap: 8px; }
      .dot { width: 12px; height: 12px; border: 2px solid #000; }
      .dot.green { background: var(--neo-success); }
      .dot.orange { background: var(--neo-warning); }
      .dot.yellow { background: #F5C518; }
      .dot.gray { background: #ccc; }
      .status-item .label { 
        font-size: 13px; 
        font-weight: 800; 
        color: var(--neo-text-main); 
        text-transform: uppercase;
      }

      .share-btn {
        margin-left: auto;
        background: #000;
        color: #fff;
        border: 2px solid #000;
        padding: 10px 20px;
        font-size: 13px;
        font-weight: 900;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        transition: all 0.1s;
        box-shadow: 4px 4px 0px var(--neo-accent);
      }

      .share-btn:hover { 
        transform: translate(-2px, -2px);
        box-shadow: 6px 6px 0px var(--neo-accent);
      }
      
      .share-btn:active { 
        transform: translate(2px, 2px);
        box-shadow: 2px 2px 0px var(--neo-accent);
      }

      .empty-state { text-align: center; padding: 60px 20px; color: var(--neo-text-main); border: 4px dashed var(--neo-border); background: #fff; box-shadow: 8px 8px 0px var(--shadow-color); margin: 20px 0;}
      .empty-state h3 { font-weight: 900; text-transform: uppercase; font-size: 22px; margin-bottom: 10px; }
      .empty-state p { font-weight: 600; margin-bottom: 20px; }
      .prime-btn {
        background: var(--neo-accent-2);
        color: #000; 
        border: 3px solid #000; 
        padding: 14px 30px; 
        font-size: 16px;
        font-weight: 900; 
        text-transform: uppercase;
        cursor: pointer; 
        transition: all 0.1s;
        box-shadow: 6px 6px 0px #000;
      }
      .prime-btn:hover {
        transform: translate(-2px, -2px);
        box-shadow: 8px 8px 0px #000;
      }
      .prime-btn:active {
        transform: translate(2px, 2px);
        box-shadow: 2px 2px 0px #000;
      }

      /* Presensi Neo Brutalism Additions */
      .presensi-card {
        background: var(--neo-card);
        border: 4px solid var(--neo-border);
        padding: 16px;
        margin-bottom: 16px;
        box-shadow: 6px 6px 0px var(--shadow-color);
        transition: transform 0.1s ease;
        cursor: pointer;
      }
      .presensi-card:hover {
        transform: translate(-2px, -2px);
        box-shadow: 8px 8px 0px var(--shadow-color);
      }
      .presensi-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid var(--neo-border);
        padding-bottom: 8px;
        margin-bottom: 12px;
      }
      .presensi-matkul-title {
        font-weight: 800;
        font-size: 14px;
        text-transform: uppercase;
        color: var(--neo-text-main);
        line-height: 1.4;
      }
      .presensi-percent-badge {
        font-size: 13px;
        font-weight: 950;
        padding: 4px 10px;
        border: 2px solid var(--neo-border);
        box-shadow: 2px 2px 0px var(--shadow-color);
      }
      .presensi-stats-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        font-size: 12px;
        font-weight: 800;
      }
      .presensi-stat-box {
        background: #fff;
        border: 2px solid var(--neo-border);
        padding: 6px;
        text-align: center;
      }
      .presensi-stat-box.hadir {
        background: var(--neo-success);
      }
      .presensi-stat-box.absen {
        background: var(--neo-warning);
        color: #fff;
      }
      /* Modal details neo brutalism */
      .neo-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2147483647;
      }
      .neo-modal-content {
        background: var(--neo-bg);
        border: 4px solid var(--neo-border);
        box-shadow: 10px 10px 0px var(--shadow-color);
        width: 90%;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        padding: 20px;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }
      .neo-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 4px solid var(--neo-border);
        padding-bottom: 12px;
        margin-bottom: 16px;
      }
      .neo-modal-title {
        font-weight: 900;
        font-size: 16px;
        text-transform: uppercase;
      }
      .neo-modal-close {
        background: #fff;
        border: 3px solid var(--neo-border);
        font-weight: 800;
        width: 32px;
        height: 32px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
      }
      .neo-modal-close:hover {
        background: var(--neo-warning);
        color: #fff;
      }
      .neo-table-container {
        width: 100%;
        overflow-x: auto;
        border: 2px solid var(--neo-border);
      }
      .neo-table {
        width: 100%;
        border-collapse: collapse;
      }
      .neo-table th, .neo-table td {
        border: 1px solid var(--neo-border);
        padding: 8px 12px;
        font-size: 12px;
        font-weight: 700;
        text-align: left;
      }
      .neo-table th {
        background: var(--neo-accent-2);
        text-transform: uppercase;
        font-size: 11px;
      }
      .neo-table tr:nth-child(even) {
        background: rgba(255, 255, 255, 0.5);
      }
      .neo-status-badge {
        font-weight: 800;
        padding: 2px 6px;
        border: 2px solid var(--neo-border);
        display: inline-block;
      }
    `;
    document.head.appendChild(style);
  },

  updateList: (courses) => {
    const list = document.getElementById('course-list');
    if (!list) return;

    if (!courses || courses.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <div class="empty-visual">
            <div class="blob"></div>
            <div class="icon">🛰️</div>
          </div>
          <h3>No Signals Detected</h3>
          <p>Initiate neural sync to track your forum progress across the Mentari network.</p>
          <button class="prime-btn" onclick="document.getElementById('refresh-tracker').click()">Initialize Sync</button>
        </div>
      `;
      return;
    }

    list.innerHTML = courses.map((course, cIdx) => {
      const sections = course.data.map(section => {
        const forums = section.sub_section.filter(sub => sub.kode_template === "FORUM_DISKUSI");
        return {
          nama: section.nama_section,
          kode: section.kode_section,
          forums: forums
        };
      });

      if (sections.length === 0) return '';

      const allForumsFlattened = sections.flatMap(s => s.forums);
      const totalForums = allForumsFlattened.length;
      const completedForums = allForumsFlattened.filter(f => f.completion === true).length;
      const progressPercent = totalForums > 0 ? Math.round((completedForums / totalForums) * 100) : 100;

      sections.sort((a, b) => {
        const numA = parseInt(a.kode?.match(/\d+/)?.[0] || 0);
        const numB = parseInt(b.kode?.match(/\d+/)?.[0] || 0);
        return numA - numB;
      });

      return `
        <div class="course-card" style="animation-delay: ${cIdx * 0.1}s">
          <div class="course-header-row">
            <span class="course-title">${course.coursename}</span>
            <div class="course-progress">
              <span class="progress-label">${progressPercent}%</span>
              <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${progressPercent}%"></div>
              </div>
            </div>
          </div>
          <div class="forum-pills">
            ${sections.map((s, idx) => {
              const pMatch = s.kode?.match(/\d+/);
              const pLabel = pMatch ? `P${pMatch[0]}` : `S${idx + 1}`;
              if (s.forums.length === 0) {
                const emptyIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>';
                return `<div class="forum-pill locked" title="Tidak ada forum" style="opacity: 0.5">${emptyIcon} ${pLabel}</div>`;
              }
              return s.forums.map(f => {
                let statusClass = '';
                let icon = '';
                let href = '';
                if (f.completion === true) {
                  // DONE: Forum selesai dikerjakan
                  statusClass = 'completed';
                  icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                  href = f.id ? `https://mentari.unpam.ac.id/u-courses/${course.kode_course}/forum/${f.id}` : `https://mentari.unpam.ac.id/u-courses/${course.kode_course}?accord_pertemuan=${s.kode}`;
                } else if (f.id && f.hasTopics === false) {
                  // EMPTY: Forum aktif tapi dosen belum isi topik
                  statusClass = 'empty';
                  icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
                  href = `https://mentari.unpam.ac.id/u-courses/${course.kode_course}/forum/${f.id}`;
                } else if (f.id) {
                  // WAIT: Forum aktif, ada topik, belum dikerjakan
                  statusClass = '';
                  icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>';
                  href = `https://mentari.unpam.ac.id/u-courses/${course.kode_course}/forum/${f.id}`;
                } else {
                  // LOCKED: Forum belum dibuka dosen
                  statusClass = 'locked';
                  icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';
                  href = `https://mentari.unpam.ac.id/u-courses/${course.kode_course}?accord_pertemuan=${s.kode}`;
                }
                return `<a href="${href}" class="forum-pill ${statusClass}" title="${f.judul || 'Forum Diskusi'}">${icon} ${pLabel}</a>`;
              }).join('');
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  },

  updateStudents: (students) => {
    const container = document.getElementById('student-list');
    const countBadge = document.getElementById('student-count');
    if (!container) return;

    if (!students || students.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>No students found.</p></div>';
      if (countBadge) countBadge.innerText = '0 Students';
      return;
    }

    if (countBadge) countBadge.innerText = `${students.length} Students`;

    const sortedStudents = [...students].sort((a, b) => a.nama.localeCompare(b.nama));

    container.innerHTML = sortedStudents.map((s, index) => `
      <div class="student-card">
        <div class="student-avatar">${index + 1}</div>
        <div class="student-info">
          <span class="student-name">${s.nama}</span>
          <span class="student-nim">${s.nim}</span>
        </div>
      </div>
    `).join('');
  },

  updateNotifications: (notifs) => {
    const container = document.getElementById('notifications-list');
    const notifTab = document.querySelector('.tracker-tab[data-tab="notifications"]');
    if (!container) return;

    // Update badge on tab
    const existingBadge = notifTab?.querySelector('.notif-badge');
    if (existingBadge) existingBadge.remove();
    if (notifs && notifs.length > 0 && notifTab) {
      const badge = document.createElement('span');
      badge.className = 'notif-badge';
      badge.textContent = notifs.length;
      notifTab.appendChild(badge);
    }

    if (!notifs || notifs.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>Belum ada balasan untuk postingan kamu.</p></div>';
      return;
    }

    container.innerHTML = notifs.map(n => {
      const timeStr = new Date(n.time).toLocaleString('id-ID', { 
        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
      });
      const badgeClass = n.type === 'lecturer' ? 'badge-lecturer' : 'badge-student';
      const badgeText = n.type === 'lecturer' ? 'DOSEN' : 'MAHASISWA';
      const detailUrl = n.forumUrl || '#';
      
      return `
        <a href="${detailUrl}" target="_blank" class="notif-card notif-card--${n.type}">
          <div class="notif-header">
            <span class="notif-author">${n.author}</span>
            <span class="notif-badge-type ${badgeClass}">${badgeText}</span>
          </div>
          <div class="notif-course">${n.courseName || ''}</div>
          <div class="notif-body">${n.text}</div>
          <div class="notif-time">${timeStr}</div>
        </a>
      `;
    }).join('');
  },

  updatePresensiList: (presensiData) => {
    const container = document.getElementById('presensi-list');
    const overallBadge = document.getElementById('overall-attendance');
    if (!container) return;

    if (!presensiData || presensiData.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <p>Belum ada data presensi. Silakan klik tombol refresh di atas untuk sinkronisasi.</p>
        </div>
      `;
      if (overallBadge) overallBadge.innerText = '0%';
      const totalSksBadge = document.getElementById('total-sks-badge');
      if (totalSksBadge) totalSksBadge.style.display = 'none';
      return;
    }

    let totalPertemuan = 0;
    let totalHadir = 0;
    let totalSKS = 0;

    const cardsHtml = presensiData.map(data => {
      const hadir = data.pertemuan.filter(p => p.presensi_status === 'hadir').length;
      const total = data.pertemuan.length;
      totalPertemuan += total;
      totalHadir += hadir;

      const sksVal = parseInt(data.sks) || 0;
      totalSKS += sksVal;

      const percent = total > 0 ? Math.round((hadir / total) * 100) : 0;
      
      let badgeBg = 'var(--neo-success)';
      if (percent < 75) {
        badgeBg = 'var(--neo-warning)';
      }

      const randomId = 'presensi-card-' + Math.random().toString(36).substr(2, 9);
      
      // Simpan data pertemuan ke window agar bisa diakses oleh click handler
      window[randomId] = data;

      return `
        <div class="presensi-card" data-id="${randomId}">
          <div class="presensi-card-header">
            <div style="display: flex; flex-direction: column; gap: 4px; max-width: 75%;">
              <span class="presensi-matkul-title">${data.nama_mata_kuliah}</span>
              <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--neo-text-secondary); background: var(--neo-accent); border: 2px solid var(--neo-border); padding: 2px 6px; width: max-content; box-shadow: 1px 1px 0px var(--shadow-color); font-family: 'JetBrains Mono', monospace;">${sksVal} SKS</span>
            </div>
            <span class="presensi-percent-badge" style="background: ${badgeBg}">${percent}%</span>
          </div>
          <div class="presensi-stats-grid">
            <div class="presensi-stat-box">Pertemuan: ${total}</div>
            <div class="presensi-stat-box hadir">Hadir: ${hadir}</div>
            <div class="presensi-stat-box absen">Absen: ${total - hadir}</div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = cardsHtml;

    // Tambahkan event listener programatik untuk menghindari limitasi isolated world Chrome Extension
    container.querySelectorAll('.presensi-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const data = window[id];
        if (data) {
          trackerUI.showPresensiDetails(data);
        }
      });
    });

    const overallPercent = totalPertemuan > 0 ? Math.round((totalHadir / totalPertemuan) * 100) : 0;
    if (overallBadge) {
      overallBadge.innerText = `${overallPercent}%`;
      overallBadge.style.background = overallPercent >= 75 ? 'var(--neo-success)' : 'var(--neo-warning)';
      if (overallPercent < 75) {
        overallBadge.style.color = '#fff';
      } else {
        overallBadge.style.color = 'var(--neo-text-main)';
      }
    }

    const totalSksBadge = document.getElementById('total-sks-badge');
    if (totalSksBadge) {
      totalSksBadge.innerText = `Total: ${totalSKS} SKS`;
      totalSksBadge.style.display = 'inline-block';
    }
  },

  showPresensiDetails: (data) => {
    // Hapus modal lama jika ada
    const oldModal = document.getElementById('neo-presensi-modal');
    if (oldModal) oldModal.remove();

    const overlay = document.createElement('div');
    overlay.id = 'neo-presensi-modal';
    overlay.className = 'neo-modal-overlay';
    
    // Format tanggal
    const formatTanggal = (str) => {
      if (!str) return '-';
      try {
        const d = new Date(str);
        return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
      } catch (e) {
        return str;
      }
    };

    const rowsHtml = data.pertemuan.map((p, index) => {
      const isHadir = p.presensi_status === 'hadir';
      const statusBg = isHadir ? 'var(--neo-success)' : 'var(--neo-warning)';
      const statusColor = isHadir ? 'var(--neo-text-main)' : '#fff';
      const dateStr = p.presensi_date ? formatTanggal(p.presensi_date) : '-';
      const startDateStr = p.tanggal_mulai ? formatTanggal(p.tanggal_mulai) : '-';
      return `
        <tr>
          <td>${index + 1}</td>
          <td>${p.jenis_perkuliahan || '-'}</td>
          <td>
            <span class="neo-status-badge" style="background: ${statusBg}; color: ${statusColor}">
              ${p.presensi_status || 'tidak hadir'}
            </span>
          </td>
          <td>${startDateStr}</td>
          <td>${dateStr}</td>
          <td>${p.presensi_by || '-'}</td>
        </tr>
      `;
    }).join('');

    overlay.innerHTML = `
      <div class="neo-modal-content">
        <div class="neo-modal-header">
          <span class="neo-modal-title">${data.nama_mata_kuliah}</span>
          <button class="neo-modal-close" onclick="document.getElementById('neo-presensi-modal').remove()">×</button>
        </div>
        <div class="neo-table-container">
          <table class="neo-table">
            <thead>
              <tr>
                <th>Pert.</th>
                <th>Jenis</th>
                <th>Status</th>
                <th>Tgl Mulai</th>
                <th>Tgl Hadir</th>
                <th>Oleh</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
  },

  setLoading: (isLoading) => {
    const progress = document.getElementById('tracker-progress');
    const syncBtn = document.getElementById('refresh-tracker');
    const statusText = document.getElementById('last-sync');
    if (isLoading) {
      if (progress) progress.style.width = '70%';
      if (syncBtn) syncBtn.classList.add('loading');
      if (statusText) statusText.innerText = 'Syncing Neural Data...';
    } else {
      if (progress) {
        progress.style.width = '100%';
        setTimeout(() => { progress.style.width = '0%'; }, 800);
      }
      if (syncBtn) syncBtn.classList.remove('loading');
    }
  },

  updateProfile: (userInfo, courses) => {
    const container = document.getElementById('profile-container');
    if (!container) return;

    if (!userInfo) {
      container.innerHTML = `
        <div class="empty-state">
          <p>Data profil belum tersedia. Silakan lakukan sinkronisasi data (klik 🔄) terlebih dahulu.</p>
        </div>
      `;
      return;
    }

    let kelas = '-';
    if (courses && courses.length > 0) {
      for (const course of courses) {
        if (course.coursename && course.coursename.includes('#')) {
          const parts = course.coursename.split('#');
          if (parts.length > 1) {
            const rawKelas = parts[1].trim().split(' ')[0];
            if (rawKelas) {
              kelas = rawKelas;
              break;
            }
          }
        }
      }
    }

    container.innerHTML = `
      <div class="profile-card">
        <div class="profile-field">
          <span class="profile-label">Nama Lengkap</span>
          <span class="profile-val">${userInfo.name || '-'}</span>
        </div>
        <div class="profile-field">
          <span class="profile-label">NIM</span>
          <span class="profile-val nim">${userInfo.username || userInfo.nim || '-'}</span>
        </div>
        <div class="profile-field">
          <span class="profile-label">Kelas</span>
          <span class="profile-val">${kelas}</span>
        </div>
      </div>
    `;
  }
};

// Expose click handler untuk presensi card secara global ke window agar bisa dipanggil dari HTML onclick
window.runPresensiCardDetails = (randomId) => {
  const data = window[randomId];
  if (data && window.runTokenPresensiDetails) {
    window.runTokenPresensiDetails(data);
  }
};

