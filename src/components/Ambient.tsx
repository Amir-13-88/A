/** پس‌زمینهٔ لایه‌لایه: هاله‌های نور، بافت نقطه‌ای و شکل‌های شناور */

const SHAPES = [
  { top: "12%", right: "6%", s: 74, type: "ring", c: "#5fd6b4", o: 0.16, dur: "11s", delay: "0s" },
  { top: "24%", right: "22%", s: 12, type: "dot", c: "#ffc94d", o: 0.5, dur: "8s", delay: ".6s" },
  { top: "64%", right: "4%", s: 26, type: "plus", c: "#ff8a75", o: 0.28, dur: "12s", delay: "1.2s" },
  { top: "78%", right: "18%", s: 54, type: "ring", c: "#ffc94d", o: 0.12, dur: "13s", delay: ".3s" },
  { top: "8%", right: "44%", s: 10, type: "dot", c: "#5fd6b4", o: 0.4, dur: "9s", delay: "1.8s" },
  { top: "42%", right: "88%", s: 22, type: "tri", c: "#5fd6b4", o: 0.22, dur: "14s", delay: ".9s" },
  { top: "86%", right: "42%", s: 14, type: "dot", c: "#ff8a75", o: 0.35, dur: "10s", delay: "2.2s" },
  { top: "30%", right: "70%", s: 30, type: "squiggle", c: "#ffc94d", o: 0.25, dur: "12s", delay: "1.5s" },
  { top: "55%", right: "30%", s: 16, type: "plus", c: "#5fd6b4", o: 0.25, dur: "9.5s", delay: ".4s" },
  { top: "70%", right: "64%", s: 10, type: "dot", c: "#ffc94d", o: 0.4, dur: "7.5s", delay: "1.1s" },
];

function Shape({ type, c, s }: { type: string; c: string; s: number }) {
  if (type === "ring")
    return (
      <div
        style={{ width: s, height: s, border: `2px solid ${c}`, borderRadius: "50%" }}
      />
    );
  if (type === "dot")
    return <div style={{ width: s, height: s, background: c, borderRadius: "50%" }} />;
  if (type === "plus")
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M12 3v18M3 12h18" stroke={c} strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  if (type === "tri")
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M12 3 22 20H2Z" stroke={c} strokeWidth="2.4" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg width={s * 1.8} height={s} viewBox="0 0 40 20" fill="none">
      <path
        d="M2 14 q5,-12 10,0 q5,12 10,0 q5,-12 10,0"
        stroke={c}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Ambient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* هاله‌های نور */}
      <div
        className="absolute -top-40 right-[-10%] h-[540px] w-[540px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(247,179,43,0.13) 0%, rgba(247,179,43,0.05) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-18%] left-[-8%] h-[620px] w-[620px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(95,214,180,0.12) 0%, rgba(95,214,180,0.04) 48%, transparent 72%)",
        }}
      />
      <div
        className="absolute top-[30%] left-[35%] h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,111,89,0.07) 0%, transparent 65%)",
        }}
      />
      {/* بافت نقطه‌ای */}
      <div
        className="dotted-bg absolute inset-0"
        style={{
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 20%, black 30%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 20%, black 30%, transparent 78%)",
        }}
      />
      {/* شکل‌های شناور */}
      {SHAPES.map((sh, i) => (
        <div
          key={i}
          className="anim-float absolute"
          style={
            {
              top: sh.top,
              right: sh.right,
              opacity: sh.o,
              "--dur": sh.dur,
              "--delay": sh.delay,
            } as React.CSSProperties
          }
        >
          <Shape type={sh.type} c={sh.c} s={sh.s} />
        </div>
      ))}
    </div>
  );
}
