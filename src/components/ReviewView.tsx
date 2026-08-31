import { useEffect, useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { WordArt } from "../data/art";
import { CAT_LABEL, ENTRY_MAP } from "../data/dictionary";
import {
  BOX_COUNT,
  dueCards,
  faNum,
  faDate,
  INTERVALS,
  type LeitnerCard,
  nextDueInfo,
} from "../lib/leitner";
import { useSpeech } from "../lib/useSpeech";
import EbbinghausCurve from "./EbbinghausCurve";
import {
  ArrowIcon,
  BookIcon,
  BoxIcon,
  CheckIcon,
  EyeIcon,
  PlayIcon,
  RepeatIcon,
  SparkIcon,
} from "./Icons";

interface Props {
  cards: LeitnerCard[];
  onGrade: (id: string, ok: boolean) => void;
  onSeed: () => void;
  onGoDict: () => void;
  onGoBoxes: () => void;
}

interface Move {
  word: string;
  from: number;
  to: number;
}

export default function ReviewView({ cards, onGrade, onSeed, onGoDict, onGoBoxes }: Props) {
  const [queue, setQueue] = useState<LeitnerCard[]>(() => dueCards(cards));
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [leaving, setLeaving] = useState<"" | "ok" | "again">("");
  const [done, setDone] = useState(false);
  const [stats, setStats] = useState({ ok: 0, again: 0 });
  const [moves, setMoves] = useState<Move[]>([]);
  const { speak, speaking } = useSpeech();

  const card = queue[idx];
  const entry = card ? ENTRY_MAP[card.wordId] : undefined;

  const boxCounts = useMemo(() => {
    const c = new Array(BOX_COUNT).fill(0);
    cards.forEach((x) => c[x.box - 1]++);
    return c;
  }, [cards]);

  const start = () => {
    setQueue(dueCards(cards));
    setIdx(0);
    setRevealed(false);
    setLeaving("");
    setDone(false);
    setStats({ ok: 0, again: 0 });
    setMoves([]);
  };

  // اگر در آغاز جلسه واژهٔ جدیدی به جعبه اضافه شد (مثلاً از دیکشنری)، صف را به‌روز کن
  useEffect(() => {
    if (!done && idx === 0 && !revealed && !leaving) {
      setQueue(dueCards(cards));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  const grade = (ok: boolean) => {
    if (!card || leaving) return;
    const to = ok ? Math.min(card.box + 1, BOX_COUNT) : 1;
    setMoves((m) => [...m, { word: entry?.word ?? card.wordId, from: card.box, to }]);
    setStats((s) => (ok ? { ...s, ok: s.ok + 1 } : { ...s, again: s.again + 1 }));
    setLeaving(ok ? "ok" : "again");
    window.setTimeout(() => {
      onGrade(card.id, ok);
      setLeaving("");
      setRevealed(false);
      if (idx + 1 >= queue.length) {
        setDone(true);
      } else {
        setIdx(idx + 1);
      }
    }, 300);
  };

  // کلیدهای میان‌بر: Space = نمایش پاسخ، ۱ = نمی‌دونستم، ۲ = می‌دونستم
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (done || !card) return;
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        if (!revealed && !leaving) setRevealed(true);
      } else if (e.code === "Digit1" || e.code === "Numpad1") {
        if (revealed) grade(false);
      } else if (e.code === "Digit2" || e.code === "Numpad2") {
        if (revealed) grade(true);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  useEffect(() => {
    if (done && stats.ok > 0) {
      confetti({
        particleCount: 140,
        spread: 78,
        origin: { y: 0.62 },
        colors: ["#ffc94d", "#5fd6b4", "#ff6f59", "#f7f1e3"],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  // ---------- حالت: جعبه خالی ----------
  if (cards.length === 0) {
    return (
      <div className="space-y-8">
        <Header title="مرور امروز" sub="واژه‌ها را طبق منحنی ابینگهانس به حافظهٔ بلندمدت بسپار" />
        <div className="rounded-[28px] border border-ink-700 bg-ink-850/80 p-8 sm:p-12 text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-3xl bg-saffron-400/15 text-saffron-400"
          >
            <BookIcon size={40} />
          </motion.div>
          <h2 className="font-display text-3xl sm:text-4xl text-ink-50">جعبه‌ات خالی است!</h2>
          <p className="mx-auto mt-3 max-w-md leading-8 text-ink-300">
            از دیکشنری تصویری، واژه‌ها را انتخاب کن تا با برنامهٔ مرور
            <span className="mx-1 font-bold text-saffron-300">۱، ۳، ۷، ۲۱، ۳۰ و ۹۰ روزه</span>
            وارد جعبهٔ لایتنر شوند.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onGoDict}
              className="group flex items-center gap-2 rounded-full bg-saffron-400 px-7 py-3.5 font-bold text-ink-950 shadow-lg shadow-saffron-500/20 transition-all hover:-translate-y-0.5 hover:bg-saffron-300 active:translate-y-0"
            >
              <BookIcon size={20} />
              رفتن به دیکشنری
              <ArrowIcon size={18} className="transition-transform group-hover:-translate-x-1" />
            </button>
            <button
              onClick={onSeed}
              className="flex items-center gap-2 rounded-full border border-ink-600 px-7 py-3.5 font-bold text-ink-100 transition-all hover:border-mint-400 hover:text-mint-300"
            >
              <SparkIcon size={20} />
              شروع با ۸ واژهٔ پیشنهادی
            </button>
          </div>
        </div>
        <div className="rounded-[28px] border border-ink-700 bg-ink-900/60 p-5">
          <p className="mb-2 text-sm font-bold text-ink-300">
            منحنی فراموشی ابینگهانس — هر مرور، انحنای فراموشی را شکست می‌دهد
          </p>
          <EbbinghausCurve className="w-full" />
        </div>
      </div>
    );
  }

  // ---------- حالت: مروری باقی نمانده ----------
  if (queue.length === 0 || done) {
    if (done) {
      return (
        <div className="space-y-8">
          <Header title="مرور امروز" sub="جلسهٔ مرور به پایان رسید" />
          <motion.div
            initial={{ y: 26, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="rounded-[28px] border border-mint-500/40 bg-ink-850/80 p-8 sm:p-10 text-center"
          >
            <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-mint-400/15 text-mint-400">
              <CheckIcon size={42} />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-ink-50">
              آفرین! مرور امروز کامل شد
            </h2>
            <div className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-3">
              <div className="rounded-2xl bg-mint-400/10 p-4">
                <div className="font-display text-4xl text-mint-300">{faNum(stats.ok)}</div>
                <div className="mt-1 text-sm text-ink-300">یادم بود</div>
              </div>
              <div className="rounded-2xl bg-coral-500/10 p-4">
                <div className="font-display text-4xl text-coral-300">{faNum(stats.again)}</div>
                <div className="mt-1 text-sm text-ink-300">تکرار دوباره</div>
              </div>
            </div>
            {moves.length > 0 && (
              <div className="mx-auto mt-6 max-w-md space-y-2">
                {moves.slice(-5).map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-ink-700 bg-ink-900/70 px-4 py-2.5 text-sm"
                  >
                    <span className="font-en font-semibold text-ink-100" dir="ltr">
                      {m.word}
                    </span>
                    <span
                      className={m.to > m.from ? "text-mint-300" : "text-coral-300"}
                    >
                      {m.to > m.from
                        ? `به جعبهٔ ${faNum(m.to)} رفت ↑`
                        : `به جعبهٔ ۱ برگشت ↓`}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={start}
                className="flex items-center gap-2 rounded-full border border-ink-600 px-6 py-3 font-bold text-ink-100 transition-colors hover:border-saffron-400 hover:text-saffron-300"
              >
                <RepeatIcon size={19} />
                مرور دوباره
              </button>
              <button
                onClick={onGoDict}
                className="flex items-center gap-2 rounded-full bg-saffron-400 px-6 py-3 font-bold text-ink-950 transition-all hover:-translate-y-0.5 hover:bg-saffron-300"
              >
                <BookIcon size={19} />
                افزودن واژهٔ جدید
              </button>
            </div>
          </motion.div>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <Header title="مرور امروز" sub="همهٔ مرورهای امروز انجام شده" />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="rounded-[28px] border border-ink-700 bg-ink-850/80 p-8 sm:p-10 text-center"
        >
          <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-mint-400/15 text-mint-400">
            <SparkIcon size={38} />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-ink-50">
            کارت به‌سررسید رسیده‌ای نداری!
          </h2>
          <p className="mt-3 leading-8 text-ink-300">
            مرور بعدی: <span className="font-bold text-saffron-300">{nextDueInfo(cards) || "—"}</span>
            <span className="mx-2 text-ink-500">•</span>
            مغزت در حال تثبیت واژه‌هاست 🌱
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onGoDict}
              className="flex items-center gap-2 rounded-full bg-saffron-400 px-6 py-3 font-bold text-ink-950 transition-all hover:-translate-y-0.5 hover:bg-saffron-300"
            >
              <BookIcon size={19} />
              افزودن واژهٔ جدید
            </button>
            <button
              onClick={onGoBoxes}
              className="flex items-center gap-2 rounded-full border border-ink-600 px-6 py-3 font-bold text-ink-100 transition-colors hover:border-mint-400 hover:text-mint-300"
            >
              <BoxIcon size={19} />
              دیدن جعبه‌ها
            </button>
          </div>
        </motion.div>
        <div className="rounded-[28px] border border-ink-700 bg-ink-900/60 p-5">
          <p className="mb-2 text-sm font-bold text-ink-300">جایگاه واژه‌هایت روی منحنی</p>
          <EbbinghausCurve counts={boxCounts} className="w-full" />
        </div>
      </div>
    );
  }

  // ---------- حالت: جلسهٔ مرور ----------
  const progress = Math.round((idx / queue.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Header title="مرور امروز" sub="معنی را به خاطر بیاور، سپس پاسخ را ببین" />
        <div className="flex items-center gap-2 text-sm">
          <span className="rounded-full bg-mint-400/10 px-3 py-1.5 font-bold text-mint-300">
            ✓ {faNum(stats.ok)}
          </span>
          <span className="rounded-full bg-coral-500/10 px-3 py-1.5 font-bold text-coral-300">
            ↺ {faNum(stats.again)}
          </span>
        </div>
      </div>

      {/* نوار پیشرفت */}
      <div>
        <div className="mb-2 flex items-center justify-between text-xs font-bold text-ink-300">
          <span>
            واژهٔ {faNum(idx + 1)} از {faNum(queue.length)}
          </span>
          <span>{faNum(progress)}٪</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-ink-800">
          <motion.div
            className="h-full rounded-full bg-gradient-to-l from-saffron-500 to-mint-400"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* کارت چرخان */}
      {entry && (
        <motion.div
          key={card.id}
          animate={
            leaving === "ok"
              ? { x: -380, opacity: 0, rotate: -7 }
              : leaving === "again"
                ? { x: 380, opacity: 0, rotate: 7 }
                : { x: 0, opacity: 1, rotate: 0 }
          }
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="perspective-1400"
        >
          <div
            onClick={() => !revealed && !leaving && setRevealed(true)}
            className={`preserve-3d relative h-[420px] w-full transition-transform duration-500 sm:h-[400px] ${
              revealed ? "flip-y" : "cursor-pointer"
            }`}
          >
            {/* روی کارت */}
            <div className="backface-hide absolute inset-0 flex flex-col overflow-hidden rounded-[28px] border border-paper-dim bg-paper text-ink-900 shadow-2xl shadow-black/40">
              <div className="dotted-bg absolute inset-0 opacity-60" />
              <div className="relative flex items-center justify-between p-5">
                <span className="rounded-full bg-ink-900/10 px-3.5 py-1.5 text-xs font-bold text-ink-600">
                  {CAT_LABEL[entry.cat]}
                </span>
                <span className="rounded-full bg-saffron-400/25 px-3.5 py-1.5 text-xs font-extrabold text-ink-800">
                  جعبهٔ {faNum(card.box)}
                </span>
              </div>
              <div className="relative flex flex-1 flex-col items-center justify-center gap-3 px-6">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(entry.word);
                  }}
                  className={`mb-1 grid h-12 w-12 place-items-center rounded-full bg-ink-900 text-saffron-400 transition-transform hover:scale-110 active:scale-95 ${
                    speaking ? "anim-speak" : ""
                  }`}
                  aria-label="پخش تلفظ"
                >
                  <PlayIcon size={22} />
                </button>
                <div className="font-en text-6xl font-semibold text-ink-900 sm:text-7xl" dir="ltr">
                  {entry.word}
                </div>
                <div className="font-en text-lg text-ink-500" dir="ltr">
                  {entry.ipa}
                </div>
              </div>
              <div className="relative flex items-center justify-center gap-2 p-5 text-sm font-bold text-ink-500">
                <EyeIcon size={17} />
                برای دیدن معنی، مثال و تصویر، کارت را برگردان
              </div>
            </div>

            {/* پشت کارت */}
            <div className="backface-hide flip-y absolute inset-0 flex flex-col overflow-hidden rounded-[28px] border border-ink-600 bg-ink-800 shadow-2xl shadow-black/50">
              <div className="flex items-start gap-4 p-5 sm:p-6">
                <WordArt id={entry.id} className="w-24 shrink-0 drop-shadow-lg sm:w-28" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-en text-3xl font-semibold text-ink-50" dir="ltr">
                      {entry.word}
                    </span>
                    <button
                      onClick={() => speak(entry.word)}
                      className={`grid h-9 w-9 place-items-center rounded-full bg-saffron-400 text-ink-950 transition-transform hover:scale-110 active:scale-95 ${
                        speaking ? "anim-speak" : ""
                      }`}
                      aria-label="پخش تلفظ"
                    >
                      <PlayIcon size={17} />
                    </button>
                  </div>
                  <div className="mt-0.5 font-en text-sm text-ink-300" dir="ltr">
                    {entry.ipa}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-display text-3xl leading-none text-saffron-300">
                      {entry.meaning}
                    </span>
                    <span className="rounded-full bg-ink-700 px-2.5 py-1 text-[11px] font-bold text-ink-200">
                      {entry.pos}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mx-5 mb-5 rounded-2xl border border-ink-600 bg-ink-900/80 p-4 sm:mx-6 sm:mb-6">
                <div className="mb-2 text-[11px] font-extrabold uppercase tracking-widest text-mint-300">
                  مثال
                </div>
                <p className="font-en text-lg italic leading-relaxed text-ink-100" dir="ltr" style={{ textAlign: "left" }}>
                  “{entry.example}”
                </p>
                <p className="mt-3 rounded-xl bg-ink-950/70 px-4 py-2.5 text-center text-[15px] font-medium leading-7 text-saffron-200">
                  {entry.exampleFa}
                </p>
              </div>

              <div className="mt-auto flex items-center justify-between border-t border-ink-600/70 px-5 py-3 text-xs font-bold text-ink-300 sm:px-6">
                <span>مرور بعدی در صورت دانستن: {faNum(INTERVALS[Math.min(card.box, BOX_COUNT - 1)])} روز دیگر</span>
                <span className="rounded-full bg-ink-700 px-2.5 py-1">جعبهٔ {faNum(card.box)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* دکمه‌ها */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="flex items-center gap-2.5 rounded-full bg-saffron-400 px-9 py-4 text-lg font-extrabold text-ink-950 shadow-lg shadow-saffron-500/25 transition-all hover:-translate-y-0.5 hover:bg-saffron-300 active:translate-y-0"
          >
            <EyeIcon size={22} />
            نمایش پاسخ
            <span className="kbd hidden sm:inline-block">Space</span>
          </button>
        ) : (
          <>
            <button
              onClick={() => grade(false)}
              className="flex items-center gap-2.5 rounded-full bg-coral-500 px-8 py-4 text-lg font-extrabold text-ink-950 shadow-lg shadow-coral-500/25 transition-all hover:-translate-y-0.5 hover:bg-coral-400 active:translate-y-0"
            >
              <RepeatIcon size={21} />
              نمی‌دونستم
              <span className="kbd hidden sm:inline-block">۱</span>
            </button>
            <button
              onClick={() => grade(true)}
              className="flex items-center gap-2.5 rounded-full bg-mint-400 px-8 py-4 text-lg font-extrabold text-ink-950 shadow-lg shadow-mint-500/25 transition-all hover:-translate-y-0.5 hover:bg-mint-300 active:translate-y-0"
            >
              <CheckIcon size={21} />
              می‌دونستم
              <span className="kbd hidden sm:inline-block">۲</span>
            </button>
          </>
        )}
      </div>
      <p className="text-center text-xs text-ink-400">
        «نمی‌دونستم» → بازگشت به جعبهٔ ۱ و مرور فردا • «می‌دونستم» → جعبهٔ بعد طبق منحنی ابینگهانس
      </p>
    </div>
  );
}

function Header({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <h1 className="font-display text-3xl text-ink-50 sm:text-4xl">{title}</h1>
      <p className="mt-1 text-sm text-ink-300 sm:text-base">{sub}</p>
    </div>
  );
}
