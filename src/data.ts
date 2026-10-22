import type { LucideIcon } from 'lucide-react'
import { Calculator, Sigma, Triangle, BookOpen, Languages, Globe2, Landmark, Castle, Leaf, Brain } from 'lucide-react'

export type Subject = { id: string; name: string; grades: string; topics: number; icon: LucideIcon; from: string; to: string }

export const SUBJECTS: Subject[] = [
  { id: 'math', name: 'Matematika', grades: '1–6-sinf', topics: 180, icon: Calculator, from: '#3b82f6', to: '#22d3ee' },
  { id: 'algebra', name: 'Algebra', grades: '7–11-sinf', topics: 140, icon: Sigma, from: '#8b5cf6', to: '#3b82f6' },
  { id: 'geometry', name: 'Geometriya', grades: '7–11-sinf', topics: 120, icon: Triangle, from: '#06b6d4', to: '#10b981' },
  { id: 'ona', name: 'Ona tili', grades: '1–11-sinf', topics: 210, icon: BookOpen, from: '#f43f5e', to: '#f97316' },
  { id: 'eng', name: 'Ingliz tili', grades: '1–11-sinf', topics: 200, icon: Languages, from: '#ec4899', to: '#8b5cf6' },
  { id: 'geo', name: 'Geografiya', grades: '5–11-sinf', topics: 150, icon: Globe2, from: '#10b981', to: '#84cc16' },
  { id: 'world', name: 'Jahon tarixi', grades: '6–11-sinf', topics: 130, icon: Landmark, from: '#f59e0b', to: '#ef4444' },
  { id: 'uzhist', name: 'O‘zbekiston tarixi', grades: '6–11-sinf', topics: 130, icon: Castle, from: '#0ea5e9', to: '#22c55e' },
  { id: 'bio', name: 'Biologiya', grades: '5–11-sinf', topics: 160, icon: Leaf, from: '#22c55e', to: '#14b8a6' },
  { id: 'mental', name: 'Mental arifmetika', grades: '1–6-sinf', topics: 60, icon: Brain, from: '#eab308', to: '#f97316' },
]

/** Demo bank for the race. First answer is always the correct one; options are shuffled per player at runtime. */
export type Q = { subject: string; q: string; a: [string, string, string, string] }
export const RACE_BANK: Q[] = [
  { subject: 'Algebra', q: '3x + 5 = 20 bo‘lsa, x = ?', a: ['5', '4', '6', '15'] },
  { subject: 'Algebra', q: '2⁵ = ?', a: ['32', '10', '25', '16'] },
  { subject: 'Algebra', q: '(−3) · (−4) = ?', a: ['12', '−12', '7', '−7'] },
  { subject: 'Geometriya', q: 'Uchburchak ichki burchaklari yig‘indisi?', a: ['180°', '90°', '360°', '270°'] },
  { subject: 'Geometriya', q: 'Kvadrat tomoni 6 sm. Uning yuzi?', a: ['36 sm²', '24 sm²', '12 sm²', '30 sm²'] },
  { subject: 'Algebra', q: '√81 = ?', a: ['9', '8', '18', '7'] },
  { subject: 'Matematika', q: '80 ning 25% i nechaga teng?', a: ['20', '25', '16', '40'] },
  { subject: 'Algebra', q: 'x² = 49 va x > 0 bo‘lsa, x = ?', a: ['7', '−7', '49', '24,5'] },
  { subject: 'Geografiya', q: 'Fransiyaning poytaxti qaysi shahar?', a: ['Parij', 'Lion', 'Marsel', 'Nitstsa'] },
  { subject: 'Geografiya', q: 'Yer sharidagi eng katta okean?', a: ['Tinch okeani', 'Atlantika okeani', 'Hind okeani', 'Shimoliy Muz okeani'] },
  { subject: 'Ingliz tili', q: 'I ___ a student.', a: ['am', 'is', 'are', 'be'] },
  { subject: 'Ingliz tili', q: '“go” fe’lining o‘tgan zamon shakli?', a: ['went', 'goed', 'gone', 'going'] },
  { subject: 'Ingliz tili', q: '“big” so‘zining antonimi?', a: ['small', 'tall', 'long', 'high'] },
  { subject: 'O‘zbekiston tarixi', q: 'Amir Temur davlatining poytaxti?', a: ['Samarqand', 'Buxoro', 'Xiva', 'Toshkent'] },
  { subject: 'O‘zbekiston tarixi', q: 'Mirzo Ulug‘bek qaysi fan bilan mashhur?', a: ['Astronomiya', 'Tibbiyot', 'Kimyo', 'Musiqa'] },
  { subject: 'Matematika', q: '0,5 + 0,25 = ?', a: ['0,75', '0,30', '0,7', '0,525'] },
  { subject: 'Geometriya', q: 'To‘g‘ri to‘rtburchak 8 sm × 5 sm. Perimetri?', a: ['26 sm', '40 sm', '13 sm', '21 sm'] },
  { subject: 'Biologiya', q: 'Inson yuragi nechta kameradan iborat?', a: ['4', '2', '3', '6'] },
  { subject: 'Matematika', q: '12 : 0,5 = ?', a: ['24', '6', '12', '60'] },
  { subject: 'Biologiya', q: 'Fotosintez o‘simlikning qaysi qismida ko‘proq boradi?', a: ['Bargda', 'Ildizda', 'Gulda', 'Urug‘da'] },
  { subject: 'Jahon tarixi', q: 'Misr piramidalari qaysi qit’ada joylashgan?', a: ['Afrika', 'Osiyo', 'Yevropa', 'Avstraliya'] },
  { subject: 'Ona tili', q: '“Kitob” so‘zi qaysi so‘z turkumiga kiradi?', a: ['Ot', 'Fe’l', 'Sifat', 'Ravish'] },
]

