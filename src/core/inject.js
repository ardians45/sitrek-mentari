/**
 * Inject Script - Menggunakan logika interceptor yang terbukti berhasil di token.js asli
 */
(function() {
    console.log("SITREK Mentari: Advanced Injection active.");

    const STORAGE_KEY = "mentari_auth_token";

    function saveToken(authHeader) {
        if (!authHeader) return;
        
        // Bersihkan token (ambil hanya bagian setelah Bearer jika ada)
        let token = authHeader;
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
        
        // Hapus tanda kutip jika ada
        token = token.replace(/"/g, '');

        if (token && token.startsWith('eyJ')) {
            localStorage.setItem(STORAGE_KEY, token);
            // Sinkronkan ke variabel window agar bisa dibaca script lain jika perlu
            window.lastMentariToken = token;
        }
    }

    // 1. Scan Storage Langsung (Sangat Efektif)
    function scanStorage() {
        const possibleKeys = ["token", "auth_token", "authToken", "access_token", "accessToken"];
        for (const key of possibleKeys) {
            const val = localStorage.getItem(key);
            if (val) saveToken(val);
        }

        // Scan semua key untuk JWT
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const val = localStorage.getItem(key);
            if (typeof val === 'string' && val.startsWith('eyJ')) {
                saveToken(val);
            }
        }
    }

    // 2. Intercept XHR (Krusial untuk Mentari)
    const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
    XMLHttpRequest.prototype.setRequestHeader = function(header, value) {
        if (header && header.toLowerCase() === "authorization" && value) {
            saveToken(value);
        }
        return originalSetRequestHeader.apply(this, arguments);
    };

    // 3. Intercept Fetch API
    const originalFetch = window.fetch;
    window.fetch = function(resource, init = {}) {
        if (init && init.headers) {
            let authHeader = null;
            if (init.headers instanceof Headers) {
                authHeader = init.headers.get("authorization") || init.headers.get("Authorization");
            } else if (typeof init.headers === "object") {
                authHeader = init.headers.authorization || init.headers.Authorization;
            }
            if (authHeader) saveToken(authHeader);
        }
        return originalFetch.apply(this, arguments);
    };

    // Jalankan scan awal
    scanStorage();
    
    // Scan berkala setiap 5 detik untuk memastikan token terbaru
    setInterval(scanStorage, 5000);
})();
