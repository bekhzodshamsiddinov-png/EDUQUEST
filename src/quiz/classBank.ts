/** Grade-specific question bank. `g` = school grade. First answer is always the correct one. */
export type ClassItem = { g: number; q: string; a: [string, string, string, string] }

export const CLASS_BANK: Record<string, ClassItem[]> = {
  math: [
    { g: 1, q: '7 + 8 = ?', a: ['15', '14', '16', '13'] },
    { g: 1, q: '15 − 6 = ?', a: ['9', '8', '11', '7'] },
    { g: 1, q: 'Qaysi son 10 dan katta?', a: ['12', '8', '9', '10'] },
    { g: 1, q: 'Uchburchakning nechta burchagi bor?', a: ['3', '4', '2', '5'] },

    { g: 2, q: '6 × 7 = ?', a: ['42', '36', '48', '13'] },
    { g: 2, q: '56 : 8 = ?', a: ['7', '6', '8', '9'] },
    { g: 2, q: '47 + 36 = ?', a: ['83', '73', '81', '84'] },
    { g: 2, q: '1 metr necha santimetr?', a: ['100 sm', '10 sm', '1000 sm', '50 sm'] },

    { g: 3, q: '9 × 8 = ?', a: ['72', '63', '81', '64'] },
    { g: 3, q: '345 + 278 = ?', a: ['623', '613', '523', '633'] },
    { g: 3, q: 'Bir sutka necha soat?', a: ['24', '12', '60', '48'] },
    { g: 3, q: 'Tomonlari 5 sm va 3 sm bo‘lgan to‘g‘ri to‘rtburchak perimetri?', a: ['16 sm', '15 sm', '8 sm', '30 sm'] },

    { g: 4, q: '125 × 8 = ?', a: ['1000', '900', '1025', '1250'] },
    { g: 4, q: '1 km necha metr?', a: ['1000 m', '100 m', '10 000 m', '500 m'] },
    { g: 4, q: '1 soat necha minut?', a: ['60', '100', '30', '24'] },
    { g: 4, q: '3600 : 9 = ?', a: ['400', '40', '360', '4000'] },

    { g: 5, q: '2,5 + 3,75 = ?', a: ['6,25', '5,25', '6,75', '6,2'] },
    { g: 5, q: '3/8 + 2/8 = ?', a: ['5/8', '5/16', '1/8', '6/8'] },
    { g: 5, q: '1,2 × 0,5 = ?', a: ['0,6', '6', '0,06', '1,7'] },
    { g: 5, q: '0,25 ni oddiy kasr ko‘rinishida yozing', a: ['1/4', '1/25', '2/5', '25/10'] },

    { g: 6, q: '24 va 36 ning EKUBi?', a: ['12', '6', '72', '4'] },
    { g: 6, q: '4 va 6 ning EKUKi?', a: ['12', '24', '2', '10'] },
    { g: 6, q: '−7 + 3 = ?', a: ['−4', '4', '−10', '10'] },
    { g: 6, q: '2 : x = 4 : 10 proporsiyada x = ?', a: ['5', '8', '20', '0,8'] },
  ],

  algebra: [
    { g: 7, q: '(a + b)² = ?', a: ['a² + 2ab + b²', 'a² + b²', 'a² − 2ab + b²', '2a + 2b'] },
    { g: 7, q: 'x³ · x⁴ = ?', a: ['x⁷', 'x¹²', 'x', '2x⁷'] },
    { g: 7, q: '5x − 7 = 3x + 9 bo‘lsa, x = ?', a: ['8', '1', '−8', '2'] },
    { g: 7, q: 'y = 2x + 3 funksiyada x = 4 bo‘lsa, y = ?', a: ['11', '10', '14', '9'] },

    { g: 8, q: '√144 = ?', a: ['12', '14', '72', '16'] },
    { g: 8, q: '√50 ni soddalashtiring', a: ['5√2', '25√2', '2√5', '10√5'] },
    { g: 8, q: 'x² − 5x + 6 = 0 tenglama ildizlari?', a: ['2 va 3', '−2 va −3', '1 va 6', '−1 va 6'] },
    { g: 8, q: 'Viyet teoremasiga ko‘ra x² − 7x + 10 = 0 ildizlari yig‘indisi?', a: ['7', '−7', '10', '−10'] },
    { g: 8, q: 'Viyet teoremasiga ko‘ra x² + 3x − 10 = 0 ildizlari ko‘paytmasi?', a: ['−10', '10', '3', '−3'] },
    { g: 8, q: '2x − 3 > 5 tengsizlik yechimi?', a: ['x > 4', 'x < 4', 'x > 1', 'x > 8'] },

    { g: 9, q: 'Arifmetik progressiya: a₁ = 3, d = 4. a₁₀ = ?', a: ['39', '43', '40', '35'] },
    { g: 9, q: 'Geometrik progressiya: b₁ = 2, q = 3. b₄ = ?', a: ['54', '18', '162', '24'] },
    { g: 9, q: 'y = x² − 4x + 3 parabola uchining abssissasi?', a: ['2', '−2', '4', '3'] },
    { g: 9, q: 'x² − 9 < 0 tengsizlik yechimi?', a: ['−3 < x < 3', 'x > 3', 'x < −3', 'x > 9'] },

    { g: 10, q: 'sin²α + cos²α = ?', a: ['1', '0', '2', 'tg α'] },
    { g: 10, q: 'cos 60° = ?', a: ['1/2', '√3/2', '1', '0'] },
    { g: 10, q: 'log₂ 8 = ?', a: ['3', '4', '2', '16'] },
    { g: 10, q: '2ˣ = 32 bo‘lsa, x = ?', a: ['5', '4', '16', '6'] },

    { g: 11, q: '(x³)′ = ?', a: ['3x²', 'x²', '3x³', 'x⁴/4'] },
    { g: 11, q: 'f(x) = x² bo‘lsa, f′(3) = ?', a: ['6', '9', '3', '2'] },
    { g: 11, q: '∫2x dx = ?', a: ['x² + C', '2x² + C', '2 + C', 'x + C'] },
    { g: 11, q: '(sin x)′ = ?', a: ['cos x', '−cos x', 'sin x', '−sin x'] },
  ],

  geometry: [
    { g: 7, q: 'To‘g‘ri burchak necha gradus?', a: ['90°', '180°', '45°', '60°'] },
    { g: 7, q: 'Qo‘shni burchaklar yig‘indisi?', a: ['180°', '90°', '360°', '270°'] },
    { g: 7, q: 'Uchburchakning ikki burchagi 50° va 60°. Uchinchisi?', a: ['70°', '80°', '60°', '110°'] },
    { g: 7, q: 'Vertikal burchaklar qanday bo‘ladi?', a: ['O‘zaro teng', 'Yig‘indisi 90°', 'Yig‘indisi 180°', 'Biri ikkinchisidan katta'] },

    { g: 8, q: 'Katetlari 3 va 4 bo‘lgan to‘g‘ri burchakli uchburchak gipotenuzasi?', a: ['5', '7', '6', '12'] },
    { g: 8, q: 'Parallelogramm yuzi formulasi?', a: ['S = a · h', 'S = a · b / 2', 'S = 2(a + b)', 'S = a²'] },
    { g: 8, q: 'Romb diagonallari 6 va 8. Yuzi?', a: ['24', '48', '14', '12'] },
    { g: 8, q: 'Qavariq beshburchak ichki burchaklari yig‘indisi?', a: ['540°', '360°', '720°', '900°'] },

    { g: 9, q: 'Radiusi 5 sm bo‘lgan aylana uzunligi?', a: ['10π sm', '25π sm', '5π sm', '20π sm'] },
    { g: 9, q: 'Radiusi 3 sm bo‘lgan doira yuzi?', a: ['9π sm²', '6π sm²', '3π sm²', '18π sm²'] },
    { g: 9, q: 'Kosinuslar teoremasi: a² = ?', a: ['b² + c² − 2bc·cos α', 'b² + c²', 'b² − c²', 'b² + c² + 2bc·cos α'] },
    { g: 9, q: 'a(3; 4) vektorning uzunligi?', a: ['5', '7', '25', '1'] },

    { g: 10, q: 'Uchburchakli prizmaning nechta yog‘i bor?', a: ['5', '6', '3', '9'] },
    { g: 10, q: 'Tetraedrning nechta uchi bor?', a: ['4', '3', '6', '8'] },
    { g: 10, q: 'Kesishmaydigan va parallel bo‘lmagan to‘g‘ri chiziqlar?', a: ['Ayqash', 'Perpendikulyar', 'Kesishuvchi', 'Mos tushuvchi'] },
    { g: 10, q: 'Bir to‘g‘ri chiziqda yotmagan 3 nuqta orqali nechta tekislik o‘tadi?', a: ['Faqat bitta', 'Ikkita', 'Cheksiz ko‘p', 'Birorta ham'] },

    { g: 11, q: 'Qirrasi 3 sm bo‘lgan kubning hajmi?', a: ['27 sm³', '9 sm³', '18 sm³', '54 sm³'] },
    { g: 11, q: 'Silindr hajmi formulasi?', a: ['V = πr²h', 'V = 2πrh', 'V = πr²h/3', 'V = 4πr³/3'] },
    { g: 11, q: 'Radiusi 3 sm bo‘lgan shar hajmi?', a: ['36π sm³', '27π sm³', '12π sm³', '108π sm³'] },
    { g: 11, q: 'Konus hajmi formulasi?', a: ['V = πr²h/3', 'V = πr²h', 'V = πrl', 'V = 2πr²h'] },
  ],

  ona: [
    { g: 1, q: 'O‘zbek tilida nechta unli tovush bor?', a: ['6', '5', '8', '10'] },
    { g: 1, q: 'Qaysi harf unli tovushni bildiradi?', a: ['O', 'B', 'K', 'S'] },
    { g: 1, q: '“Ona” so‘zida nechta bo‘g‘in bor?', a: ['2', '1', '3', '4'] },
    { g: 1, q: 'Darak gap oxiriga qanday belgi qo‘yiladi?', a: ['Nuqta', 'Vergul', 'Tire', 'Qo‘shtirnoq'] },

    { g: 2, q: '“Kitob” so‘zida nechta harf bor?', a: ['5', '4', '6', '3'] },
    { g: 2, q: 'Kishi ismlari qanday harf bilan yoziladi?', a: ['Bosh harf', 'Kichik harf', 'Raqam', 'Istalgan harf'] },
    { g: 2, q: 'Qaysi so‘z “Kim?” so‘rog‘iga javob beradi?', a: ['O‘quvchi', 'Daftar', 'Yugurdi', 'Chiroyli'] },
    { g: 2, q: '“Qiz” so‘zining ko‘plik shakli?', a: ['Qizlar', 'Qizlari', 'Qizim', 'Qizga'] },

    { g: 3, q: '“Yugurmoq” qaysi so‘z turkumiga kiradi?', a: ['Fe’l', 'Ot', 'Sifat', 'Son'] },
    { g: 3, q: '“Qizil” so‘zi qaysi so‘roqqa javob beradi?', a: ['Qanday?', 'Kim?', 'Nima qildi?', 'Qayerda?'] },
    { g: 3, q: '“Katta” so‘zining antonimi?', a: ['Kichik', 'Ulkan', 'Baland', 'Yirik'] },
    { g: 3, q: '“Do‘st” so‘zining sinonimi?', a: ['O‘rtoq', 'Dushman', 'Qo‘shni', 'Mehmon'] },

    { g: 4, q: 'Gapning egasi qaysi so‘roqlarga javob beradi?', a: ['Kim? Nima?', 'Qanday?', 'Qayerda?', 'Nima qildi?'] },
    { g: 4, q: 'Gapning kesimi ko‘pincha qaysi so‘z turkumi bilan ifodalanadi?', a: ['Fe’l', 'Ot', 'Sifat', 'Son'] },
    { g: 4, q: '“Maktabga” so‘zidagi qo‘shimcha?', a: ['-ga', '-ka', '-qa', '-da'] },
    { g: 4, q: 'So‘roq gap oxiriga qanday belgi qo‘yiladi?', a: ['So‘roq belgisi', 'Nuqta', 'Vergul', 'Undov belgisi'] },

    { g: 5, q: 'Tilshunoslikning tovushlarni o‘rganadigan bo‘limi?', a: ['Fonetika', 'Leksikologiya', 'Morfologiya', 'Sintaksis'] },
    { g: 5, q: 'Shakli bir xil, ma’nosi har xil so‘zlar?', a: ['Omonimlar', 'Sinonimlar', 'Antonimlar', 'Paronimlar'] },
    { g: 5, q: 'Ma’nosi qarama-qarshi so‘zlar?', a: ['Antonimlar', 'Sinonimlar', 'Omonimlar', 'Arxaizmlar'] },
    { g: 5, q: 'Jarangli undoshni toping', a: ['B', 'P', 'K', 'S'] },

    { g: 6, q: '“Paxtakor” so‘zidagi so‘z yasovchi qo‘shimcha?', a: ['-kor', '-chi', '-la', '-dor'] },
    { g: 6, q: '“Uchinchi” sonining turi?', a: ['Tartib son', 'Sanoq son', 'Jamlovchi son', 'Kasr son'] },
    { g: 6, q: 'Qiyosiy darajadagi sifatni toping', a: ['Qizilroq', 'Qip-qizil', 'Qizil', 'Juda qizil'] },
    { g: 6, q: '“Beshta” so‘zi qaysi so‘z turkumiga kiradi?', a: ['Son', 'Ot', 'Sifat', 'Ravish'] },

    { g: 7, q: '“Men, sen, u” qaysi so‘z turkumi?', a: ['Olmosh', 'Ot', 'Ravish', 'Ko‘makchi'] },
    { g: 7, q: '“Tez yurdi” birikmasida “tez” qaysi so‘z turkumi?', a: ['Ravish', 'Sifat', 'Fe’l', 'Olmosh'] },
    { g: 7, q: 'Ko‘makchini toping', a: ['uchun', 'va', 'ham', 'faqat'] },
    { g: 7, q: '“O‘qidi” fe’li qaysi zamonda?', a: ['O‘tgan zamon', 'Hozirgi zamon', 'Kelasi zamon', 'Buyruq mayli'] },

    { g: 8, q: 'So‘z birikmasidagi asosiy so‘z nima deyiladi?', a: ['Hokim so‘z', 'Tobe so‘z', 'Ega', 'Kesim'] },
    { g: 8, q: 'Gapning bosh bo‘laklari?', a: ['Ega va kesim', 'To‘ldiruvchi va hol', 'Aniqlovchi va ega', 'Hol va kesim'] },
    { g: 8, q: '“Qanday? Qaysi?” so‘roqlariga javob beruvchi ikkinchi darajali bo‘lak?', a: ['Aniqlovchi', 'To‘ldiruvchi', 'Hol', 'Kesim'] },
    { g: 8, q: 'Undalma gapda qaysi belgi bilan ajratiladi?', a: ['Vergul', 'Nuqta', 'Qavs', 'Ikki nuqta'] },

    { g: 9, q: 'Qismlari teng bog‘lovchilar bilan bog‘langan qo‘shma gap?', a: ['Bog‘langan qo‘shma gap', 'Ergash gapli qo‘shma gap', 'Bog‘lovchisiz qo‘shma gap', 'Sodda gap'] },
    { g: 9, q: 'Ergash gapli qo‘shma gapdagi hokim qism nima deyiladi?', a: ['Bosh gap', 'Ergash gap', 'Kirish gap', 'Undalma'] },
    { g: 9, q: 'Teng bog‘lovchini toping', a: ['va', 'chunki', 'agar', 'garchi'] },
    { g: 9, q: '“Agar” bog‘lovchisi qaysi ergash gapni bog‘laydi?', a: ['Shart ergash gap', 'Sabab ergash gap', 'Maqsad ergash gap', 'Payt ergash gap'] },

    { g: 10, q: 'Qonun va rasmiy hujjatlar qaysi uslubda yoziladi?', a: ['Rasmiy uslub', 'Badiiy uslub', 'So‘zlashuv uslubi', 'Publitsistik uslub'] },
    { g: 10, q: 'Gazeta va jurnal maqolalari uslubi?', a: ['Publitsistik uslub', 'Ilmiy uslub', 'Rasmiy uslub', 'So‘zlashuv uslubi'] },
    { g: 10, q: 'Darslik va ilmiy maqolalar uslubi?', a: ['Ilmiy uslub', 'Badiiy uslub', 'So‘zlashuv uslubi', 'Rasmiy uslub'] },
    { g: 10, q: 'Iste’moldan chiqqan eskirgan so‘zlar?', a: ['Arxaizmlar', 'Neologizmlar', 'Dialektizmlar', 'Terminlar'] },

    { g: 11, q: 'Tilga yangi kirib kelgan so‘zlar?', a: ['Neologizmlar', 'Arxaizmlar', 'Tarixiy so‘zlar', 'Dialektizmlar'] },
    { g: 11, q: 'Faqat ma’lum hududda qo‘llanadigan sheva so‘zlari?', a: ['Dialektizmlar', 'Terminlar', 'Neologizmlar', 'Arxaizmlar'] },
    { g: 11, q: 'O‘xshatish asosida ma’no ko‘chishi?', a: ['Metafora', 'Metonimiya', 'Sinekdoxa', 'Vazifadoshlik'] },
    { g: 11, q: 'O‘zbek tiliga davlat tili maqomi berilgan sana?', a: ['1989-yil 21-oktabr', '1991-yil 1-sentabr', '1992-yil 8-dekabr', '1995-yil 6-may'] },
    { g: 11, q: 'Lotin yozuviga asoslangan o‘zbek alifbosi qabul qilingan yil?', a: ['1993-yil', '1989-yil', '1991-yil', '2000-yil'] },
  ],

  eng: [
    { g: 1, q: '“Olma” ingliz tilida qanday?', a: ['apple', 'orange', 'banana', 'pear'] },
    { g: 1, q: '“Qizil” ingliz tilida qanday?', a: ['red', 'blue', 'green', 'yellow'] },
    { g: 1, q: '“Three” qaysi son?', a: ['3', '2', '4', '8'] },
    { g: 1, q: '“Mushuk” ingliz tilida qanday?', a: ['cat', 'dog', 'cow', 'bird'] },

    { g: 2, q: 'Ingliz alifbosida nechta harf bor?', a: ['26', '24', '28', '33'] },
    { g: 2, q: '“Hello” so‘zining ma’nosi?', a: ['Salom', 'Xayr', 'Rahmat', 'Kechirasiz'] },
    { g: 2, q: 'This is ___ apple.', a: ['an', 'a', 'is', 'am'] },
    { g: 2, q: '“Ota” ingliz tilida qanday?', a: ['father', 'mother', 'brother', 'sister'] },

    { g: 3, q: 'She ___ a teacher.', a: ['is', 'am', 'are', 'be'] },
    { g: 3, q: 'They ___ students.', a: ['are', 'is', 'am', 'be'] },
    { g: 3, q: '“book” so‘zining ko‘plik shakli?', a: ['books', 'bookes', 'bookies', 'book'] },
    { g: 3, q: '“Monday” qaysi kun?', a: ['Dushanba', 'Seshanba', 'Yakshanba', 'Juma'] },

    { g: 4, q: '“child” so‘zining ko‘plik shakli?', a: ['children', 'childs', 'childes', 'childrens'] },
    { g: 4, q: 'I ___ got a pen.', a: ['have', 'has', 'is', 'am'] },
    { g: 4, q: 'There ___ two cats in the room.', a: ['are', 'is', 'am', 'be'] },
    { g: 4, q: '“Winter” qaysi fasl?', a: ['Qish', 'Yoz', 'Bahor', 'Kuz'] },

    { g: 5, q: 'He ___ football every day.', a: ['plays', 'play', 'playing', 'to play'] },
    { g: 5, q: 'I can ___ English.', a: ['speak', 'speaks', 'speaking', 'to speak'] },
    { g: 5, q: '“tooth” so‘zining ko‘plik shakli?', a: ['teeth', 'tooths', 'toothes', 'teeths'] },
    { g: 5, q: 'Where ___ you from?', a: ['are', 'is', 'am', 'do'] },

    { g: 6, q: 'Look! The children ___ now.', a: ['are playing', 'play', 'plays', 'played'] },
    { g: 6, q: '“write” fe’lining o‘tgan zamon shakli?', a: ['wrote', 'writed', 'written', 'writes'] },
    { g: 6, q: 'She ___ to school yesterday.', a: ['went', 'goes', 'go', 'going'] },
    { g: 6, q: '“good” sifatining qiyosiy darajasi?', a: ['better', 'gooder', 'best', 'more good'] },

    { g: 7, q: 'Everest is ___ mountain in the world.', a: ['the highest', 'higher', 'the higher', 'high'] },
    { g: 7, q: 'I ___ visit my grandma tomorrow.', a: ['will', 'did', 'was', 'have'] },
    { g: 7, q: 'There isn’t ___ milk in the fridge.', a: ['any', 'some', 'many', 'a'] },
    { g: 7, q: 'How ___ apples do you need?', a: ['many', 'much', 'any', 'more'] },

    { g: 8, q: 'I have ___ finished my homework.', a: ['already', 'yet', 'ago', 'since'] },
    { g: 8, q: 'She has lived here ___ 2015.', a: ['since', 'for', 'ago', 'during'] },
    { g: 8, q: 'I ___ TV when she called.', a: ['was watching', 'watch', 'am watching', 'have watched'] },
    { g: 8, q: '“see” fe’lining 3-shakli (Past Participle)?', a: ['seen', 'saw', 'seed', 'seeing'] },

    { g: 9, q: 'If it rains, we ___ at home.', a: ['will stay', 'stayed', 'would stay', 'stays'] },
    { g: 9, q: 'The letter ___ yesterday.', a: ['was written', 'wrote', 'is written', 'has written'] },
    { g: 9, q: 'I’m interested ___ music.', a: ['in', 'on', 'at', 'for'] },
    { g: 9, q: 'He is good ___ maths.', a: ['at', 'in', 'on', 'for'] },

    { g: 10, q: 'If I ___ rich, I would travel the world.', a: ['were', 'am', 'will be', 'be'] },
    { g: 10, q: 'By next year, she ___ her studies.', a: ['will have finished', 'finished', 'has finished', 'finishes'] },
    { g: 10, q: 'The book ___ I bought is great.', a: ['which', 'who', 'whose', 'where'] },
    { g: 10, q: 'I’m looking forward to ___ you.', a: ['seeing', 'see', 'saw', 'seen'] },

    { g: 11, q: 'If I had studied, I ___ the exam.', a: ['would have passed', 'would pass', 'will pass', 'passed'] },
    { g: 11, q: 'I wish I ___ a car now.', a: ['had', 'have', 'will have', 'has'] },
    { g: 11, q: '“Give up” iborasining ma’nosi?', a: ['Voz kechmoq', 'Ko‘tarmoq', 'Qaytarmoq', 'Kutmoq'] },
    { g: 11, q: 'Hardly ___ arrived when it started to rain.', a: ['had I', 'I had', 'have I', 'did I'] },
  ],

  geo: [
    { g: 5, q: 'Yer Quyosh atrofini taxminan necha kunda aylanib chiqadi?', a: ['365 kun', '24 kun', '30 kun', '100 kun'] },
    { g: 5, q: 'Yer o‘z o‘qi atrofida taxminan necha soatda aylanadi?', a: ['24 soat', '12 soat', '48 soat', '365 soat'] },
    { g: 5, q: 'Ekvator Yerni qaysi yarim sharlarga ajratadi?', a: ['Shimoliy va janubiy', 'Sharqiy va g‘arbiy', 'Shimoliy va sharqiy', 'Janubiy va g‘arbiy'] },
    { g: 5, q: 'Xaritada shimol odatda qaysi tomonda bo‘ladi?', a: ['Yuqorida', 'Pastda', 'Chapda', 'O‘ngda'] },

    { g: 6, q: 'Yerning havo qobig‘i?', a: ['Atmosfera', 'Gidrosfera', 'Litosfera', 'Biosfera'] },
    { g: 6, q: 'Yerning suv qobig‘i?', a: ['Gidrosfera', 'Atmosfera', 'Litosfera', 'Biosfera'] },
    { g: 6, q: 'Dunyodagi eng baland cho‘qqi?', a: ['Jomolungma (Everest)', 'Elbrus', 'Kilimanjaro', 'Monblan'] },
    { g: 6, q: 'Atmosfera bosimini o‘lchaydigan asbob?', a: ['Barometr', 'Termometr', 'Gigrometr', 'Flyuger'] },

    { g: 7, q: 'Eng katta materik?', a: ['Yevrosiyo', 'Afrika', 'Shimoliy Amerika', 'Antarktida'] },
    { g: 7, q: 'Eng kichik materik?', a: ['Avstraliya', 'Antarktida', 'Janubiy Amerika', 'Afrika'] },
    { g: 7, q: 'Nil daryosi qaysi materikda oqadi?', a: ['Afrika', 'Yevrosiyo', 'Janubiy Amerika', 'Avstraliya'] },
    { g: 7, q: 'Amazonka daryosi qaysi materikda?', a: ['Janubiy Amerika', 'Afrika', 'Yevrosiyo', 'Shimoliy Amerika'] },

    { g: 8, q: 'O‘zbekistonning eng baland nuqtasi?', a: ['Hazrati Sulton cho‘qqisi', 'Katta Chimyon', 'Adelung cho‘qqisi', 'Bobotog‘'] },
    { g: 8, q: 'O‘zbekistondagi eng katta cho‘l?', a: ['Qizilqum', 'Qoraqum', 'Mirzacho‘l', 'Qarshi cho‘li'] },
    { g: 8, q: 'Amudaryo va Sirdaryo qaysi suv havzasiga quyilgan?', a: ['Orol dengizi', 'Kaspiy dengizi', 'Qora dengiz', 'Issiqko‘l'] },
    { g: 8, q: 'O‘zbekiston iqlimi qanday?', a: ['Keskin kontinental', 'Mo‘tadil dengiz', 'Tropik nam', 'Subarktik'] },

    { g: 9, q: 'O‘zbekistonda nechta viloyat bor?', a: ['12', '14', '10', '13'] },
    { g: 9, q: 'Qoraqalpog‘iston Respublikasining poytaxti?', a: ['Nukus', 'Xiva', 'Urganch', 'Mo‘ynoq'] },
    { g: 9, q: 'Muborak gazni qayta ishlash zavodi qaysi viloyatda?', a: ['Qashqadaryo', 'Buxoro', 'Navoiy', 'Surxondaryo'] },
    { g: 9, q: 'Navoiy kon-metallurgiya kombinati asosan nima qazib oladi?', a: ['Oltin', 'Neft', 'Ko‘mir', 'Tuz'] },

    { g: 10, q: 'Maydoni eng katta davlat?', a: ['Rossiya', 'Kanada', 'Xitoy', 'AQSH'] },
    { g: 10, q: 'Maydoni eng kichik davlat?', a: ['Vatikan', 'Monako', 'San-Marino', 'Lixtenshteyn'] },
    { g: 10, q: 'BMT bosh qarorgohi qaysi shaharda?', a: ['Nyu-York', 'Jeneva', 'Parij', 'London'] },
    { g: 10, q: 'OPEK qaysi mahsulot eksport qiluvchi davlatlar tashkiloti?', a: ['Neft', 'Oltin', 'Bug‘doy', 'Paxta'] },

    { g: 11, q: 'Yaponiyaning poytaxti?', a: ['Tokio', 'Kioto', 'Osaka', 'Seul'] },
    { g: 11, q: 'Braziliyaning poytaxti?', a: ['Braziliya', 'Rio-de-Janeyro', 'San-Paulu', 'Buenos-Ayres'] },
    { g: 11, q: 'Avstraliyaning poytaxti?', a: ['Kanberra', 'Sidney', 'Melburn', 'Pert'] },
    { g: 11, q: 'Kanadaning rasmiy tillari?', a: ['Ingliz va fransuz', 'Ingliz va ispan', 'Faqat ingliz', 'Fransuz va nemis'] },
  ],

  world: [
    { g: 6, q: 'Qadimgi Misr hukmdorlari qanday atalgan?', a: ['Fir’avn', 'Imperator', 'Sulton', 'Xon'] },
    { g: 6, q: 'Olimpiya o‘yinlari qayerda boshlangan?', a: ['Qadimgi Yunoniston', 'Qadimgi Rim', 'Qadimgi Misr', 'Qadimgi Xitoy'] },
    { g: 6, q: 'Qadimgi Rimning birinchi imperatori?', a: ['Oktavian Avgust', 'Yuliy Sezar', 'Neron', 'Tsitseron'] },
    { g: 6, q: 'Aleksandr Makedonskiyning ustozi?', a: ['Aristotel', 'Platon', 'Sokrat', 'Gerodot'] },

    { g: 7, q: 'G‘arbiy Rim imperiyasi qachon qulagan?', a: ['476-yil', '395-yil', '1453-yil', '622-yil'] },
    { g: 7, q: 'Konstantinopol turklar tomonidan qachon zabt etilgan?', a: ['1453-yil', '1492-yil', '1204-yil', '1389-yil'] },
    { g: 7, q: 'Birinchi salib yurishi qachon boshlangan?', a: ['1096-yil', '1066-yil', '1215-yil', '1453-yil'] },
    { g: 7, q: 'Angliyada “Buyuk erkinliklar xartiyasi” qachon qabul qilingan?', a: ['1215-yil', '1096-yil', '1337-yil', '1688-yil'] },

    { g: 8, q: 'Kolumb Amerikani qachon kashf etgan?', a: ['1492-yil', '1498-yil', '1519-yil', '1453-yil'] },
    { g: 8, q: 'Dunyo bo‘ylab birinchi sayohat kimning ekspeditsiyasi?', a: ['Magellan', 'Kolumb', 'Vasko da Gama', 'Jeyms Kuk'] },
    { g: 8, q: 'AQSH Mustaqillik deklaratsiyasi qabul qilingan yil?', a: ['1776-yil', '1789-yil', '1812-yil', '1492-yil'] },
    { g: 8, q: 'Buyuk fransuz inqilobi boshlangan yil?', a: ['1789-yil', '1776-yil', '1815-yil', '1848-yil'] },

    { g: 9, q: 'Napoleon qaysi jangda so‘nggi mag‘lubiyatga uchragan?', a: ['Vaterloo', 'Austerlits', 'Borodino', 'Leyptsig'] },
    { g: 9, q: 'AQSHda fuqarolar urushi qachon boshlangan?', a: ['1861-yil', '1776-yil', '1812-yil', '1914-yil'] },
    { g: 9, q: 'Germaniyani birlashtirgan “temir kansler”?', a: ['Otto fon Bismark', 'Vilgelm II', 'Metternix', 'Napoleon III'] },
    { g: 9, q: 'Italiyani birlashtirish uchun kurashgan xalq qahramoni?', a: ['Juzeppe Garibaldi', 'Otto fon Bismark', 'Napoleon III', 'Metternix'] },

    { g: 10, q: 'Birinchi jahon urushi qachon boshlangan?', a: ['1914-yil', '1939-yil', '1918-yil', '1905-yil'] },
    { g: 10, q: 'Rossiyada Oktabr to‘ntarishi qaysi yili bo‘lgan?', a: ['1917-yil', '1905-yil', '1922-yil', '1914-yil'] },
    { g: 10, q: 'Ikkinchi jahon urushi qachon boshlangan?', a: ['1939-yil', '1941-yil', '1914-yil', '1945-yil'] },
    { g: 10, q: 'Ikkinchi jahon urushi qachon tugagan?', a: ['1945-yil', '1944-yil', '1946-yil', '1943-yil'] },

    { g: 11, q: 'BMT qachon tashkil topgan?', a: ['1945-yil', '1948-yil', '1919-yil', '1991-yil'] },
    { g: 11, q: 'Berlin devori qachon qulagan?', a: ['1989-yil', '1991-yil', '1961-yil', '1985-yil'] },
    { g: 11, q: 'SSSR qachon tarqalib ketgan?', a: ['1991-yil', '1989-yil', '1993-yil', '1985-yil'] },
    { g: 11, q: 'Koinotga birinchi uchgan inson?', a: ['Yuriy Gagarin', 'Nil Armstrong', 'German Titov', 'Valentina Tereshkova'] },
  ],

  uzhist: [
    { g: 6, q: 'Zardushtiylikning muqaddas kitobi?', a: ['Avesto', 'Qur’on', 'Vedalar', 'Tavrot'] },
    { g: 6, q: 'Aleksandr Makedonskiyga qarshi kurashgan so‘g‘d sarkardasi?', a: ['Spitamen', 'Shiroq', 'Muqanna', 'Temur Malik'] },
    { g: 6, q: 'Fors shohi Kir II ni yenggan massaget malikasi?', a: ['To‘maris', 'Zarina', 'Bibixonim', 'Nodirabegim'] },
    { g: 6, q: 'Kushon podsholigining eng mashhur hukmdori?', a: ['Kanishka', 'Kir II', 'Doro I', 'Spitamen'] },

    { g: 7, q: 'Arab xalifaligiga qarshi “Oq kiyimlilar” qo‘zg‘oloni rahbari?', a: ['Muqanna', 'Spitamen', 'Shiroq', 'Temur Malik'] },
    { g: 7, q: 'Somoniylar davlatining poytaxti?', a: ['Buxoro', 'Samarqand', 'Urganch', 'Marv'] },
    { g: 7, q: '“Al-jabr val-muqobala” asari muallifi?', a: ['Muhammad al-Xorazmiy', 'Abu Rayhon Beruniy', 'Ibn Sino', 'Ahmad al-Farg‘oniy'] },
    { g: 7, q: '“Tib qonunlari” asari muallifi?', a: ['Abu Ali ibn Sino', 'Abu Rayhon Beruniy', 'Muhammad al-Xorazmiy', 'Mahmud Koshg‘ariy'] },

    { g: 8, q: 'Xo‘jandni mo‘g‘ullardan qahramonona himoya qilgan sarkarda?', a: ['Temur Malik', 'Najmiddin Kubro', 'Muqanna', 'Spitamen'] },
    { g: 8, q: 'Amir Temur qaysi yili tug‘ilgan?', a: ['1336-yil', '1370-yil', '1405-yil', '1220-yil'] },
    { g: 8, q: 'Samarqanddagi mashhur rasadxona asoschisi?', a: ['Mirzo Ulug‘bek', 'Amir Temur', 'Zahiriddin Bobur', 'Husayn Boyqaro'] },
    { g: 8, q: '“Boburnoma” asari muallifi?', a: ['Zahiriddin Muhammad Bobur', 'Alisher Navoiy', 'Mirzo Ulug‘bek', 'Sharafiddin Ali Yazdiy'] },

    { g: 9, q: 'Buxoro amirligida hukmronlik qilgan sulola?', a: ['Mang‘itlar', 'Shayboniylar', 'Minglar', 'Qo‘ng‘irotlar'] },
    { g: 9, q: 'Xiva xonligida XIX asrda hukmronlik qilgan sulola?', a: ['Qo‘ng‘irotlar', 'Mang‘itlar', 'Minglar', 'Temuriylar'] },
    { g: 9, q: 'Qo‘qon xonligida hukmronlik qilgan sulola?', a: ['Minglar', 'Mang‘itlar', 'Qo‘ng‘irotlar', 'Ashtarxoniylar'] },
    { g: 9, q: 'Toshkent Rossiya imperiyasi tomonidan qachon bosib olingan?', a: ['1865-yil', '1868-yil', '1873-yil', '1876-yil'] },

    { g: 10, q: '“Padarkush” dramasi muallifi, jadidlar yetakchisi?', a: ['Mahmudxo‘ja Behbudiy', 'Abdulla Qodiriy', 'Cho‘lpon', 'Abdurauf Fitrat'] },
    { g: 10, q: '“O‘tkan kunlar” romani muallifi?', a: ['Abdulla Qodiriy', 'Cho‘lpon', 'Abdulla Avloniy', 'Hamza'] },
    { g: 10, q: 'Turkiston muxtoriyati qachon e’lon qilingan?', a: ['1917-yil', '1918-yil', '1924-yil', '1916-yil'] },
    { g: 10, q: 'O‘zbekiston SSR qachon tuzilgan?', a: ['1924-yil', '1917-yil', '1929-yil', '1936-yil'] },

    { g: 11, q: 'O‘zbekistonda Mustaqillik kuni qachon nishonlanadi?', a: ['1-sentabr', '8-dekabr', '9-may', '21-mart'] },
    { g: 11, q: 'Mustaqil O‘zbekistonning Konstitutsiyasi qabul qilingan sana?', a: ['1992-yil 8-dekabr', '1991-yil 31-avgust', '1993-yil 2-sentabr', '1994-yil 1-iyul'] },
    { g: 11, q: 'O‘zbekiston BMTga qachon a’zo bo‘lgan?', a: ['1992-yil', '1991-yil', '1995-yil', '1993-yil'] },
    { g: 11, q: 'Milliy valyuta — so‘m muomalaga kiritilgan yil?', a: ['1994-yil', '1991-yil', '1997-yil', '2000-yil'] },
  ],

  bio: [
    { g: 5, q: 'Tirik organizmlarning eng kichik tuzilish birligi?', a: ['Hujayra', 'To‘qima', 'Organ', 'Atom'] },
    { g: 5, q: 'Hujayrani ko‘rish uchun qaysi asbob ishlatiladi?', a: ['Mikroskop', 'Teleskop', 'Barometr', 'Termometr'] },
    { g: 5, q: 'Bargga yashil rang beruvchi modda?', a: ['Xlorofill', 'Gemoglobin', 'Kraxmal', 'Melanin'] },
    { g: 5, q: 'Qo‘ziqorinlar qaysi dunyoga kiradi?', a: ['Zamburug‘lar', 'O‘simliklar', 'Hayvonlar', 'Bakteriyalar'] },

    { g: 6, q: 'Fotosintezda o‘simlik qaysi gazni yutadi?', a: ['Karbonat angidrid', 'Kislorod', 'Azot', 'Vodorod'] },
    { g: 6, q: 'O‘simlikni tuproqqa mahkamlaydigan organ?', a: ['Ildiz', 'Poya', 'Barg', 'Gul'] },
    { g: 6, q: 'Urug‘i meva ichida yetiladigan o‘simliklar?', a: ['Yopiq urug‘lilar', 'Ochiq urug‘lilar', 'Qirqquloqlar', 'Yo‘sinlar'] },
    { g: 6, q: 'Bug‘doy qaysi oilaga mansub?', a: ['Bug‘doydoshlar', 'Ra’nodoshlar', 'Karamdoshlar', 'Ituzumdoshlar'] },

    { g: 7, q: 'Qaysi hayvon sutemizuvchi?', a: ['Kit', 'Akula', 'Timsoh', 'Pingvin'] },
    { g: 7, q: 'Hasharotlarning nechta oyog‘i bor?', a: ['6', '8', '4', '10'] },
    { g: 7, q: 'O‘rgimchakning nechta oyog‘i bor?', a: ['8', '6', '10', '4'] },
    { g: 7, q: 'Baqa qaysi sinfga mansub?', a: ['Suvda va quruqlikda yashovchilar', 'Sudralib yuruvchilar', 'Baliqlar', 'Qushlar'] },

    { g: 8, q: 'Katta yoshli odam skeletida nechta suyak bor?', a: ['206', '306', '106', '180'] },
    { g: 8, q: 'Qonda kislorod tashuvchi hujayralar?', a: ['Eritrotsitlar', 'Leykotsitlar', 'Trombotsitlar', 'Limfotsitlar'] },
    { g: 8, q: 'Qon ivishida qatnashadigan qon plastinkalari?', a: ['Trombotsitlar', 'Eritrotsitlar', 'Leykotsitlar', 'Limfotsitlar'] },
    { g: 8, q: 'Odam organizmidagi eng yirik bez?', a: ['Jigar', 'Oshqozon osti bezi', 'Qalqonsimon bez', 'So‘lak bezi'] },

    { g: 9, q: 'Hujayraning “energiya stansiyasi”?', a: ['Mitoxondriya', 'Ribosoma', 'Yadro', 'Lizosoma'] },
    { g: 9, q: 'Hujayrada oqsil sintezi qayerda boradi?', a: ['Ribosomada', 'Lizosomada', 'Vakuolada', 'Hujayra qobig‘ida'] },
    { g: 9, q: 'Odamning somatik hujayrasida nechta xromosoma bor?', a: ['46', '23', '44', '48'] },
    { g: 9, q: 'DNK tarkibiga kirmaydigan azotli asos?', a: ['Uratsil', 'Adenin', 'Guanin', 'Timin'] },

    { g: 10, q: 'Irsiyat qonunlarini kashf etgan olim?', a: ['Gregor Mendel', 'Charlz Darvin', 'Lui Paster', 'Robert Guk'] },
    { g: 10, q: '“Hujayra” terminini fanga kiritgan olim?', a: ['Robert Guk', 'Gregor Mendel', 'Lui Paster', 'Karl Linney'] },
    { g: 10, q: 'Mitoz natijasida bitta hujayradan nechta hujayra hosil bo‘ladi?', a: ['2', '4', '1', '8'] },
    { g: 10, q: 'Meyoz natijasida bitta hujayradan nechta hujayra hosil bo‘ladi?', a: ['4', '2', '1', '8'] },

    { g: 11, q: '“Turlarning kelib chiqishi” asari muallifi?', a: ['Charlz Darvin', 'Jan Batist Lamark', 'Gregor Mendel', 'Karl Linney'] },
    { g: 11, q: 'Ekotizimda organik modda hosil qiluvchilar?', a: ['Produtsentlar', 'Konsumentlar', 'Redutsentlar', 'Parazitlar'] },
    { g: 11, q: 'Organik qoldiqlarni parchalovchi organizmlar?', a: ['Redutsentlar', 'Produtsentlar', 'Konsumentlar', 'Simbiontlar'] },
    { g: 11, q: 'Biosfera haqidagi ta’limot asoschisi?', a: ['V. I. Vernadskiy', 'Charlz Darvin', 'Gregor Mendel', 'I. P. Pavlov'] },
  ],
}
