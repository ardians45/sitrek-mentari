# 🛰️ SITREK Mentari

[![Version](https://img.shields.io/badge/version-2.0.1-blue.svg?style=for-the-badge)](https://github.com/your-repo)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Chrome%20%7C%20Edge-lightgrey.svg?style=for-the-badge)](https://mentari.unpam.ac.id)

**SITREK Mentari** is an advanced browser extension (Manifest V3) designed to revolutionize your academic experience at **UNPAM**. Powered by Google Gemini AI, it provides seamless automation, real-time progress tracking, and intelligent assistance for the Mentari E-Learning and Academic Portal.

---

## 🌟 Key Features

### 1. 🧠 Neural Forum Tracker
Track your discussion progress across all courses with a high-end **iOS Glassmorphism UI**.
- **Complete Visibility:** View history for all meetings (P1 - P14).
- **Smart Status:** 
  - `🟢 Done`: Forum completed.
  - `🟠 Wait`: Active forum needing attention.
  - `⚪ Locked`: Closed or unavailable forums.
  - `∅ Empty`: Meetings without forum components.
- **Direct Navigation:** Click any pill to jump directly to the specific forum or meeting section.

### 2. 🤖 Gemini AI Integration
Integrated AI assistant to help you excel in your studies.
- **Auto-Answer Quiz:** Automatically solve quiz questions with high accuracy using Gemini 2.0 Flash.
- **Forum Assistant:** Generate high-quality responses and questions for discussion forums.
- **Smart Chatbot:** Floating AI chat interface for academic inquiries, supporting context memory.

### 3. 📊 Academic Insights
Real-time data synchronization directly from university APIs.
- **Attendance Monitor:** View detailed presence statistics and percentages.
- **WhatsApp Summary:** Generate a professional weekly meeting summary formatted for your class groups with one click.
- **Lecturer Notifications:** Get alerted when a lecturer replies to your forum posts.

### 4. ⚡ Automation & Productivity
- **Auto-Fill Questionnaire:** Complete evaluation forms instantly.
- **Quick Survey:** One-click rating for KHS surveys (Weighted/Random modes).
- **Auto Password:** Smart login assistance for the Mentari portal.

---

## 🚀 Installation Guide

1. **Download the Repository:**
   Clone or download this project as a ZIP and extract it to a folder.
2. **Open Extensions Page:**
   Go to `chrome://extensions/` (Chrome) or `edge://extensions/` (Edge).
3. **Enable Developer Mode:**
   Toggle the **"Developer mode"** switch in the top right corner.
4. **Load Unpacked:**
   Click the **"Load unpacked"** button and select the folder where you extracted the extension.
5. **Pin Extension:**
   Find the **SITREK Mentari** icon in your toolbar and pin it for quick access.

---

## 📖 How to Use

### Setup AI Assistant
1. Open [Mentari UNPAM](https://mentari.unpam.ac.id).
2. A popup will ask for your **Gemini API Key**.
3. Obtain a free key from the [Google AI Studio](https://aistudio.google.com/app/apikey).
4. Paste the key and click **Save**.

### Syncing Your Data
1. Navigate to the Mentari Dashboard.
2. Click the **Refresh** icon (🔄) in the Tracker UI.
3. Wait for "Neural Sync" to complete (the loading bar will show progress).
4. Your course list and meeting status will appear instantly.

### Sharing Class Summary
1. Once data is synced, click the **Summary** button in the bottom status bar.
2. A WhatsApp window will open with a perfectly formatted message:
   ```text
   *REKAP PERTEMUAN MENTARI*
   
   *OFFLINE :*
   PEMROGRAMAN II: *pert 9*
   ...
   ```

---

## 🛠️ Technical Architecture

- **Engine:** JavaScript (ES6+), Manifest V3.
- **UI:** CSS Grid/Flexbox, High-Contrast Glassmorphism, iOS-inspired Aesthetics.
- **AI Core:** Google Gemini API (v1beta).
- **Security:** Token-based authentication using existing session interception (No credentials stored).
- **Storage:** Localized `localStorage` caching with periodic validation.

---

## ⚠️ Disclaimer

This tool is intended for **educational and productivity purposes only**. Users are responsible for adhering to the university's academic integrity policies and terms of service. The developers are not liable for any misuse of this extension.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Developed with ❤️ for UNPAM Students.**
