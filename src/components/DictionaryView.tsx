import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { WordArt } from "../data/art";
import { CATS, DICT, type CatId, type DictEntry } from "../data/dictionary";
import { faNum as faNumLocal } from "../lib/leitner";

interface Props {
  boxMap: Record<string, number>; // wordId -> شماره جعبه
  onOpen: (e: DictEntry) => void;
  onToggle: (e: DictEntry) => void;
}

/** دیکشنری تصویری المتری — جست‌وجو، دسته‌بندی و افزودن به جعبه */
export default function DictionaryView({ boxMap, onOpen, onToggle }: Props) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CatId | "all">("all");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    return DICT.filter((e) => {
      if (cat !== "all" && e.cat !== cat) return false;
      if (!query) return true;
      return (
        e.word.toLowerCase().includes(query) ||
        e.meaning.includes(query) ||
        e.ipa.includes(query)
      );
    }).sort((a, b) => a.word.localeCompare(b.word));
  }, [q, cat]);

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-ink-50 sm:text-4xl">
            دیکشنری تصویری المتری
          </h1>
          <p className="mt-1 text-sm text-ink-300 sm:text-base">
            {faNumLocal(36)} واژهٔ پایه با تصویر، معنی فارسی، مثال با زیرنویس، تلفظ نوشتاری و صوتی
          </p>
        </div>
        <span className="rounded-full border border-ink-600 bg-ink-850 px-4 py-2 text-xs font-bold text-ink-300">
          {faNumLocal(results.length)} نتیجه
        </span>
      </div>

      {/* جست‌وجو */}
      <label className="group flex items-center gap-3 rounded-full border border-ink-600 bg-ink-850/90 px-5 py-3.5 transition-colors focus-within:border-saffron-400 focus-within:bg-ink-850">
        <SearchGlyph />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="جست‌وجوی واژه یا معنی… مثلاً apple یا سیب"
          className="w-full bg-transparent text-base text-ink-50 outline-none placeholder:text-ink-400"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            className="rounded-full bg-ink-700 px-3 py-1 text-xs font-bold text-ink-200 transition-colors hover:bg-ink-600"
          >
            پاک کردن
          </button>
        )}
      </label>

      {/* دسته‌ها */}
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        <Chip
          active={cat === "all"}
          onClick={() => setCat("all")}
          label="همه"
          dot="#86aba3"
        />
        {CATS.map((c) => (
          <Chip
            key={c.id}
            active={cat === c.id}
            onClick={() => setCat(c.id)}
            label={c.label}
            dot={c.dot}
          />
        ))}
      </div>

      {/* شبکه واژه‌ها */}
      {results.length === 0 ? (
        <div className="rounded-[28px] border border-ink-700 bg-ink-850/80 p-12 text-center">
          <div className="font-en text-5xl text-ink-500" dir="ltr">
            ∅
          </div>
          <p className="mt-4 font-bold text-ink-200">واژه‌ای پیدا نشد!</p>
          <p className="mt-1 text-sm text-ink-400">املای انگلیسی یا معنی فارسی را جور دیگری بنویس.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((e, i) => {
            const inBox = boxMap[e.id] !== undefined;
            return (
              <motion.button
                key={e.id}
                onClick={() => onOpen(e)}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: (i % 8) * 0.04, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-[22px] border border-ink-700 bg-ink-850/90 p-3 text-start transition-colors hover:border-saffron-400/70"
              >
                <div className="overflow-hidden rounded-2xl">
                  <div className="transition-transform duration-500 group-hover:scale-[1.06]">
                    <WordArt id={e.id} className="w-full" />
                  </div>
                </div>
                <div className="mt-3 flex items-start justify-between gap-2 px-1">
                  <div className="min-w-0">
                    <div className="font-en truncate text-xl font-semibold text-ink-50" dir="ltr" style={{ textAlign: "right" }}>
                      {e.word}
                    </div>
                    <div className="mt-0.5 truncate text-sm font-bold text-saffron-300">
                      {e.meaning}
                    </div>
                    <div className="mt-0.5 font-en text-[11px] text-ink-400" dir="ltr" style={{ textAlign: "right" }}>
                      {e.ipa}
                    </div>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center justify-between px-1 pb-1">
                  <span className="rounded-full bg-ink-700/80 px-2.5 py-1 text-[10px] font-bold text-ink-200">
                    {CATS.find((c) => c.id === e.cat)?.label}
                  </span>
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(ev) => {
                      ev.stopPropagation();
                      onToggle(e);
                    }}
                    onKeyDown={(ev) => {
                      if (ev.key === "Enter") {
                        ev.stopPropagation();
                        onToggle(e);
                      }
                    }}
                    className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-extrabold transition-all active:scale-95 ${
                      inBox
                        ? "bg-mint-400/15 text-mint-300"
                        : "bg-saffron-400 text-ink-950 hover:bg-saffron-300"
                    }`}
                  >
                    {inBox ? (
                      <>
                        <CheckGlyph /> در جعبه
                      </>
                    ) : (
                      <>
                        <PlusGlyph /> افزودن
                      </>
                    )}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  label,
  dot,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  dot: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all ${
        active
          ? "border-saffron-400 bg-saffron-400/15 text-saffron-300"
          : "border-ink-600 bg-ink-850 text-ink-200 hover:border-ink-400"
      }`}
    >
      <span className="inline-block h-2 w-2 rounded-full" style={{ background: dot }} />
      {label}
    </button>
  );
}

function SearchGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-ink-300">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </svg>
  );
}

function PlusGlyph() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 12.5 10 18 19.5 6.5" />
    </svg>
  );
}
