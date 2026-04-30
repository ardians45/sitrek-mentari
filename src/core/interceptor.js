/**
 * Token Interceptor - Menangkap token Bearer dari request Mentari
 */
import { storage, STORAGE_KEYS } from './storage.js';

function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function initInterceptor() {
  console.log("Mentari Tracker: Interceptor active.");

  const saveTokenAndUser = (token) => {
    if (!token) return;
    const cleanToken = token.replace(/"/g, '');
    storage.save(STORAGE_KEYS.AUTH_TOKEN, cleanToken);
    
    const payload = decodeToken(cleanToken);
    if (payload) {
      storage.save(STORAGE_KEYS.USER_INFO, {
        id: payload.id,
        username: payload.username || payload.nim,
        name: payload.fullname || payload.name
      });
    }
  };

  // Cegat Fetch API
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const response = await originalFetch(...args);
    
    // Periksa header Authorization di request
    const options = args[1];
    if (options && options.headers) {
      let auth = null;
      if (options.headers instanceof Headers) {
        auth = options.headers.get('Authorization');
      } else {
        auth = options.headers['Authorization'] || options.headers['authorization'];
      }
      
      if (auth && auth.startsWith('Bearer ')) {
        saveTokenAndUser(auth.split(' ')[1]);
      }
    }
    return response;
  };

  // Cegat XMLHttpRequest
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...args) {
    this.addEventListener('load', function() {
      const rawToken = localStorage.getItem('token') || localStorage.getItem('accessToken') || localStorage.getItem('mentari_auth_token');
      if (rawToken) saveTokenAndUser(rawToken);
    });
    return originalOpen.apply(this, [method, url, ...args]);
  };
  
  // Cara cadangan
  const mentariToken = localStorage.getItem('token') || localStorage.getItem('mentari_auth_token');
  if (mentariToken) saveTokenAndUser(mentariToken);
}
