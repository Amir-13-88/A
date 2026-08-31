import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size?: number) => ({
  width: size ?? 20,
  height: size ?? 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/** لوگو: جعبهٔ کارت‌های لایتنر */
export const LogoIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="9" width="13" height="11" rx="2.5" fill="currentColor" opacity="0.28" stroke="none" />
    <rect x="6" y="6" width="14" height="12" rx="2.5" fill="currentColor" opacity="0.55" stroke="none" />
    <rect x="9" y="3" width="12" height="12" rx="2.5" fill="currentColor" stroke="none" />
    <path d="M12.5 9.5l1.4 1.4 2.6-2.9" stroke="#07211f" strokeWidth="2" />
  </svg>
);

export const ReviewIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="2.5" y="6" width="13" height="15" rx="3" />
    <path d="M19 8.5A10.5 10.5 0 0 1 19 15" opacity="0.5" />
    <path d="M6.5 11.5h5M6.5 15h3.5" />
  </svg>
);

export const BoxIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M3.5 8 12 3.5 20.5 8v8L12 20.5 3.5 16Z" />
    <path d="M3.5 8 12 12.2 20.5 8M12 12.2v8.3" />
  </svg>
);

export const BookIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 6.5C10 4.8 7 4.5 4 5v13.5c3-.5 6-.2 8 1.5 2-1.7 5-2 8-1.5V5c-3-.5-6-.2-8 1.5Z" />
    <path d="M12 6.5V20" />
  </svg>
);

export const PlayIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M11 5.5 6.5 9H4v6h2.5L11 18.5Z" fill="currentColor" stroke="currentColor" strokeWidth="1.6" />
    <path d="M15 9.5a4 4 0 0 1 0 5M17.8 7a8 8 0 0 1 0 10" />
  </svg>
);

export const PlusIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const CheckIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4.5 12.5 10 18 19.5 6.5" />
  </svg>
);

export const TrashIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4.5 6.5h15M9.5 6V4.5a1.5 1.5 0 0 1 1.5-1.5h2a1.5 1.5 0 0 1 1.5 1.5V6M6.5 6.5l1 12.2a2 2 0 0 0 2 1.8h5a2 2 0 0 0 2-1.8l1-12.2" />
    <path d="M10 10.5v6M14 10.5v6" />
  </svg>
);

export const SearchIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </svg>
);

export const FlameIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path
      d="M12 21c3.9 0 6.5-2.5 6.5-6 0-3-2-5-3.5-6.5C13.5 7 13 5 13.5 3c-3 1.5-4.6 4-4.4 6.6-.9-.4-1.5-1.2-1.8-2.2-1.2 1.4-1.8 3.2-1.8 5.1 0 4 2.6 6.5 6.5 6.5Z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

export const CloseIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ArrowIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const SparkIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4Z" fill="currentColor" stroke="none" />
    <path d="M19 16l.9 2.6L22.5 19l-2.6.9L19 22.5l-.9-2.6L15.5 19l2.6-.4Z" fill="currentColor" stroke="none" opacity="0.7" />
  </svg>
);

export const CalendarIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="3.5" y="5" width="17" height="16" rx="3" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);

export const RepeatIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 9a6.5 6.5 0 0 1 11-3.4L17.5 8M20 15a6.5 6.5 0 0 1-11 3.4L6.5 16" />
    <path d="M17.5 4v4h-4M6.5 20v-4h4" />
  </svg>
);

export const EyeIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
