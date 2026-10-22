export type Lang = 'uz' | 'ru' | 'en' | 'zh'

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: 'uz', label: 'O‘zbekcha', short: 'UZ' },
  { code: 'ru', label: 'Русский', short: 'RU' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'zh', label: '中文', short: '中文' },
]

type Dict = Record<string, string>

export const T: Record<Lang, Dict> = {
  uz: {
    home: 'Bosh sahifa', games: 'O‘yinlar', path: 'Sarguzasht yo‘li', rating: 'Reyting', geo: 'Geografiya ekspressi', teachers: 'Ustozlar uchun',
    login: 'Kirish', classCode: 'Sinf kodi bilan kirish',
    heroBadge: 'O‘zbekiston maktab darsliklari asosida · 1–11-sinf',
    heroA: 'O‘yna.', heroB: 'O‘rgan.', heroC: 'G‘alaba qil!',
    heroSub: 'Bolalar sevadigan o‘yinlar orqali bilim: har bir to‘g‘ri javob mashinangizni marraga yaqinlashtiradi. Sinf, maktab va tuman reytingida birinchi bo‘ling!',
    play: 'O‘ynashni boshlash', openClass: 'Ustoz sifatida sinf ochish',
    s1: 'sinf', s2: 'fan', s3: 'til', s4: 'reyting darajasi',
  },
  ru: {
    home: 'Главная', games: 'Игры', path: 'Путь приключений', rating: 'Рейтинг', geo: 'Гео-экспресс', teachers: 'Учителям',
    login: 'Войти', classCode: 'Войти по коду класса',
    heroBadge: 'По школьным учебникам Узбекистана · 1–11 классы',
    heroA: 'Играй.', heroB: 'Учись.', heroC: 'Побеждай!',
    heroSub: 'Знания через игры, которые любят дети: каждый верный ответ приближает твою машину к финишу. Стань первым в рейтинге класса, школы и района!',
    play: 'Начать игру', openClass: 'Открыть класс (учитель)',
    s1: 'классы', s2: 'предметов', s3: 'языка', s4: 'уровней рейтинга',
  },
  en: {
    home: 'Home', games: 'Games', path: 'Quest path', rating: 'Leaderboard', geo: 'Geo Express', teachers: 'For teachers',
    login: 'Log in', classCode: 'Join with class code',
    heroBadge: 'Built on Uzbekistan’s school textbooks · Grades 1–11',
    heroA: 'Play.', heroB: 'Learn.', heroC: 'Win!',
    heroSub: 'Learning through the games kids love: every correct answer pushes your car closer to the finish line. Top your class, school and district leaderboards!',
    play: 'Start playing', openClass: 'Open a class as a teacher',
    s1: 'grades', s2: 'subjects', s3: 'languages', s4: 'leaderboard levels',
  },
  zh: {
    home: '首页', games: '游戏', path: '冒险之路', rating: '排行榜', geo: '地理快车', teachers: '教师专区',
    login: '登录', classCode: '用班级码加入',
    heroBadge: '基于乌兹别克斯坦中小学教材 · 1–11年级',
    heroA: '玩。', heroB: '学。', heroC: '赢！',
    heroSub: '用孩子们喜爱的游戏学习知识：每答对一题，你的赛车就离终点更近一步。在班级、学校和区排行榜中争第一！',
    play: '开始游戏', openClass: '教师创建班级',
    s1: '年级', s2: '学科', s3: '种语言', s4: '级排行榜',
  },
}
