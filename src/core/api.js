/**
 * API Manager - Menangani komunikasi dengan API Mentari Unpam
 */
import { storage, STORAGE_KEYS } from './storage.js';

export const api = {
  getAuthToken: () => {
    let token = storage.get(STORAGE_KEYS.AUTH_TOKEN, false);
    if (!token) {
      // Fallback: cari token langsung di localStorage/sessionStorage/cookies
      const possibleKeys = ["token", "accessToken", "auth_token", "mentari_auth_token"];
      for (const key of possibleKeys) {
        const val = localStorage.getItem(key) || sessionStorage.getItem(key);
        if (val) {
          token = val.replace(/"/g, '');
          break;
        }
      }
    }
    // Bersihkan token dari prefix "__q_strn|" jika ada
    if (token && token.includes("__q_strn|")) {
      token = token.split("__q_strn|")[1];
    }
    return token;
  },

  fetchWithAuth: async (url, options = {}) => {
    const token = api.getAuthToken();
    if (!token) throw new Error("Authentication token not found");

    // Dapatkan XSRF token jika ada dari cookie
    let xsrfToken = "";
    const xsrfCookie = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("XSRF-TOKEN="));
    if (xsrfCookie) {
      xsrfToken = decodeURIComponent(xsrfCookie.split("=")[1]);
    }

    const defaultHeaders = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    if (xsrfToken) {
      defaultHeaders['x-xsrf-token'] = xsrfToken;
    }

    const defaultOptions = {
      headers: defaultHeaders,
      cache: 'no-store'
    };

    const response = await fetch(url, { ...defaultOptions, ...options });
    if (!response.ok) {
      if (response.status === 401) {
        console.error("Token expired or invalid");
      }
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  },

  // Mengambil daftar mata kuliah (Mentari)
  getCourses: async () => {
    const url = "https://mentari.unpam.ac.id/api/user-course?page=1&limit=50";
    return api.fetchWithAuth(url);
  },

  // Mengambil detail konten mata kuliah (Mentari)
  getCourseDetail: async (courseCode) => {
    const url = `https://mentari.unpam.ac.id/api/user-course/${courseCode}`;
    return api.fetchWithAuth(url);
  },

  // Mengambil topik dalam sebuah forum (Mentari)
  getForumTopics: async (forumId) => {
    const url = `https://mentari.unpam.ac.id/api/forum/topic/${forumId}`;
    return api.fetchWithAuth(url);
  },

  // Mengambil jadwal kuliah mahasiswa (my.unpam.ac.id)
  getJadwalKuliah: async () => {
    const url = "https://my.unpam.ac.id/api/presensi/mahasiswa/jadwal-kuliah";
    return api.fetchWithAuth(url);
  },

  // Mengambil rincian presensi per mata kuliah (my.unpam.ac.id)
  getPresensiPertemuan: async (idKelas, idMataKuliah) => {
    const url = `https://my.unpam.ac.id/api/presensi/mahasiswa/jadwal-pertemuan/${idKelas}/${idMataKuliah}`;
    return api.fetchWithAuth(url);
  }
};
