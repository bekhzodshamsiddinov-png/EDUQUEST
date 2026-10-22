# EDUQUEST

O‘zbekiston maktab darsliklari asosidagi o‘yinli ta’lim platformasi (1–11-sinf).

**Hozirgi holat:** InnoWeek 2026 uchun prototip. Ma’lumotlar namunaviy, server qismi hali yo‘q.

## Sahifalar
- **Umumiy test** — 9 fan (geografiya: 195 davlat, ingliz tili Beginner→Advanced, rus tili, mental arifmetika, biologiya, tarix, mantiq, robototexnika, IT), 1 yoki 2 kishilik mashina poygasi
- **Garaj** — haqiqiy mashinalar (rasmlar: Wikimedia Commons)
- **Bosh sahifa** — platforma taqdimoti, fanlar, o‘yin rejimlari, narxlar
- **Bilim poygasi** — ikki o‘yinchi bitta ekranda (A S D F / J K L ;)
- **Sarguzasht yo‘li** — darslik boblari xaritasi, yuqori sinf mavzulari yopiq
- **Reyting** — sinf, parallel sinflar, maktab, tuman, viloyat
- **Ustoz paneli** — sinf kodi, mavzular xaritasi, tavsiya etilgan baho

## Ishga tushirish
```bash
npm install
npm run dev
```

## Keyingi bosqichlar
1. Supabase: o‘quvchi, sinf, maktab, natijalar
2. Sinf kodi bilan kirish va ustoz paneli (haqiqiy)
3. Darslik mavzulari bo‘yicha savollar banki (10 fan, 5–9-sinf)
4. Vercel’ga joylash

## Tillar
Interfeys: o‘zbek, rus, ingliz, xitoy (`src/translations.ts`). Savollar matni hozircha o‘zbek tilida; geografiya savollaridagi davlat nomlari 4 tilda.
