/**
 * Gemini AI Manager - Menangani interaksi dengan Google Gemini API
 */
import { storage, STORAGE_KEYS } from './storage.js';

export const gemini = {
  getApiKey: () => {
    const key = storage.get(STORAGE_KEYS.GEMINI_API_KEY, false);
    return key ? atob(key) : null;
  },

  ask: async (prompt, systemInstruction = "") => {
    const apiKey = gemini.getApiKey();
    if (!apiKey) throw new Error("Gemini API Key tidak ditemukan!");

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    const body = {
      contents: [{ 
        parts: [{ text: systemInstruction ? `${systemInstruction}\n\n${prompt}` : prompt }] 
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      }
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error("Gagal menghubungi Gemini API");

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, AI tidak memberikan respon.";
  },

  // Helper untuk merangkum diskusi
  summarizeDiscussion: async (content) => {
    const instruction = "Berikan ringkasan singkat dan natural dari diskusi forum berikut. Fokus pada inti pertanyaan atau topik yang dibahas.";
    return gemini.ask(content, instruction);
  },

  // Helper untuk membuat draf jawaban
  generateDraft: async (content) => {
    const instruction = "Buatkan draf jawaban diskusi yang natural, sopan, dan akademis berdasarkan konten diskusi berikut. Jangan gunakan format AI, buat seolah-olah ditulis oleh mahasiswa.";
    return gemini.ask(content, instruction);
  }
};
