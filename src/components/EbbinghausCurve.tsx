import { faNum } from "../lib/leitner";

/**
 * نمودار منحنی فراموشی ابینگهانس با جهش‌های مرور در روزهای ۱-۳-۷-۲۱-۳۰-۹۰
 */

const DOTS = [
  { x: 35.6, y: 44, day: 1 },
  { x: 46.7, y: 54, day: 3 },
  { x: 68.9, y: 62, day: 7 },
  { x: 146.7, y: 74, day: 21 },
  { x: 196.7, y: 78, day: 30 },
  { x: 530, y: 94, day: 90 },
];

const CURVE_PATH =
  "M16,30 C24,36 30,56 35.6,72 L35.6,44 C39,52 43,68 46.7,84 L46.7,54 " +
  "C51,62 61,82 68.9,98 L68.9,62 C84,70 122,96 146.7,112 L146.7,74 " +
  "C158,80 180,96 196.7,108 L196.7,78 C236,86 420,116 530,128 L530,94";

interface Props {
  counts?: number[]; // تعداد واژه‌های هر جعبه (۶ عدد)
  activeBox?: number; // جعبه فعال 1..6
  className?: string;
  compact?: boolean;
}

export default function EbbinghausCurve({
  counts,
  activeBox,
  className = "",
  compact = false,
}: Props) {
  return (
    <svg
      viewBox="0 0 560 190"
      className={className}
      role="img"
      aria-label="منحنی فراموشی ابینگهانس"
    >
      <defs>
        <linearGradient id="ebFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffc94d" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#ffc94d" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* محور روز */}
      <line
        x1="16"
        y1="150"
        x2="544"
        y2="150"
        stroke="#2a5c55"
        strokeWidth="1.4"
        strokeDasharray="3 7"
        strokeLinecap="round"
      />
      {!compact && (
        <>
          <text x="544" y="172" textAnchor="end" fontSize="12" fill="#5d8b83" fontFamily="Vazirmatn">
            روز
          </text>
          <text x="16" y="34" fontSize="11" fill="#5d8b83" fontFamily="Vazirmatn">
            ۱۰۰٪
          </text>
          <text x="16" y="146" fontSize="11" fill="#5d8b83" fontFamily="Vazirmatn">
            ۰٪
          </text>
        </>
      )}

      {/* سطح زیر منحنی */}
      <path d={`${CURVE_PATH} L530,150 L16,150 Z`} fill="url(#ebFill)" />

      {/* منحنی با انیمیشن ترسیم */}
      <path
        d={CURVE_PATH}
        fill="none"
        stroke="#ffc94d"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        className="curve-draw"
      />

      {/* نقاط مرور */}
      {DOTS.map((d, i) => {
        const active = activeBox === i + 1;
        const cnt = counts?.[i] ?? 0;
        return (
          <g key={d.day}>
            {active && (
              <circle cx={d.x} cy={d.y} r="10" fill="#5fd6b4" opacity="0.5" className="anim-pulse-soft" />
            )}
            <circle
              cx={d.x}
              cy={d.y}
              r={active ? 7 : 5}
              fill={active ? "#5fd6b4" : "#0b2b28"}
              stroke={active ? "#b8f2e0" : "#ffc94d"}
              strokeWidth="2.6"
            />
            {!compact && (
              <text
                x={d.x}
                y={172}
                textAnchor="middle"
                fontSize="13"
                fontWeight={active ? 800 : 500}
                fill={active ? "#5fd6b4" : "#86aba3"}
                fontFamily="Vazirmatn"
              >
                {faNum(d.day)}
              </text>
            )}
            {!compact && cnt > 0 && (
              <text
                x={d.x}
                y={d.y - 14}
                textAnchor="middle"
                fontSize="12"
                fontWeight={700}
                fill="#8fe8cd"
                fontFamily="Vazirmatn"
              >
                {faNum(cnt)}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