export type Student = { name: string; cls: string; xp: number; elo: number; league: 'Olmos' | 'Oltin' | 'Kumush' | 'Bronza'; delta: number; me?: boolean }

export const CLASS_8B: Student[] = [
  { name: 'Madina R.', cls: '8-B', xp: 4820, elo: 1684, league: 'Olmos', delta: 2 },
  { name: 'Sardor T.', cls: '8-B', xp: 4510, elo: 1652, league: 'Olmos', delta: -1 },
  { name: 'Zarina A.', cls: '8-B', xp: 4190, elo: 1610, league: 'Oltin', delta: 1 },
  { name: 'Ali V.', cls: '8-B', xp: 3960, elo: 1588, league: 'Oltin', delta: 3, me: true },
  { name: 'Jasur M.', cls: '8-B', xp: 3720, elo: 1561, league: 'Oltin', delta: 0 },
  { name: 'Shahzoda K.', cls: '8-B', xp: 3405, elo: 1530, league: 'Kumush', delta: -2 },
  { name: 'Bekzod N.', cls: '8-B', xp: 3110, elo: 1497, league: 'Kumush', delta: 1 },
  { name: 'Nilufar S.', cls: '8-B', xp: 2880, elo: 1470, league: 'Kumush', delta: 0 },
  { name: 'Otabek Y.', cls: '8-B', xp: 2540, elo: 1431, league: 'Bronza', delta: 4 },
  { name: 'Dilnoza X.', cls: '8-B', xp: 2210, elo: 1402, league: 'Bronza', delta: -1 },
]

export const PARALLEL_8: Student[] = [
  { name: 'Kamola E.', cls: '8-A', xp: 5120, elo: 1712, league: 'Olmos', delta: 1 },
  { name: 'Madina R.', cls: '8-B', xp: 4820, elo: 1684, league: 'Olmos', delta: 0 },
  { name: 'Sardor T.', cls: '8-B', xp: 4510, elo: 1652, league: 'Olmos', delta: -1 },
  { name: 'Islom Q.', cls: '8-V', xp: 4470, elo: 1640, league: 'Olmos', delta: 2 },
  { name: 'Zarina A.', cls: '8-B', xp: 4190, elo: 1610, league: 'Oltin', delta: 1 },
  { name: 'Sevara B.', cls: '8-G', xp: 4080, elo: 1602, league: 'Oltin', delta: -2 },
  { name: 'Ali V.', cls: '8-B', xp: 3960, elo: 1588, league: 'Oltin', delta: 3, me: true },
  { name: 'Davron H.', cls: '8-A', xp: 3890, elo: 1579, league: 'Oltin', delta: 0 },
  { name: 'Jasur M.', cls: '8-B', xp: 3720, elo: 1561, league: 'Oltin', delta: -1 },
  { name: 'Mohira L.', cls: '8-D', xp: 3700, elo: 1555, league: 'Oltin', delta: 1 },
]

export const SCHOOL_TOP: Student[] = [
  { name: 'Kamola E.', cls: '8-A', xp: 5120, elo: 1712, league: 'Olmos', delta: 1 },
  { name: 'Asadbek F.', cls: '10-B', xp: 5050, elo: 1705, league: 'Olmos', delta: 0 },
  { name: 'Mubina O.', cls: '6-A', xp: 4990, elo: 1690, league: 'Olmos', delta: 3 },
  { name: 'Madina R.', cls: '8-B', xp: 4820, elo: 1684, league: 'Olmos', delta: -1 },
  { name: 'Temur S.', cls: '11-A', xp: 4760, elo: 1677, league: 'Olmos', delta: 1 },
  { name: 'Sardor T.', cls: '8-B', xp: 4510, elo: 1652, league: 'Olmos', delta: -2 },
  { name: 'Lola J.', cls: '9-V', xp: 4400, elo: 1633, league: 'Oltin', delta: 2 },
  { name: 'Ali V.', cls: '8-B', xp: 3960, elo: 1588, league: 'Oltin', delta: 5, me: true },
]

export const CLASS_COMPARE = [
  { cls: '8-A', avg: 82, part: 93 },
  { cls: '8-B', avg: 79, part: 96 },
  { cls: '8-V', avg: 74, part: 81 },
  { cls: '8-G', avg: 71, part: 88 },
  { cls: '8-D', avg: 66, part: 72 },
]

export const PATH_CHAPTERS = [
  { city: 'Toshkent', title: '1-bob: Chiziqli tengsizliklar', stars: 3, state: 'done' as const },
  { city: 'Samarqand', title: '2-bob: Kvadrat ildiz', stars: 3, state: 'done' as const },
  { city: 'Buxoro', title: '3-bob: Kvadrat tenglamalar', stars: 2, state: 'done' as const },
  { city: 'Xiva', title: '4-bob: Viyet teoremasi', stars: 0, state: 'current' as const },
  { city: 'Termiz', title: '5-bob: Kvadrat uchhad', stars: 0, state: 'locked' as const },
  { city: 'Namangan', title: '6-bob: Kvadrat tengsizliklar', stars: 0, state: 'locked' as const },
  { city: 'Andijon', title: 'Boss poygasi: 1-yarim yil', stars: 0, state: 'boss' as const },
]
