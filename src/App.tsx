import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Ambient from "./components/Ambient";
import BoxesView from "./components/BoxesView";
import DictionaryView from "./components/DictionaryView";
import EntryModal from "./components/EntryModal";
import ReviewView from "./components/ReviewView";
import {
  BookIcon,
  BoxIcon,
  CheckIcon,
  FlameIcon,
  LogoIcon,
  ReviewIcon,
  SparkIcon,
  TrashIcon,
} from "./components/Icons";
import { DICT, ENTRY_MAP, STARTER_WORDS, type DictEntry } from "./data/dictionary";
import {
  faNum,
  gradeAgain,
  gradeOk,
  isDue,
  loadState,
  makeCard,
  nextStreak,
  saveState,
  type LeitnerCard,
  type Streak,
} from "./lib/leitner";

type View = "review" | "boxes" | "dict";

interface Toast {
  id: number;
  msg: string;
  tone: "ok" | "info" | "warn";
}

let toastId = 0;

export default function App() {
  const [init] = useState(loadState);
  const [cards, setCards] = useState<LeitnerCard[]>(init.cards);
  const [streak, setStreak] = useState<Streak>(init.streak);
  const [view, setView] = useState<View>("review");
  const [selected, setSelected] = useState<DictEntry | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    saveState({ cards, streak });
  }, [cards, streak]);

  const toast = (msg: string, tone: Toast["tone"] = "ok") => {
    const id = ++toastId;
    setToasts((t) => [...t.slice(-2), { id, msg, tone }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  };

  // ---------- اعمال ----------
  const addWord = (entry: DictEntry): boolean => {
    if (cards.some((c) => c.wordId === entry.id)) {
      toast(`«${entry.word}» از قبل در جعبه است`, "info");
      return false;
    }
    setCards((cs) => [...cs, makeCard(entry.id)]);
    toast(`«${entry.word}» به جعبه اضافه شد — امروز مرور کن!`, "ok");
    return true;
  };

  const removeWord = (wordId: string) => {
    const e = ENTRY_MAP[wordId];
    setCards((cs) => cs.filter((c) => c.wordId !== wordId));
    toast(`«${e?.word ?? wordId}» از جعبه حذف شد`, "warn");
  };

  const toggleWord = (entry: DictEntry) => {
    if (cards.some((c) => c.wordId === entry.id)) removeWord(entry.id);
    else addWord(entry);
  };

  const grade = (id: string, ok: boolean) => {
    setCards((cs) => cs.map((c) => (c.id === id ? (ok ? gradeOk(c) : gradeAgain(c)) : c)));
    setStreak((s) => nextStreak(s));
  };

  const seed = () => {
    const fresh = STARTER_WORDS.filter((w) => !cards.some((c) => c.wordId === w));
    if (fresh.length === 0) {
      toast("این واژه‌ها از قبل در جعبه‌اند", "info");
      return;
    }
    setCards((cs) => [...cs, ...fresh.map(makeCard)]);
    toast(`${faNum(fresh.length)} واژه به جعبه اضافه شد — مرور را شروع کن!`, "ok");
  };

  // ---------- داده‌های مشتق ----------
  const boxMap = useMemo(
    () => Object.fromEntries(cards.map((c) => [c.wordId, c.box])) as Record<string, number>,
    [cards],
  );
  const dueCount = useMemo(() => cards.filter(isDue).length, [cards]);

  const navItems: { id: View; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: "review",
      label: "مرور",
      icon: <ReviewIcon size={21} />,
      badge: dueCount > 0 ? faNum(dueCount) : undefined,
    },
    { id: "boxes", label: "جعبه‌ها", icon: <BoxIcon size={21} />, badge: faNum(cards.length) },
    { id: "dict", label: "دیکشنری", icon: <BookIcon size={21} />, badge: faNum(DICT.length) },
  ];

  return (
    <div className="relative flex min-h-screen">
      <Ambient />

      {/* ---------- سایدبار دسکتاپ ---------- */}
      <aside className="sticky top-0 z-20 hidden h-screen w-64 shrink-0 flex-col border-e border-ink-800 bg-ink-900/70 backdrop-blur-md lg:flex">
        <div className="flex items-center gap-3 px-6 py-7">
          <span className="text-saffron-400">
            <LogoIcon size={38} />
          </span>
          <div>
            <div className="font-display text-2xl leading-none text-ink-50">واژه‌باکس</div>
            <div className="mt-1 text-[11px] font-bold text-ink-400">جعبهٔ لایتنر هوشمند</div>
          </div>
        </div>

        <nav className="mt-2 space-y-1.5 px-4">
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => setView(n.id)}
              className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-start font-bold transition-all ${
                view === n.id
                  ? "bg-saffron-400/15 text-saffron-300 shadow-[inset_0_0_0_1px_rgba(255,201,77,0.25)]"
                  : "text-ink-300 hover:bg-ink-800 hover:text-ink-100"
              }`}
            >
              <span className={`transition-transform group-hover:-translate-x-0.5 ${view === n.id ? "-translate-x-0.5" : ""}`}>
                {n.icon}
              </span>
              <span className="flex-1">{n.label}</span>
              {n.badge && (
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-extrabold ${
                    n.id === "review" && dueCount > 0
                      ? "bg-coral-500/20 text-coral-300"
                      : "bg-ink-700 text-ink-200"
                  }`}
                >
                  {n.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-3 px-4 pb-6">
          <div className="rounded-2xl border border-ink-700 bg-ink-850/80 p-4">
            <div className="flex items-center gap-2 text-coral-300">
              <FlameIcon size={20} />
              <span className="font-display text-2xl leading-none text-ink-50">
                {faNum(streak.count)}
              </span>
              <span className="text-xs font-bold text-ink-300">روز پیاپی مرور</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink-700">
              <div
                className="h-full rounded-full bg-gradient-to-l from-coral-500 to-saffron-400 transition-all duration-700"
                style={{ width: `${Math.min(streak.count * 14, 100)}%` }}
              />
            </div>
          </div>
          <p className="px-2 text-[11px] leading-6 text-ink-400">
            <span className="font-bold text-mint-300">قانون ابینگهانس:</span> مرور درست قبل از
            فراموشی، حافظه را چند برابر ماندگارتر می‌کند.
          </p>
        </div>
      </aside>

      {/* ---------- محتوای اصلی ---------- */}
      <div className="min-w-0 flex-1">
        {/* هدر موبایل */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-ink-800 bg-ink-950/85 px-4 py-3.5 backdrop-blur-md lg:hidden">
          <div className="flex items-center gap-2.5">
            <span className="text-saffron-400">
              <LogoIcon size={30} />
            </span>
            <span className="font-display text-xl leading-none text-ink-50">واژه‌باکس</span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-ink-850 px-3 py-1.5 text-xs font-bold text-coral-300">
            <FlameIcon size={15} />
            {faNum(streak.count)} روز
          </span>
        </header>

        <main className="mx-auto max-w-5xl px-4 pb-32 pt-7 sm:px-6 lg:px-10 lg:pb-16 lg:pt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {view === "review" && (
                <ReviewView
                  cards={cards}
                  onGrade={grade}
                  onSeed={seed}
                  onGoDict={() => setView("dict")}
                  onGoBoxes={() => setView("boxes")}
                />
              )}
              {view === "boxes" && (
                <BoxesView
                  cards={cards}
                  streak={streak}
                  onRemove={removeWord}
                  onGoDict={() => setView("dict")}
                />
              )}
              {view === "dict" && (
                <DictionaryView
                  boxMap={boxMap}
                  onOpen={setSelected}
                  onToggle={toggleWord}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* ---------- ناوبری موبایل ---------- */}
      <nav className="fixed inset-x-3 bottom-3 z-30 flex items-stretch justify-around rounded-3xl border border-ink-700 bg-ink-900/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-md lg:hidden">
        {navItems.map((n) => (
          <button
            key={n.id}
            onClick={() => setView(n.id)}
            className={`relative flex flex-1 flex-col items-center gap-1 rounded-2xl py-2.5 text-[11px] font-bold transition-all ${
              view === n.id ? "bg-saffron-400/15 text-saffron-300" : "text-ink-300"
            }`}
          >
            {n.icon}
            {n.label}
            {n.id === "review" && dueCount > 0 && (
              <span className="absolute -top-1 start-1/2 grid h-5 min-w-5 translate-x-1/2 place-items-center rounded-full bg-coral-500 px-1 text-[10px] font-extrabold text-ink-950">
                {faNum(dueCount)}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* ---------- مودال واژه ---------- */}
      <AnimatePresence>
        {selected && (
          <EntryModal
            entry={selected}
            box={boxMap[selected.id]}
            onToggle={toggleWord}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>

      {/* ---------- توست‌ها ---------- */}
      <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[70] flex flex-col items-center gap-2 lg:bottom-8">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`flex items-center gap-2.5 rounded-full border px-5 py-3 text-sm font-bold shadow-xl shadow-black/40 backdrop-blur-md ${
                t.tone === "ok"
                  ? "border-mint-500/50 bg-ink-900/95 text-mint-300"
                  : t.tone === "warn"
                    ? "border-coral-500/50 bg-ink-900/95 text-coral-300"
                    : "border-saffron-500/50 bg-ink-900/95 text-saffron-300"
              }`}
            >
              {t.tone === "ok" ? (
                <CheckIcon size={17} />
              ) : t.tone === "warn" ? (
                <TrashIcon size={17} />
              ) : (
                <SparkIcon size={17} />
              )}
              {t.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
