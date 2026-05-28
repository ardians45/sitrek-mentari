/**
 * Storage Manager - Mengelola semua interaksi dengan localStorage
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: "mentari_auth_token",
  USER_INFO: "mentari_user_info",
  COURSE_DATA: "mentari_course_data",
  STUDENT_DATA: "mentari_student_data",
  NOTIFICATIONS: "mentari_notifications",
  LAST_UPDATE: "mentari_last_update"
};

export const storage = {
  save: (key, data) => {
    try {
      const value = typeof data === 'string' ? data : JSON.stringify(data);
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.error(`Error saving to storage [${key}]:`, e);
      return false;
    }
  },

  get: (key, isJson = true) => {
    try {
      const value = localStorage.getItem(key);
      if (!value) return null;
      return isJson ? JSON.parse(value) : value;
    } catch (e) {
      console.error(`Error getting from storage [${key}]:`, e);
      return null;
    }
  },

  remove: (key) => {
    localStorage.removeItem(key);
  },

  clearCache: () => {
    localStorage.removeItem(STORAGE_KEYS.COURSE_DATA);
    localStorage.removeItem(STORAGE_KEYS.LAST_UPDATE);
  }
};
