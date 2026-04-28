/**
 * Token Interceptor - Menangkap token Bearer dari request Mentari
 */
import { storage, STORAGE_KEYS } from './storage.js';

export function initInterceptor() {
  console.log("Mentari Tracker: Interceptor active.");

  // Cegat Fetch API
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const response = await originalFetch(...args);
    
    // Periksa header Authorization di request
    const options = args[1];
    if (options && options.headers && (options.headers['Authorization'] || options.headers['authorization'])) {
      const auth = options.headers['Authorization'] || options.headers['authorization'];
      if (auth.startsWith('Bearer ')) {
        const token = auth.split(' ')[1];
        if (token) {
          storage.save(STORAGE_KEYS.AUTH_TOKEN, token);
          console.log("Mentari Tracker: Token captured from fetch.");
        }
      }
    }
    return response;
  };

  // Cegat XMLHttpRequest (beberapa request Mentari menggunakan ini)
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...args) {
    this.addEventListener('load', function() {
      // Kita tidak bisa baca request headers dari XHR setelah dikirim, 
      // tapi kita bisa coba ambil dari localStorage jika Mentari menyimpannya
      const rawToken = localStorage.getItem('token') || localStorage.getItem('accessToken');
      if (rawToken) {
          storage.save(STORAGE_KEYS.AUTH_TOKEN, rawToken.replace(/"/g, ''));
      }
    });
    return originalOpen.apply(this, [method, url, ...args]);
  };
  
  // Cara cadangan: Ambil langsung dari key bawaan Mentari jika ada
  const mentariToken = localStorage.getItem('token');
  if (mentariToken) {
      storage.save(STORAGE_KEYS.AUTH_TOKEN, mentariToken.replace(/"/g, ''));
  }
}
