// ---------- جعبه لایتنر بر پایه منحنی ابینگهانس ----------

/** فاصلهٔ مرور هر جعبه بر حسب روز: ۱ - ۳ - ۷ - ۲۱ - ۳۰ - ۹۰ */
export const INTERVALS = [1, 3, 7, 21, 30, 90];
export const BOX_COUNT = INTERVALS.length;

export const DAY_MS = 86_400_000;

export interface LeitnerCard {
  id: string;
  wordId: string;
  box: number; // 1..6
  addedAt: number;
  nextReview: number; // timestamp (start of day)
  reviews: number;
  lapses: number;
  lastResult: "ok" | "again" | null;
}

export interface Streak {
  count: number;
  lastDay: number; // start-of-day timestamp of last study
}

export const startOfDay = (t: number) => {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

export const todayStart = () => startOfDay(Date.now());

export const isDue = (c: LeitnerCard) => c.nextReview <= todayStart();

export const dueCards = (cards: LeitnerCard[]) =>
  cards
    .filter(isDue)
    .sort((a, b) => a.box - b.box || a.addedAt - b.addedAt);

export const makeCard = (wordId: string): LeitnerCard => ({
  id: `${wordId}-${Date.now()}`,
  wordId,
  box: 1,
  addedAt: Date.now(),
  nextReview: todayStart(), // همین امروز مرور شود
  reviews: 0,
  lapses: 0,
  lastResult: null,
});

/** پاسخ درست: رفتن به جعبه بعد و تعیین مرور بعدی طبق منحنی */
export function gradeOk(c: LeitnerCard): LeitnerCard {
  const nextBox = Math.min(c.box + 1, BOX_COUNT);
  return {
    ...c,
    box: nextBox,
    reviews: c.reviews + 1,
    lastResult: "ok",
    nextReview:
      c.box === BOX_COUNT
        ? todayStart() + INTERVALS[BOX_COUNT - 1] * DAY_MS
        : todayStart() + INTERVALS[nextBox - 1] * DAY_MS,
  };
}

/** پاسخ نادرست: بازگشت به جعبهٔ ۱ و مرور فردا */
export function gradeAgain(c: LeitnerCard): LeitnerCard {
  return {
    ...c,
    box: 1,
    reviews: c.reviews + 1,
    lapses: c.lapses + 1,
    lastResult: "again",
    nextReview: todayStart() + INTERVALS[0] * DAY_MS,
  };
}

export function nextStreak(s: Streak): Streak {
  const today = todayStart();
  if (s.lastDay === today) return s;
  if (s.lastDay === today - DAY_MS) return { count: s.count + 1, lastDay: today };
  return { count: 1, lastDay: today };
}

// ---------- قالب‌بندی ----------

export const faNum = (n: number) => n.toLocaleString("fa-IR");

export function faDate(ts: number): string {
  const today = todayStart();
  const day = startOfDay(ts);
  if (day <= today) return "امروز";
  if (day === today + DAY_MS) return "فردا";
  const diff = Math.round((day - today) / DAY_MS);
  if (diff <= 7) return `${faNum(diff)} روز دیگر`;
  return new Intl.DateTimeFormat("fa-IR", { day: "numeric", month: "long" }).format(
    new Date(ts),
  );
}

export function nextDueInfo(cards: LeitnerCard[]): string {
  const upcoming = cards.filter((c) => !isDue(c));
  if (upcoming.length === 0) return "";
  const min = Math.min(...upcoming.map((c) => c.nextReview));
  return faDate(min);
}

// ---------- ذخیره‌سازی ----------

const KEY = "vazhebox:v1";

export interface PersistShape {
  cards: LeitnerCard[];
  streak: Streak;
}

export function loadState(): PersistShape {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { cards: [], streak: { count: 0, lastDay: 0 } };
    const p = JSON.parse(raw) as PersistShape;
    if (!Array.isArray(p.cards)) return { cards: [], streak: { count: 0, lastDay: 0 } };
    return { cards: p.cards, streak: p.streak ?? { count: 0, lastDay: 0 } };
  } catch {
    return { cards: [], streak: { count: 0, lastDay: 0 } };
  }
}

export function saveState(state: PersistShape) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}
