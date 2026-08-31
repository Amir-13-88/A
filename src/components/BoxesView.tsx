import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { WordArt } from "../data/art";
import { ENTRY_MAP } from "../data/dictionary";
import {
  BOX_COUNT,
  faDate,
  faNum,
  INTERVALS,
  isDue,
  type LeitnerCard,
  type Streak,
} from "../lib/leitner";
import { useSpeech } from "../lib/useSpeech";
import EbbinghausCurve from "./EbbinghausCurve";
import { BookIcon, CalendarIcon, FlameIcon, PlayIcon, SparkIcon, TrashIcon } from "./Icons";

interface Props {
  cards: LeitnerCard[];
  streak: Streak;
  onRemove: (wordId: string) => void;
  onGoDict: () => void;
}

const BOX_COLORS = ["#ff6f59", "#ff8a75", "#ffc94d", "#ffd97a", "#8fe8cd", "#5fd6b4"];

export default function BoxesView({ cards, streak, onRemove, onGoDict }: Props) {
  const [filter, setFilter] = useState<"all" | "today" | "future">("all");
  const { speak, speaking } = useSpeech();

  const counts = useMemo(() => {
    const c = new Array(BOX_COUNT).fill(0);
    cards.forEach((x) => c[x.box - 1]++);
    return c;
  }, [cards]);

  const dueCount = cards.filter(isDue).length;
  const mastered = counts[BOX_COUNT - 1];

  const rows = useMemo(() => {
    return cards
      .filter((c) =>
        filter === "all" ? true : filter === "today" ? isDue(c) : !isDue(c),
      )
      .sort((a, b) => a.box - b.box || a.nextReview - b.nextReview);
  }, [cards, filter]);

  if (cards.length === 0) {
    return (
      <div className="space-y-8">
        <h1 className="font-display text-3xl text-ink-50 sm:text-4xl">جعبه‌های لایتنر</h1>
        <div className="rounded-[28px] border border-ink-700 bg-ink-850/80 p-12 text-center">
          <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-3xl bg-mint-400/15 text-mint-400">
            <SparkIcon size={38} />
          </div>
          <h2 className="font-display text-3xl text-ink-50">هنوز واژه‌ای نداری</h2>
          <p className="mt-2 text-ink-300">از دیکشنری تصویری چند واژه به جعبه اضافه کن.</p>
          <button
            onClick={onGoDict}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-saffron-400 px-7 py-3.5 font-bold text-ink-950 transition-all hover:-translate-y-0.5 hover:bg-saffron-300"
          >
            <BookIcon size={20} />
            رفتن به دیکشنری
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-ink-50 sm:text-4xl">جعبه‌های لایتنر</h1>
        <p className="mt-1 text-sm text-ink-300 sm:text-base">
          شش جعبه با فاصله‌های مرور ۱ تا ۹۰ روزه — هرچه جلوتر، ماندگارتر
        </p>
      </div>

      {/* آمار کلی */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="همهٔ واژه‌ها" value={faNum(cards.length)} color="#86aba3" />
        <Stat label="مرور امروز" value={faNum(dueCount)} color="#ffc94d" />
        <Stat label="تثبیت‌شده (جعبهٔ ۶)" value={faNum(mastered)} color="#5fd6b4" />
        <Stat
          label="روزهای پیاپی"
          value={faNum(streak.count)}
          color="#ff8a75"
          icon={<FlameIcon size={18} />}
        />
      </div>

      {/* منحنی با جایگاه واژه‌ها */}
      <div className="rounded-[28px] border border-ink-700 bg-ink-900/60 p-5">
        <p className="mb-2 text-sm font-bold text-ink-300">
          پراکندگی واژه‌ها روی منحنی ابینگهانس
        </p>
        <EbbinghausCurve counts={counts} className="w-full" />
      </div>

      {/* شش جعبه */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {INTERVALS.map((days, i) => {
          const n = counts[i];
          const pct = cards.length ? Math.round((n / cards.length) * 100) : 0;
          return (
            <motion.div
              key={days}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              whileHover={{ y: -4 }}
              className="rounded-[22px] border border-ink-700 bg-ink-850/90 p-4"
            >
              <div className="flex items-center justify-between">
                <span
                  className="grid h-9 w-9 place-items-center rounded-xl font-display text-xl text-ink-950"
                  style={{ background: BOX_COLORS[i] }}
                >
                  {faNum(i + 1)}
                </span>
                <span className="text-[11px] font-bold text-ink-300">هر {faNum(days)} روز</span>
              </div>
              <div className="mt-3 font-display text-3xl text-ink-50">{faNum(n)}</div>
              <div className="mt-0.5 text-[11px] text-ink-400">واژه</div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink-700">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: BOX_COLORS[i] }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.05 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* فهرست واژه‌ها */}
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl text-ink-50">واژه‌های تو</h2>
          <div className="flex gap-2">
            {(
              [
                ["all", "همه"],
                ["today", "به‌سررسید رسیده"],
                ["future", "مرور آینده"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={`rounded-full border px-4 py-2 text-xs font-bold transition-all ${
                  filter === id
                    ? "border-saffron-400 bg-saffron-400/15 text-saffron-300"
                    : "border-ink-600 bg-ink-850 text-ink-200 hover:border-ink-400"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {rows.length === 0 ? (
          <div className="rounded-[22px] border border-ink-700 bg-ink-850/70 p-10 text-center text-ink-300">
            <CalendarIcon size={30} className="mx-auto mb-3 text-ink-400" />
            در این بخش واژه‌ای نیست.
          </div>
        ) : (
          <div className="space-y-2.5">
            {rows.map((c, i) => {
              const e = ENTRY_MAP[c.wordId];
              if (!e) return null;
              const due = isDue(c);
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10px" }}
                  transition={{ duration: 0.3, delay: (i % 10) * 0.03 }}
                  className="flex items-center gap-3 rounded-[20px] border border-ink-700 bg-ink-850/90 p-3 transition-colors hover:border-ink-500 sm:gap-4"
                >
                  <div className="w-14 shrink-0 sm:w-16">
                    <WordArt id={e.id} className="w-full drop-shadow" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
                      <span className="font-en text-lg font-semibold text-ink-50" dir="ltr">
                        {e.word}
                      </span>
                      <span className="font-en text-xs text-ink-400" dir="ltr">
                        {e.ipa}
                      </span>
                    </div>
                    <div className="mt-0.5 truncate text-sm font-bold text-saffron-300">
                      {e.meaning}
                      <span className="mx-2 text-ink-500">•</span>
                      <span className="font-normal text-ink-300">مرور: {faDate(c.nextReview)}</span>
                    </div>
                  </div>
                  {due && (
                    <span className="hidden rounded-full bg-saffron-400/15 px-3 py-1.5 text-[11px] font-extrabold text-saffron-300 sm:inline-block">
                      امروز
                    </span>
                  )}
                  <span
                    className="rounded-full px-3 py-1.5 text-[11px] font-extrabold text-ink-950"
                    style={{ background: BOX_COLORS[c.box - 1] }}
                  >
                    جعبهٔ {faNum(c.box)}
                  </span>
                  <button
                    onClick={() => speak(e.word)}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink-700 text-ink-100 transition-all hover:bg-saffron-400 hover:text-ink-950 active:scale-90 ${
                      speaking ? "anim-speak" : ""
                    }`}
                    aria-label="تلفظ"
                  >
                    <PlayIcon size={16} />
                  </button>
                  <button
                    onClick={() => onRemove(c.wordId)}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink-700 text-ink-300 transition-all hover:bg-coral-500/20 hover:text-coral-300 active:scale-90"
                    aria-label="حذف از جعبه"
                  >
                    <TrashIcon size={16} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string;
  color: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-[22px] border border-ink-700 bg-ink-850/90 p-4">
      <div className="flex items-center gap-1.5 text-xs font-bold text-ink-300">
        <span style={{ color }}>{icon}</span>
        {label}
      </div>
      <div className="mt-2 font-display text-3xl" style={{ color }}>
        {value}
      </div>
    </div>
  );
}
