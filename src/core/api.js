/**
 * API Manager - Menangani komunikasi dengan API Mentari Unpam
 */
import { storage, STORAGE_KEYS } from './storage.js';

export const api = {
  getAuthToken: () => {
    return storage.get(STORAGE_KEYS.AUTH_TOKEN, false);
  },

  fetchWithAuth: async (url, options = {}) => {
    const token = api.getAuthToken();
    if (!token) throw new Error("Authentication token not found");

    const defaultOptions = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
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

  // Mengambil daftar mata kuliah
  getCourses: async () => {
    const url = "https://mentari.unpam.ac.id/api/user-course?page=1&limit=50";
    return api.fetchWithAuth(url);
  },

  // Mengambil detail konten mata kuliah (termasuk status forum)
  getCourseDetail: async (courseCode) => {
    const url = `https://mentari.unpam.ac.id/api/user-course/${courseCode}`;
    return api.fetchWithAuth(url);
  },

  // Mengambil topik dalam sebuah forum
  getForumTopics: async (forumId) => {
    const url = `https://mentari.unpam.ac.id/api/forum/topic/${forumId}`;
    return api.fetchWithAuth(url);
  },

  // Mengambil balasan dalam sebuah topik forum
  getForumReplies: async (topicId) => {
    const url = `https://mentari.unpam.ac.id/api/forum/topic/reply/${topicId}`;
    return api.fetchWithAuth(url);
  }
};
