/**
 * Loader - Menyuntikkan Core Tracker dan Injector
 */
(async () => {
    // 1. Suntikkan inject.js ke halaman utama Mentari
    const injectScript = document.createElement('script');
    injectScript.src = chrome.runtime.getURL('src/core/inject.js');
    injectScript.onload = function() {
        this.remove(); // Hapus tag script setelah dieksekusi agar bersih
    };
    (document.head || document.documentElement).appendChild(injectScript);

    // 2. Muat logic utama
    const src = chrome.runtime.getURL('src/content/main.js');
    await import(src);
})();
