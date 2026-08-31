import type { ReactElement, ReactNode } from "react";

/** تصویر SVG دست‌ساز برای هر واژه — سبک تخت و یکپارچه */

function T({ bg, children }: { bg: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
      <rect width="120" height="120" rx="26" fill={bg} />
      <ellipse cx="60" cy="101" rx="30" ry="5.5" fill="#0b2b28" opacity="0.1" />
      {children}
    </svg>
  );
}

const ANIMAL = "#fbe7c4";
const FOOD = "#fbe0d2";
const NATURE = "#ddefdb";
const HOME = "#e0e8f3";
const BODY = "#f9dee3";
const SKY = "#d9eef4";

export const ART: Record<string, ReactElement> = {
  // ---------- حیوانات ----------
  cat: (
    <T bg={ANIMAL}>
      <path d="M38,52 L30,26 L54,40 Z" fill="#f2a65c" />
      <path d="M82,52 L90,26 L66,40 Z" fill="#f2a65c" />
      <path d="M39,47 L35,33 L48,41 Z" fill="#e8836b" />
      <path d="M81,47 L85,33 L72,41 Z" fill="#e8836b" />
      <circle cx="60" cy="66" r="30" fill="#f2a65c" />
      <path d="M52,40 q8,-5 16,0" stroke="#e8836b" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="49" cy="62" r="3.4" fill="#33261c" />
      <circle cx="71" cy="62" r="3.4" fill="#33261c" />
      <circle cx="50.2" cy="60.8" r="1.1" fill="#fff" />
      <circle cx="72.2" cy="60.8" r="1.1" fill="#fff" />
      <path d="M56,72 L64,72 L60,77 Z" fill="#e8836b" />
      <path d="M60,77 q-3,5 -9,4 M60,77 q3,5 9,4" stroke="#7a4e2d" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M42,68 L26,64 M42,74 L27,75 M78,68 L94,64 M78,74 L93,75" stroke="#c98a5b" strokeWidth="2" strokeLinecap="round" />
    </T>
  ),
  dog: (
    <T bg={ANIMAL}>
      <circle cx="60" cy="64" r="28" fill="#c98a5b" />
      <path d="M36,50 q-11,25 1,34 q11,7 13,-8 Z" fill="#8c5b33" />
      <path d="M84,50 q11,25 -1,34 q-11,7 -13,-8 Z" fill="#8c5b33" />
      <circle cx="49" cy="58" r="3.2" fill="#3a2c22" />
      <circle cx="71" cy="58" r="3.2" fill="#3a2c22" />
      <circle cx="50.2" cy="56.8" r="1" fill="#fff" />
      <circle cx="72.2" cy="56.8" r="1" fill="#fff" />
      <ellipse cx="60" cy="76" rx="14" ry="11" fill="#e9c79b" />
      <ellipse cx="60" cy="70" rx="5.5" ry="4.2" fill="#3a2c22" />
      <path d="M60,74 v4 M60,78 q-4,5 -9,3 M60,78 q4,5 9,3" stroke="#7a4e2d" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M55,84 q5,7 10,0 Z" fill="#f08a8a" />
    </T>
  ),
  bird: (
    <T bg={SKY}>
      <path d="M36,60 L16,52 L34,72 Z" fill="#3e8fb0" />
      <ellipse cx="58" cy="66" rx="24" ry="18" fill="#5fb7d6" />
      <circle cx="80" cy="47" r="13" fill="#5fb7d6" />
      <path d="M92,44 L105,49 L92,53 Z" fill="#f7b32b" />
      <circle cx="83" cy="44" r="2.6" fill="#22333f" />
      <circle cx="84" cy="43" r="0.9" fill="#fff" />
      <ellipse cx="52" cy="63" rx="13" ry="8" fill="#3e8fb0" transform="rotate(-22 52 63)" />
      <path d="M55,84 v8 M65,84 v8 M55,92 h-5 M65,92 h-5" stroke="#f7a32b" strokeWidth="2.6" strokeLinecap="round" />
    </T>
  ),
  fish: (
    <T bg={SKY}>
      <path d="M26,34 a4,4 0 1 0 8,0 a4,4 0 1 0 -8,0 M20,23 a2.6,2.6 0 1 0 5.2,0 a2.6,2.6 0 1 0 -5.2,0" fill="none" stroke="#9ccfda" strokeWidth="2.4" />
      <path d="M80,62 L104,48 L99,62 L104,76 Z" fill="#f2695c" />
      <ellipse cx="56" cy="62" rx="26" ry="17" fill="#ff8a70" />
      <path d="M50,46 q8,-11 17,-1 Z" fill="#f2695c" />
      <path d="M48,52 q6,10 0,20 M62,50 q6,12 0,24" stroke="#f2695c" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="42" cy="58" r="5" fill="#fff" />
      <circle cx="43" cy="58" r="2.6" fill="#2e2a26" />
      <path d="M24,92 q8,-6 16,0 q8,6 16,0 q8,-6 16,0 q8,6 16,0" stroke="#9ccfda" strokeWidth="3" strokeLinecap="round" fill="none" />
    </T>
  ),
  horse: (
    <T bg={ANIMAL}>
      <path d="M46,38 L40,18 L58,30 Z" fill="#b07b4f" />
      <path d="M74,38 L80,18 L62,30 Z" fill="#b07b4f" />
      <path d="M47,34 L45,24 L55,30 Z" fill="#6b4326" />
      <path d="M73,34 L75,24 L65,30 Z" fill="#6b4326" />
      <rect x="44" y="32" width="32" height="54" rx="16" fill="#b07b4f" />
      <path d="M44,44 q16,-14 32,0 l-5,7 q-11,-9 -22,0 Z" fill="#6b4326" />
      <ellipse cx="60" cy="84" rx="20" ry="14" fill="#e9c79b" />
      <circle cx="52" cy="58" r="3" fill="#33261c" />
      <circle cx="68" cy="58" r="3" fill="#33261c" />
      <circle cx="54" cy="82" r="2.6" fill="#8c5b33" />
      <circle cx="66" cy="82" r="2.6" fill="#8c5b33" />
      <path d="M55,90 q5,4 10,0" stroke="#8c5b33" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    </T>
  ),
  butterfly: (
    <T bg={NATURE}>
      <path d="M56,40 q-6,-10 -14,-12 M64,40 q6,-10 14,-12" stroke="#4a3b33" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="41" cy="27" r="2.4" fill="#4a3b33" />
      <circle cx="79" cy="27" r="2.4" fill="#4a3b33" />
      <ellipse cx="41" cy="54" rx="17" ry="14" fill="#f2695c" transform="rotate(-20 41 54)" />
      <ellipse cx="79" cy="54" rx="17" ry="14" fill="#f2695c" transform="rotate(20 79 54)" />
      <ellipse cx="44" cy="78" rx="13" ry="11" fill="#ffc94d" transform="rotate(-28 44 78)" />
      <ellipse cx="76" cy="78" rx="13" ry="11" fill="#ffc94d" transform="rotate(28 76 78)" />
      <circle cx="38" cy="52" r="4" fill="#fbe0d2" />
      <circle cx="82" cy="52" r="4" fill="#fbe0d2" />
      <circle cx="43" cy="78" r="3" fill="#f2695c" />
      <circle cx="77" cy="78" r="3" fill="#f2695c" />
      <ellipse cx="60" cy="62" rx="5.5" ry="17" fill="#4a3b33" />
      <circle cx="60" cy="43" r="5.5" fill="#4a3b33" />
    </T>
  ),

  // ---------- غذا ----------
  apple: (
    <T bg={FOOD}>
      <path d="M60,46 q1,-9 8,-13" stroke="#7a4e2d" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M66,36 q13,-9 18,3 q-12,8 -18,-3 Z" fill="#5fa463" />
      <circle cx="60" cy="68" r="27" fill="#f2554a" />
      <path d="M45,56 q-5,11 2,21" stroke="#ff9a90" strokeWidth="5" strokeLinecap="round" fill="none" />
      <circle cx="52" cy="52" r="2.4" fill="#ffd2cd" />
    </T>
  ),
  bread: (
    <T bg={FOOD}>
      <path d="M48,22 q0,-6 4,-6 M60,20 q0,-6 4,-6" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.75" />
      <path d="M32,66 q0,-26 28,-26 q28,0 28,26 Z" fill="#f6c68a" />
      <rect x="32" y="62" width="56" height="26" rx="12" fill="#e8a85c" />
      <path d="M47,52 l9,10 M60,48 l9,10 M73,52 l9,10" stroke="#d9924b" strokeWidth="3.2" strokeLinecap="round" />
    </T>
  ),
  cheese: (
    <T bg={FOOD}>
      <path d="M24,84 L96,60 L84,50 L28,72 Z" fill="#ffe08a" />
      <path d="M24,84 L96,60 L96,82 Q60,94 24,86 Z" fill="#ffc94d" />
      <circle cx="48" cy="82" r="5" fill="#e8a33d" />
      <circle cx="68" cy="77" r="4" fill="#e8a33d" />
      <circle cx="85" cy="76" r="3" fill="#e8a33d" />
      <circle cx="60" cy="63" r="3" fill="#f7b32b" />
    </T>
  ),
  egg: (
    <T bg={FOOD}>
      <path d="M60,34 q23,-4 31,14 q10,20 -6,32 q-18,14 -41,6 q-20,-8 -16,-28 q4,-20 32,-24 Z" fill="#fff7ea" />
      <circle cx="62" cy="62" r="15" fill="#ffc94d" />
      <circle cx="57" cy="57" r="4.5" fill="#ffe08a" />
      <circle cx="34" cy="44" r="1.8" fill="#f0e2c8" />
      <circle cx="90" cy="46" r="1.8" fill="#f0e2c8" />
    </T>
  ),
  milk: (
    <T bg={FOOD}>
      <path d="M66,24 L74,27 L69,52 L61,52 Z" fill="#f2695c" />
      <path d="M44,40 L76,40 L72,93 q-0.5,7 -7.5,7 l-9,0 q-7,0 -7.5,-7 Z" fill="#cfe6f2" />
      <path d="M46,55 L74,55 L71,92 q-0.4,4 -4.5,4 l-13,0 q-4.1,0 -4.5,-4 Z" fill="#fffdf6" />
      <ellipse cx="60" cy="55" rx="14" ry="3.4" fill="#ffffff" />
      <circle cx="60" cy="75" r="7" fill="#f2695c" />
      <path d="M60,68 q1,-4 4,-5 q0,4 -4,5 Z" fill="#5fa463" />
    </T>
  ),
  tomato: (
    <T bg={FOOD}>
      <circle cx="60" cy="68" r="26" fill="#f2554a" />
      <path d="M44,58 q-4,10 2,19" stroke="#ff9a90" strokeWidth="5" strokeLinecap="round" fill="none" />
      <ellipse cx="60" cy="42" rx="4" ry="9" fill="#5fa463" />
      <ellipse cx="49" cy="45" rx="8" ry="4" fill="#4c8a50" transform="rotate(-24 49 45)" />
      <ellipse cx="71" cy="45" rx="8" ry="4" fill="#4c8a50" transform="rotate(24 71 45)" />
      <rect x="57.5" y="28" width="5" height="12" rx="2.5" fill="#4c8a50" />
    </T>
  ),

  // ---------- طبیعت ----------
  sun: (
    <T bg={NATURE}>
      <g fill="#f7b32b">
        <rect x="57.5" y="14" width="5" height="14" rx="2.5" />
        <rect x="57.5" y="92" width="5" height="14" rx="2.5" />
        <rect x="14" y="57.5" width="14" height="5" rx="2.5" />
        <rect x="92" y="57.5" width="14" height="5" rx="2.5" />
        <rect x="57.5" y="14" width="5" height="14" rx="2.5" transform="rotate(45 60 60)" />
        <rect x="57.5" y="92" width="5" height="14" rx="2.5" transform="rotate(45 60 60)" />
        <rect x="57.5" y="14" width="5" height="14" rx="2.5" transform="rotate(-45 60 60)" />
        <rect x="57.5" y="92" width="5" height="14" rx="2.5" transform="rotate(-45 60 60)" />
      </g>
      <circle cx="60" cy="60" r="22" fill="#ffc94d" />
      <path d="M50,52 q-3,8 1,15" stroke="#ffe7ad" strokeWidth="4.5" strokeLinecap="round" fill="none" />
    </T>
  ),
  moon: (
    <T bg={SKY}>
      <circle cx="56" cy="62" r="27" fill="#f5d78e" />
      <circle cx="70" cy="52" r="23" fill={SKY} />
      <path d="M88,28 l2.2,5 5,2.2 -5,2.2 -2.2,5 -2.2,-5 -5,-2.2 5,-2.2 Z" fill="#f5d78e" />
      <path d="M98,70 l1.6,3.6 3.6,1.6 -3.6,1.6 -1.6,3.6 -1.6,-3.6 -3.6,-1.6 3.6,-1.6 Z" fill="#f5d78e" />
      <circle cx="84" cy="92" r="2.2" fill="#f5d78e" />
      <circle cx="30" cy="30" r="2" fill="#f5d78e" />
    </T>
  ),
  star: (
    <T bg={SKY}>
      <path d="M60,32 L67,52 L88,53 L71,66 L77,86 L60,74 L43,86 L49,66 L32,53 L53,52 Z" fill="#ffd35c" />
      <path d="M60,42 L64.5,55 L78,55.6 L67,64 L71,77 L60,69.4 L49,77 L53,64 L42,55.6 L55.5,55 Z" fill="#ffe08a" />
      <path d="M92,30 h8 M96,26 v8" stroke="#f5d78e" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M24,76 h7 M27.5,72.5 v7" stroke="#f5d78e" strokeWidth="2.4" strokeLinecap="round" />
    </T>
  ),
  tree: (
    <T bg={NATURE}>
      <rect x="55" y="68" width="10" height="30" rx="4" fill="#8c5b33" />
      <circle cx="44" cy="56" r="17" fill="#4c8a50" />
      <circle cx="76" cy="56" r="17" fill="#4c8a50" />
      <circle cx="60" cy="42" r="21" fill="#5fa463" />
      <circle cx="52" cy="44" r="3.6" fill="#f2554a" />
      <circle cx="70" cy="50" r="3.6" fill="#f2554a" />
      <circle cx="60" cy="60" r="3.6" fill="#f2554a" />
    </T>
  ),
  flower: (
    <T bg={NATURE}>
      <path d="M60,66 q-3,18 0,34" stroke="#4c8a50" strokeWidth="4" strokeLinecap="round" fill="none" />
      <ellipse cx="71" cy="86" rx="10" ry="5" fill="#5fa463" transform="rotate(-28 71 86)" />
      <g fill="#f2695c">
        <circle cx="60" cy="36" r="10.5" />
        <circle cx="74" cy="44" r="10.5" />
        <circle cx="74" cy="60" r="10.5" />
        <circle cx="60" cy="68" r="10.5" />
        <circle cx="46" cy="60" r="10.5" />
        <circle cx="46" cy="44" r="10.5" />
      </g>
      <circle cx="60" cy="52" r="9.5" fill="#ffc94d" />
      <circle cx="57" cy="49" r="1.6" fill="#db9a12" />
      <circle cx="63" cy="50" r="1.6" fill="#db9a12" />
      <circle cx="60" cy="56" r="1.6" fill="#db9a12" />
    </T>
  ),
  mountain: (
    <T bg={NATURE}>
      <circle cx="30" cy="30" r="10" fill="#ffc94d" />
      <path d="M18,94 L52,42 L86,94 Z" fill="#7fa8c9" />
      <path d="M52,42 L62,58 L56,55 L52,62 L47,55 L42,58 Z" fill="#f4f9fc" />
      <path d="M48,94 L78,54 L106,94 Z" fill="#5e86a8" />
      <path d="M78,54 L86,66 L81,64 L78,69 L74,63 L70,66 Z" fill="#f4f9fc" />
      <rect x="14" y="92" width="92" height="5" rx="2.5" fill="#4c8a50" />
    </T>
  ),

  // ---------- خانه ----------
  house: (
    <T bg={HOME}>
      <rect x="74" y="40" width="9" height="16" rx="2" fill="#c14e42" />
      <path d="M28,62 L60,32 L92,62 Z" fill="#d95d4e" />
      <rect x="36" y="60" width="48" height="36" rx="4" fill="#f2a65c" />
      <rect x="54" y="74" width="14" height="22" rx="3" fill="#8c5b33" />
      <circle cx="65" cy="85" r="1.6" fill="#ffc94d" />
      <rect x="42" y="66" width="10" height="10" rx="2" fill="#bfe3f2" />
      <rect x="68" y="66" width="10" height="10" rx="2" fill="#bfe3f2" />
    </T>
  ),
  key: (
    <T bg={HOME}>
      <g transform="rotate(45 60 60)">
        <circle cx="40" cy="60" r="13" fill="none" stroke="#ffc94d" strokeWidth="9" />
        <rect x="50" y="55.5" width="46" height="9" rx="4.5" fill="#ffc94d" />
        <rect x="80" y="62" width="6" height="11" rx="2.5" fill="#ffc94d" />
        <rect x="90" y="62" width="6" height="14" rx="2.5" fill="#ffc94d" />
        <circle cx="40" cy="60" r="4" fill="#e0e8f3" />
      </g>
    </T>
  ),
  clock: (
    <T bg={HOME}>
      <circle cx="60" cy="60" r="29" fill="#ffffff" stroke="#5e86a8" strokeWidth="5" />
      <path d="M60,36 v5 M60,79 v5 M36,60 h5 M79,60 h5" stroke="#a8c4dc" strokeWidth="3" strokeLinecap="round" />
      <path d="M60,60 L60,44" stroke="#2e4a66" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M60,60 L73,66" stroke="#d95d4e" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="60" cy="60" r="3.4" fill="#2e4a66" />
    </T>
  ),
  lamp: (
    <T bg={HOME}>
      <circle cx="60" cy="48" r="27" fill="#ffe9b8" opacity="0.65" />
      <path d="M40,28 L80,28 L72,58 L48,58 Z" fill="#f2695c" />
      <path d="M48,58 L72,58 L70,63 L50,63 Z" fill="#ffe7ad" />
      <rect x="58" y="62" width="4" height="28" fill="#7a4e2d" />
      <ellipse cx="60" cy="93" rx="17" ry="5" fill="#7a4e2d" />
      <path d="M70,50 q6,10 2,18" stroke="#db9a12" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="72" cy="70" r="2.4" fill="#db9a12" />
    </T>
  ),
  chair: (
    <T bg={HOME}>
      <rect x="40" y="28" width="9" height="44" rx="4.5" fill="#c98a5b" />
      <rect x="40" y="62" width="38" height="9" rx="4.5" fill="#c98a5b" />
      <rect x="40" y="70" width="9" height="27" rx="4.5" fill="#a9713f" />
      <rect x="69" y="70" width="9" height="27" rx="4.5" fill="#a9713f" />
      <rect x="46" y="52" width="30" height="12" rx="6" fill="#f2695c" />
    </T>
  ),
  window: (
    <T bg={HOME}>
      <rect x="32" y="30" width="56" height="58" rx="10" fill="#5e86a8" />
      <rect x="38" y="36" width="44" height="46" rx="6" fill="#bfe3f2" />
      <circle cx="49" cy="47" r="7" fill="#ffc94d" />
      <circle cx="66" cy="72" r="6" fill="#ffffff" />
      <circle cx="74" cy="74" r="5" fill="#ffffff" />
      <circle cx="59" cy="74" r="5" fill="#ffffff" />
      <rect x="58" y="36" width="4" height="46" fill="#5e86a8" />
      <rect x="38" y="57" width="44" height="4" fill="#5e86a8" />
      <rect x="27" y="88" width="66" height="6" rx="3" fill="#4a6e8f" />
    </T>
  ),

  // ---------- بدن ----------
  eye: (
    <T bg={BODY}>
      <path d="M36,34 q24,-13 48,0" stroke="#8c5b33" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M24,62 Q60,34 96,62 Q60,90 24,62 Z" fill="#ffffff" />
      <circle cx="60" cy="62" r="14" fill="#5e86a8" />
      <circle cx="60" cy="62" r="7" fill="#20344a" />
      <circle cx="55.5" cy="57" r="3.2" fill="#ffffff" />
      <path d="M32,47 l-5,-5 M88,47 l5,-5 M40,42 l-3,-6 M80,42 l3,-6" stroke="#4a6e8f" strokeWidth="2.6" strokeLinecap="round" />
    </T>
  ),
  hand: (
    <T bg={BODY}>
      <rect x="44" y="38" width="9" height="24" rx="4.5" fill="#f0b993" />
      <rect x="54" y="30" width="9" height="32" rx="4.5" fill="#f0b993" />
      <rect x="64" y="32" width="9" height="30" rx="4.5" fill="#f0b993" />
      <rect x="74" y="40" width="9" height="22" rx="4.5" fill="#f0b993" />
      <rect x="42" y="52" width="40" height="34" rx="15" fill="#f0b993" />
      <ellipse cx="37" cy="66" rx="7" ry="13" fill="#f0b993" transform="rotate(24 37 66)" />
      <rect x="44" y="84" width="36" height="13" rx="6.5" fill="#5fb7d6" />
    </T>
  ),
  heart: (
    <T bg={BODY}>
      <path d="M60,90 C30,68 26,44 44,37 C54,33 60,42 60,47 C60,42 66,33 76,37 C94,44 90,68 60,90 Z" fill="#f2554a" />
      <path d="M44,48 q-4,7 0,14" stroke="#ff9a90" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M88,30 h8 M92,26 v8" stroke="#f291a6" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="30" cy="66" r="2.4" fill="#f291a6" />
    </T>
  ),
  ear: (
    <T bg={BODY}>
      <path d="M58,28 q24,0 24,23 q0,14 -10,20 q-8,5 -8,15 q0,9 -9,9 q-10,0 -10,-12 l0,-32 q0,-23 13,-23 Z" fill="#f0b993" />
      <path d="M57,43 q11,0 11,11 q0,8 -7,13" stroke="#d9926b" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M88,42 q10,15 0,30" stroke="#5fb7d6" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      <path d="M96,35 q14,22 0,44" stroke="#5fb7d6" strokeWidth="3.4" strokeLinecap="round" fill="none" opacity="0.6" />
    </T>
  ),
  tooth: (
    <T bg={BODY}>
      <rect x="38" y="34" width="44" height="36" rx="15" fill="#fff7ea" />
      <rect x="42" y="58" width="15" height="34" rx="7.5" fill="#fff7ea" />
      <rect x="63" y="58" width="15" height="34" rx="7.5" fill="#fff7ea" />
      <path d="M60,52 v14" stroke="#e8dcc4" strokeWidth="3" strokeLinecap="round" />
      <path d="M30,30 h8 M34,26 v8" stroke="#5fb7d6" strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="88" cy="42" r="2.4" fill="#5fb7d6" />
    </T>
  ),
  nose: (
    <T bg={BODY}>
      <path d="M60,30 q4,20 12,34 q8,13 2,23 q-4,7 -14,7 q-10,0 -14,-7 q-6,-10 2,-23 q8,-14 12,-34 Z" fill="#f0b993" />
      <path d="M57,38 q-1,14 -5,24" stroke="#e0a377" strokeWidth="3" strokeLinecap="round" fill="none" />
      <ellipse cx="52" cy="86" rx="4.4" ry="3.2" fill="#d9926b" />
      <ellipse cx="68" cy="86" rx="4.4" ry="3.2" fill="#d9926b" />
      <path d="M40,44 q-8,8 -6,18 M80,44 q8,8 6,18" stroke="#f291a6" strokeWidth="2.6" strokeLinecap="round" fill="none" opacity="0.7" />
    </T>
  ),

  // ---------- سفر و هوا ----------
  car: (
    <T bg={SKY}>
      <path d="M40,62 q3,-17 19,-17 h6 q15,0 19,17 Z" fill="#f2554a" />
      <rect x="47" y="50" width="12" height="11" rx="3" fill="#bfe3f2" />
      <rect x="63" y="50" width="12" height="11" rx="3" fill="#bfe3f2" />
      <rect x="24" y="60" width="72" height="19" rx="9.5" fill="#f2695c" />
      <circle cx="94" cy="66" r="3.2" fill="#ffc94d" />
      <circle cx="41" cy="80" r="9.5" fill="#2e4a66" />
      <circle cx="41" cy="80" r="4" fill="#c7d8e8" />
      <circle cx="81" cy="80" r="9.5" fill="#2e4a66" />
      <circle cx="81" cy="80" r="4" fill="#c7d8e8" />
    </T>
  ),
  boat: (
    <T bg={SKY}>
      <rect x="58" y="28" width="4" height="44" fill="#7a4e2d" />
      <path d="M63,31 L63,66 L86,66 Z" fill="#fff7ea" />
      <path d="M57,35 L57,66 L38,66 Z" fill="#f2695c" />
      <path d="M62,28 l11,4 -11,4 Z" fill="#ffc94d" />
      <path d="M33,68 L87,68 L79,84 L41,84 Z" fill="#c98a5b" />
      <rect x="40" y="71" width="40" height="4" rx="2" fill="#a9713f" />
      <path d="M18,92 q10,-6 21,0 q10,6 21,0 q10,-6 21,0 q10,6 21,0" stroke="#5fb7d6" strokeWidth="3.4" strokeLinecap="round" fill="none" />
    </T>
  ),
  train: (
    <T bg={SKY}>
      <rect x="30" y="30" width="9" height="14" rx="3" fill="#3e8fb0" />
      <circle cx="34" cy="24" r="5" fill="#eaf6fb" opacity="0.9" />
      <circle cx="27" cy="17" r="4" fill="#eaf6fb" opacity="0.7" />
      <rect x="26" y="42" width="62" height="38" rx="10" fill="#5fb7d6" />
      <rect x="30" y="38" width="54" height="9" rx="4.5" fill="#3e8fb0" />
      <rect x="34" y="52" width="13" height="13" rx="3.5" fill="#eaf6fb" />
      <rect x="52" y="52" width="13" height="13" rx="3.5" fill="#eaf6fb" />
      <rect x="70" y="52" width="12" height="13" rx="3.5" fill="#eaf6fb" />
      <circle cx="40" cy="84" r="7.5" fill="#2e4a66" />
      <circle cx="60" cy="84" r="7.5" fill="#2e4a66" />
      <circle cx="78" cy="84" r="7.5" fill="#2e4a66" />
      <rect x="16" y="92" width="88" height="4.5" rx="2.25" fill="#3e8fb0" />
    </T>
  ),
  umbrella: (
    <T bg={SKY}>
      <path d="M24,60 Q24,26 60,26 Q96,26 96,60 q-6,-8 -12,0 q-6,-8 -12,0 q-6,-8 -12,0 q-6,-8 -12,0 q-6,-8 -12,0 q-6,-8 -12,0 Z" fill="#f2695c" />
      <path d="M60,26 L45,60 M60,26 L75,60 M60,26 L60,60" stroke="#d95d4e" strokeWidth="2.4" fill="none" />
      <rect x="58" y="22" width="4" height="64" rx="2" fill="#7a4e2d" />
      <path d="M60,86 q0,11 -10,11 q-8,0 -8,-8" stroke="#7a4e2d" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M28,74 l-3,8 M92,72 l-3,8 M86,88 l-3,8" stroke="#5fb7d6" strokeWidth="3" strokeLinecap="round" />
    </T>
  ),
  cloud: (
    <T bg={SKY}>
      <circle cx="84" cy="40" r="15" fill="#ffc94d" />
      <path d="M30,30 q3,-3 6,0 q3,-3 6,0 M18,44 q3,-3 6,0 q3,-3 6,0" stroke="#4a6e8f" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <circle cx="46" cy="66" r="19" fill="#ffffff" />
      <circle cx="66" cy="55" r="23" fill="#ffffff" />
      <circle cx="86" cy="68" r="16" fill="#ffffff" />
      <rect x="38" y="62" width="56" height="22" rx="11" fill="#ffffff" />
      <path d="M42,80 q22,8 48,0" stroke="#dcebf5" strokeWidth="4" strokeLinecap="round" fill="none" />
    </T>
  ),
  rainbow: (
    <T bg={SKY}>
      <path d="M24,86 A36,36 0 0 1 96,86" stroke="#f2554a" strokeWidth="8" fill="none" />
      <path d="M32,86 A28,28 0 0 1 88,86" stroke="#ffc94d" strokeWidth="8" fill="none" />
      <path d="M40,86 A20,20 0 0 1 80,86" stroke="#5fd6b4" strokeWidth="8" fill="none" />
      <circle cx="22" cy="86" r="9" fill="#ffffff" />
      <circle cx="14" cy="89" r="6" fill="#ffffff" />
      <circle cx="31" cy="90" r="6.5" fill="#ffffff" />
      <circle cx="98" cy="86" r="9" fill="#ffffff" />
      <circle cx="106" cy="89" r="6" fill="#ffffff" />
      <circle cx="89" cy="90" r="6.5" fill="#ffffff" />
    </T>
  ),
};

const FALLBACK: ReactElement = (
  <T bg="#dce9e4">
    <text x="60" y="74" textAnchor="middle" fontSize="44" fontFamily="Vazirmatn" fill="#5d8b83">
      ؟
    </text>
  </T>
);

export function WordArt({ id, className = "" }: { id: string; className?: string }) {
  return <div className={className}>{ART[id] ?? FALLBACK}</div>;
}
