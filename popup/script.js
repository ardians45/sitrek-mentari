document.getElementById("runToken").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab.url.includes("mentari.unpam.ac.id") && !tab.url.includes("my.unpam.ac.id")) {
    alert("Ekstensi ini hanya dapat dijalankan di halaman Mentari UNPAM!");
    return;
  }

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      if (window.runToken) {
        window.runToken();
      } else {
        alert("Silakan REFRESH (F5) halaman ini terlebih dahulu agar ekstensi dapat berjalan!");
      }
    },
  });
});
