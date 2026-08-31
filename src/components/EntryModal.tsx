import { useEffect } from "react";
import { motion } from "framer-motion";
import { WordArt } from "../data/art";
import { CAT_LABEL, CATS, type DictEntry } from "../data/dictionary";
import { faNum, INTERVALS } from "../lib/leitner";
import { useSpeech } from "../lib/useSpeech";
import { CheckIcon, CloseIcon, PlayIcon, PlusIcon, TrashIcon } from "./Icons";

interface Props {
  entry: DictEntry;
  box: number | undefined; // اگر در جعبه باشد، شماره جعبه
  onToggle: (entry: DictEntry) => void;
  onClose: () => void;
}

/** پنجرهٔ جزئیات واژه: تصویر، تلفظ صوتی و نوشتاری، معنی، مثال با زیرنویس فارسی */
export default function EntryModal({ entry, box, onToggle, onClose }: Props) {
  const { speak, speaking } = useSpeech();
  const cat = CATS.find((c) => c.id === entry.cat)!;

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex overflow-y-auto bg-ink-950/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 36, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 24, opacity: 0, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="relative m-auto w-full max-w-2xl overflow-hidden rounded-[28px] border border-ink-600 bg-ink-850 shadow-2xl shadow-black/60"
      >
        {/* نوار رنگ دسته */}
        <div className="h-1.5 w-full" style={{ background: cat.dot }} />

        <div className="flex items-center justify-between p-5 pb-0">
          <span
            className="rounded-full px-3.5 py-1.5 text-xs font-extrabold"
            style={{ background: `${cat.dot}2e`, color: cat.dot }}
          >
            {CAT_LABEL[entry.cat]}
          </span>
          <button
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full text-ink-300 transition-colors hover:bg-ink-700 hover:text-ink-50"
            aria-label="بستن"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-start">
          {/* تصویر واژه */}
          <motion.div
            initial={{ rotate: -4, scale: 0.92 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.08, type: "spring", stiffness: 240, damping: 18 }}
            className="mx-auto w-40 shrink-0 drop-shadow-xl sm:mx-0 sm:w-44"
          >
            <WordArt id={entry.id} className="anim-wiggle" />
          </motion.div>

          {/* مشخصات */}
          <div className="flex-1 text-center sm:text-start">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <h2 className="font-en text-5xl font-semibold text-ink-50" dir="ltr">
                {entry.word}
              </h2>
              <button
                onClick={() => speak(entry.word)}
                className={`grid h-11 w-11 place-items-center rounded-full bg-saffron-400 text-ink-950 transition-transform hover:scale-110 active:scale-95 ${
                  speaking ? "anim-speak" : ""
                }`}
                aria-label="پخش تلفظ صوتی"
                title="پخش تلفظ"
              >
                <PlayIcon size={20} />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="font-en text-lg text-ink-300" dir="ltr">
                {entry.ipa}
              </span>
              <span className="rounded-full bg-ink-700 px-2.5 py-1 text-[11px] font-bold text-ink-200">
                {entry.pos}
              </span>
            </div>
            <div className="mt-4 flex items-baseline justify-center gap-2 sm:justify-start">
              <span className="text-sm font-bold text-ink-300">معنی:</span>
              <span className="font-display text-4xl leading-tight text-saffron-300">
                {entry.meaning}
              </span>
            </div>
          </div>
        </div>

        {/* مثال با زیرنویس فارسی */}
        <div className="mx-6 rounded-2xl border border-ink-600 bg-ink-900/80 p-5">
          <div className="mb-2 text-[11px] font-extrabold uppercase tracking-widest text-mint-300">
            مثال و زیرنویس فارسی
          </div>
          <p className="font-en text-xl italic leading-relaxed text-ink-100" dir="ltr" style={{ textAlign: "left" }}>
            “{entry.example}”
          </p>
          <p className="mt-3 rounded-xl bg-ink-950/70 px-4 py-3 text-center text-base font-medium leading-8 text-saffron-200">
            {entry.exampleFa}
          </p>
        </div>

        {/* برنامه مرور */}
        <div className="px-6 pt-5">
          <div className="mb-2 text-xs font-extrabold text-ink-300">
            برنامهٔ مرور بر پایهٔ منحنی ابینگهانس
          </div>
          <div className="flex flex-wrap gap-2">
            {INTERVALS.map((d, i) => {
              const active = box !== undefined && i + 1 === box;
              const passed = box !== undefined && i + 1 < box;
              return (
                <span
                  key={d}
                  className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${
                    active
                      ? "border-mint-400 bg-mint-400/15 text-mint-300"
                      : passed
                        ? "border-ink-600 bg-ink-800 text-ink-400"
                        : "border-ink-600 text-ink-200"
                  }`}
                >
                  {faNum(d)} روز
                  {active && " ← الان اینجاست"}
                </span>
              );
            })}
          </div>
        </div>

        {/* اقدام */}
        <div className="p-6">
          {box === undefined ? (
            <button
              onClick={() => onToggle(entry)}
              className="flex w-full items-center justify-center gap-2.5 rounded-full bg-saffron-400 py-4 text-lg font-extrabold text-ink-950 shadow-lg shadow-saffron-500/25 transition-all hover:-translate-y-0.5 hover:bg-saffron-300 active:translate-y-0"
            >
              <PlusIcon size={22} />
              افزودن به جعبهٔ لایتنر
            </button>
          ) : (
            <div className="flex w-full items-center justify-between gap-3 rounded-full border border-mint-500/40 bg-mint-400/10 py-2.5 pe-3 ps-5">
              <span className="flex items-center gap-2 font-bold text-mint-300">
                <CheckIcon size={20} />
                در جعبهٔ {faNum(box)} لایتنر است
              </span>
              <button
                onClick={() => onToggle(entry)}
                className="flex items-center gap-1.5 rounded-full bg-ink-800 px-4 py-2 text-sm font-bold text-coral-300 transition-colors hover:bg-coral-500/15"
              >
                <TrashIcon size={16} />
                حذف
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
