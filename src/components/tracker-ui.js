/**
 * Tracker UI - SITREK Mentari (Awwwards Edition)
 * Concept: Ethereal Dark / Vercel Aesthetics
 */
export const trackerUI = {
  activeTab: 'home',

  createContainer: () => {
    if (document.getElementById('mentari-tracker-root')) return document.getElementById('mentari-tracker-root');

    const root = document.createElement('div');
    root.id = 'mentari-tracker-root';
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
    document.body.appendChild(root);
    trackerUI.injectStyles();
    trackerUI.initTabs();
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
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&display=swap');

      :root {
        --ios-bg: rgba(20, 20, 22, 0.85);
        --ios-card: rgba(255, 255, 255, 0.06);
        --ios-border: rgba(255, 255, 255, 0.15);
        --ios-accent: #0A84FF;
        --ios-success: #30D158;
        --ios-warning: #FF9F0A;
        --ios-text-main: #FFFFFF;
        --ios-text-secondary: rgba(255, 255, 255, 0.6);
        --ios-text-muted: rgba(255, 255, 255, 0.35);
        --ios-blur: blur(30px) saturate(200%);
      }

      #mentari-tracker-root {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 2147483647;
        font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
      }

      #mentari-tracker-app {
        width: 440px;
        background: var(--ios-bg);
        backdrop-filter: var(--ios-blur);
        -webkit-backdrop-filter: var(--ios-blur);
        border: 1px solid var(--ios-border);
        border-radius: 32px;
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
        overflow: hidden;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        color: var(--ios-text-main);
        display: flex;
        flex-direction: column;
      }

      #mentari-tracker-app.tracker-collapsed {
        width: 260px;
        height: 72px;
        border-radius: 40px;
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
        background: rgba(255, 255, 255, 0.03);
        border-bottom: 1px solid var(--ios-border);
        cursor: pointer;
        user-select: none;
      }

      .tracker-brand { display: flex; align-items: center; gap: 12px; }

      .brand-visual {
        width: 40px;
        height: 40px;
        background: #fff;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      }

      .brand-visual img { width: 100%; height: 100%; object-fit: contain; }

      .brand-info { display: flex; flex-direction: column; }
      .brand-name { font-weight: 800; font-size: 16px; letter-spacing: -0.2px; }
      .brand-name .accent { color: var(--ios-accent); filter: drop-shadow(0 0 8px var(--ios-accent)); }
      .brand-tagline { 
        font-size: 10px; 
        color: var(--ios-text-secondary); 
        font-weight: 700; 
        text-transform: uppercase; 
        letter-spacing: 1px;
      }

      .tracker-actions { 
        display: flex; 
        gap: 10px; 
        align-items: center;
      }

      .action-btn {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: var(--ios-text-secondary);
        width: 38px;
        height: 38px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        position: relative;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
      }

      .action-btn svg {
        transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        filter: drop-shadow(0 0 0px var(--ios-accent));
      }

      .action-btn:hover {
        background: rgba(10, 132, 255, 0.15);
        border-color: rgba(10, 132, 255, 0.4);
        color: var(--ios-accent);
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 10px 25px rgba(10, 132, 255, 0.3), 
                    inset 0 1px 1px rgba(255,255,255,0.2);
      }

      .action-btn:hover svg {
        filter: drop-shadow(0 0 5px var(--ios-accent));
        transform: scale(1.1);
      }

      .action-btn:active {
        transform: translateY(0) scale(0.95);
      }

      .sync-btn.loading svg {
        animation: neural-spin 1.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        color: var(--ios-accent);
      }

      @keyframes neural-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .toggle-btn svg {
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }

      #mentari-tracker-app.tracker-collapsed .toggle-btn svg {
        transform: rotate(180deg);
      }

      .tracker-tabs {
        display: flex;
        padding: 8px 16px;
        background: rgba(255, 255, 255, 0.02);
        border-bottom: 1px solid var(--ios-border);
        gap: 8px;
      }

      .tracker-tab {
        flex: 1;
        background: transparent;
        border: none;
        color: var(--ios-text-secondary);
        padding: 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        transition: all 0.3s;
      }

      .tracker-tab:hover { background: rgba(255, 255, 255, 0.05); color: var(--ios-text-main); }
      .tracker-tab.active { background: var(--ios-accent); color: white; }

      .tracker-content {
        height: 480px;
        overflow-y: auto;
        padding: 20px;
        scrollbar-width: thin;
        scrollbar-color: rgba(255,255,255,0.1) transparent;
      }

      .tab-pane { display: none; }
      .tab-pane.active { display: block; animation: fadeIn 0.4s ease-out; }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .section-header-modern {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--ios-border);
      }

      .section-header-modern h3 { margin: 0; font-size: 18px; font-weight: 700; }
      .count-badge {
        background: rgba(255,255,255,0.1);
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 700;
        color: var(--ios-accent);
      }

      /* Student List Styling */
      .student-card {
        background: var(--ios-card);
        border: 1px solid var(--ios-border);
        border-radius: 16px;
        padding: 14px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .student-avatar {
        width: 36px;
        height: 36px;
        background: linear-gradient(135deg, #0A84FF, #30D158);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 12px;
      }

      .student-info { flex: 1; }
      .student-name { font-weight: 700; font-size: 14px; display: block; }
      .student-nim { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--ios-text-secondary); }

      /* Notif List Styling */
      .notif-card {
        background: var(--ios-card);
        border-left: 4px solid var(--ios-accent);
        border-radius: 12px;
        padding: 14px;
        margin-bottom: 12px;
      }

      .notif-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
      .notif-author { font-weight: 700; font-size: 13px; color: var(--ios-accent); }
      .notif-time { font-size: 10px; color: var(--ios-text-muted); }
      .notif-body { font-size: 12px; line-height: 1.4; color: var(--ios-text-secondary); }

      .course-card {
        background: var(--ios-card);
        border: 1px solid var(--ios-border);
        border-radius: 24px;
        padding: 18px;
        margin-bottom: 16px;
        transition: transform 0.3s ease;
      }

      .course-card:hover {
        background: rgba(255, 255, 255, 0.09);
        border-color: rgba(255, 255, 255, 0.25);
      }

      .course-header-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
        gap: 12px;
      }

      .course-title { 
        font-weight: 700; 
        font-size: 14px; 
        color: var(--ios-text-main);
        line-height: 1.5;
        flex: 1;
      }
      
      .course-progress {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        min-width: 50px;
      }
      .progress-label { 
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px; 
        font-weight: 800; 
        color: var(--ios-accent);
      }
      .progress-bar-bg { width: 44px; height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; margin-top: 4px; }
      .progress-bar-fill { height: 100%; background: var(--ios-accent); border-radius: 3px; transition: width 1s ease; }

      .forum-pills { display: flex; flex-wrap: wrap; gap: 8px; }

      .forum-pill {
        padding: 8px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 700;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s;
        border: 1px solid transparent;
        color: var(--ios-text-secondary);
        background: rgba(255, 255, 255, 0.05);
      }

      .forum-pill.completed {
        background: rgba(48, 209, 88, 0.2);
        color: #30D158;
        border-color: rgba(48, 209, 88, 0.3);
      }

      .forum-pill.locked {
        background: rgba(255, 255, 255, 0.03);
        color: var(--ios-text-muted);
        border-color: rgba(255, 255, 255, 0.05);
      }

      .forum-pill:not(.completed):not(.locked) {
        background: rgba(255, 159, 10, 0.2);
        color: #FF9F0A;
        border-color: rgba(255, 159, 10, 0.3);
      }

      .forum-pill:hover:not(.locked) {
        transform: scale(1.05);
        background: rgba(255, 255, 255, 0.15);
        color: #fff;
      }

      .tracker-status-bar {
        padding: 16px 24px;
        background: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 14px;
        border-top: 1px solid var(--ios-border);
      }

      .status-item { display: flex; align-items: center; gap: 6px; }
      .dot { width: 8px; height: 8px; border-radius: 50%; }
      .dot.green { background: var(--ios-success); box-shadow: 0 0 10px var(--ios-success); }
      .dot.orange { background: var(--ios-warning); box-shadow: 0 0 10px var(--ios-warning); }
      .dot.gray { background: var(--ios-text-muted); }
      .status-item .label { 
        font-size: 11px; 
        font-weight: 700; 
        color: var(--ios-text-secondary); 
      }

      .share-btn {
        margin-left: auto;
        background: var(--ios-accent);
        color: #fff;
        border: none;
        padding: 8px 16px;
        border-radius: 18px;
        font-size: 11px;
        font-weight: 800;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 4px 12px rgba(10, 132, 255, 0.4);
      }

      .share-btn:hover { transform: translateY(-1px); filter: brightness(1.1); }

      .empty-state { text-align: center; padding: 60px 20px; color: var(--ios-text-secondary); }
      .prime-btn {
        background: var(--ios-accent);
        color: white; border: none; padding: 14px 30px; border-radius: 20px; font-size: 14px;
        font-weight: 700; cursor: pointer; transition: all 0.3s;
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
                return `<div class="forum-pill locked" title="Tidak ada forum" style="opacity: 0.5">∅ ${pLabel}</div>`;
              }
              return s.forums.map(f => {
                let statusClass = '';
                let icon = '';
                let href = '';
                if (f.completion === true) {
                  statusClass = 'completed'; icon = '✓';
                  href = f.id ? `https://mentari.unpam.ac.id/u-courses/${course.kode_course}/forum/${f.id}` : `https://mentari.unpam.ac.id/u-courses/${course.kode_course}?accord_pertemuan=${s.kode}`;
                } else if (f.id) {
                  statusClass = ''; icon = '○';
                  href = `https://mentari.unpam.ac.id/u-courses/${course.kode_course}/forum/${f.id}`;
                } else {
                  statusClass = 'locked'; icon = '🔒';
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

    container.innerHTML = students.map(s => `
      <div class="student-card">
        <div class="student-avatar">${s.nama.charAt(0)}</div>
        <div class="student-info">
          <span class="student-name">${s.nama}</span>
          <span class="student-nim">${s.nim}</span>
        </div>
      </div>
    `).join('');
  },

  updateNotifications: (notifs) => {
    const container = document.getElementById('notifications-list');
    if (!container) return;

    if (!notifs || notifs.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>No new notifications detected.</p></div>';
      return;
    }

    container.innerHTML = notifs.map(n => `
      <div class="notif-card">
        <div class="notif-header">
          <span class="notif-author">${n.author}</span>
          <span class="notif-time">${n.time}</span>
        </div>
        <div class="notif-body">${n.text}</div>
      </div>
    `).join('');
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
  }
};
