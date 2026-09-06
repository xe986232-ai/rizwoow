import { SVGProps } from "react";

/**
 * Icon set sourced from tech-stack-breakdown.md — original SVG code,
 * recolored via currentColor / project design tokens (no external icon
 * packs used for these specific icons).
 */

/** Section Arrow — points left by default; rotate 180deg for "next". */
export function SectionArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M5 12H19M5 12L11 18M5 12L11 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Tile Waveform — mini waveform preview, used on product/sample cards. */
export function TileWaveformIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.66669 9.77865L2.66669 6.22309M5.33335 12.4453L5.33335 3.55642M8.00002 10.4453L8.00002 5.55642M10.6667 11.112L10.6667 4.88976M13.3334 9.11198L13.3334 6.88976"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Play Button (Filled) — solid triangle, used to trigger audio playback. */
export function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M29.1261 24.0888C28.1569 23.4925 26.9092 24.1897 26.9092 25.3276V39.5155C26.9092 40.6535 28.1569 41.3507 29.126 40.7543L40.6537 33.6604C41.5767 33.0924 41.5767 31.7508 40.6537 31.1828L29.1261 24.0888Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PauseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <rect x="24.5" y="24" width="6" height="17" rx="1.5" fill="currentColor" />
      <rect x="33.5" y="24" width="6" height="17" rx="1.5" fill="currentColor" />
    </svg>
  );
}

/** Equalizer / Sound Bars — two rounded vertical bars; doubles as pause icon. */
export function EqualizerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="512"
      height="512"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        fill="currentColor"
        d="M120.16 45A20.162 20.162 0 0 0 100 65.16v381.68A20.162 20.162 0 0 0 120.16 467h65.68A20.162 20.162 0 0 0 206 446.84V65.16A20.162 20.162 0 0 0 185.84 45h-65.68zm206 0A20.162 20.162 0 0 0 306 65.16v381.68A20.162 20.162 0 0 0 326.16 467h65.68A20.162 20.162 0 0 0 412 446.84V65.16A20.162 20.162 0 0 0 391.84 45h-65.68z"
      />
    </svg>
  );
}

/** Settings / Adjust (Wave + Circle) — filters, preferences. */
export function SettingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M22.1667 19.8344C23.2496 19.8344 24.2882 19.4042 25.054 18.6384C25.8198 17.8726 26.25 16.834 26.25 15.751C26.25 14.6681 25.8198 13.6295 25.054 12.8637C24.2882 12.0979 23.2496 11.6677 22.1667 11.6677H21C21.1702 10.9093 21.1728 10.1282 21.0076 9.3689C20.8424 8.60962 20.5127 7.88705 20.0372 7.24246C19.5617 6.59786 18.9499 6.04387 18.2365 5.6121C17.5231 5.18033 16.7223 4.87925 15.8796 4.72604C15.037 4.57283 14.169 4.5705 13.3254 4.71917C12.4817 4.86785 11.6789 5.16462 10.9627 5.59254C9.51621 6.45677 8.51045 7.80275 8.16665 9.33438C6.92293 9.28456 5.69978 9.64984 4.70664 10.3677C3.71349 11.0855 3.01212 12.1113 2.72261 13.2693C2.4331 14.4274 2.57346 15.6457 3.11965 16.7156C3.66585 17.7856 4.58392 18.6406 5.71665 19.1344M14 14.0008V24.5008M17.5 21.0008L14 24.5008L10.5 21.0008"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Chevron Right — small caret used in breadcrumbs and inline navigation. */
export function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M9 6l6 6l-6 6" />
    </svg>
  );
}

/** Heart Plus — outline heart with a plus, used for "add to wishlist". */
export function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 20l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.96 6.053" />
      <path d="M16 19h6" />
      <path d="M19 16v6" />
    </svg>
  );
}

/** Flame — used to mark "Featured" tags. */
export function FlameIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 10.941c2.333 -3.308 .167 -7.823 -1 -8.941c0 3.395 -2.235 5.299 -3.667 6.706c-1.43 1.408 -2.333 3.294 -2.333 5.588c0 3.704 3.134 6.706 7 6.706c3.866 0 7 -3.002 7 -6.706c0 -1.712 -1.232 -4.403 -2.333 -5.588c-2.084 3.353 -3.257 3.353 -4.667 2.235" />
    </svg>
  );
}

/** Download — cloud with arrow, used on the primary download button. */
export function DownloadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M22.1667 19.8344C23.2496 19.8344 24.2882 19.4042 25.054 18.6384C25.8198 17.8726 26.25 16.834 26.25 15.751C26.25 14.6681 25.8198 13.6295 25.054 12.8637C24.2882 12.0979 23.2496 11.6677 22.1667 11.6677H21C21.1702 10.9093 21.1728 10.1282 21.0076 9.3689C20.8424 8.60962 20.5127 7.88705 20.0372 7.24246C19.5617 6.59786 18.9499 6.04387 18.2365 5.6121C17.5231 5.18033 16.7223 4.87925 15.8796 4.72604C15.037 4.57283 14.169 4.5705 13.3254 4.71917C12.4817 4.86785 11.6789 5.16462 10.9627 5.59254C9.51621 6.45677 8.51045 7.80275 8.16665 9.33438C6.92293 9.28456 5.69978 9.64984 4.70664 10.3677C3.71349 11.0855 3.01212 12.1113 2.72261 13.2693C2.4331 14.4274 2.57346 15.6457 3.11965 16.7156C3.66585 17.7856 4.58392 18.6406 5.71665 19.1344M14 14.0008V24.5008M17.5 21.0008L14 24.5008L10.5 21.0008" />
    </svg>
  );
}

/** Search — magnifying glass, used on filter/search triggers. */
export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M16.25 16.25L12.0833 12.0833M3.75 8.6111C3.75 10.1584 4.36528 11.6425 5.4592 12.7364C6.55311 13.8303 8.03716 14.4456 9.58447 14.4456C11.1318 14.4456 12.6158 13.8303 13.7097 12.7364C14.8037 11.6425 15.4189 10.1584 15.4189 8.6111C15.4189 7.06378 14.8037 5.57974 13.7097 4.48582C12.6158 3.3919 11.1318 2.77661 9.58447 2.77661C8.03716 2.77661 6.55311 3.3919 5.4592 4.48582C4.36528 5.57974 3.75 7.06378 3.75 8.6111Z"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Loop — five bars of varying height, marks loop-type samples. */
export function LoopIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M18.6668 11.1666C18.463 9.7001 17.7827 8.3413 16.7307 7.2995C15.6787 6.25769 14.3133 5.59068 12.8449 5.40121C11.3765 5.21174 9.88651 5.51032 8.6045 6.25096C7.32248 6.99159 6.31954 8.1332 5.75016 9.49992M5.3335 6.16658V9.49992H8.66683M5.3335 12.8333C5.5373 14.2998 6.21761 15.6586 7.26963 16.7004C8.32166 17.7422 9.68703 18.4092 11.1554 18.5987C12.6238 18.7881 14.1138 18.4896 15.3958 17.7489C16.6778 17.0083 17.6808 15.8667 18.2502 14.5M18.6668 17.8333V14.5H15.3335"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** One Shot — four vertical ticks, marks single-hit samples. */
export function OneShotIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M4 12H6M8 8V16M12 5V19M16 8V16M18 12H20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Chevron Down — small caret, used on dropdown/filter triggers. */
export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Samples Tab — five bars of varying height (20x20), used on the "Samples" tab trigger. */
export function SamplesTabIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M3.33331 12.2214L3.33331 7.77691M6.66665 15.5547L6.66665 4.44358M9.99998 13.0547L9.99998 6.94358M13.3333 13.888L13.3333 6.11024M16.6666 11.388L16.6666 8.61024"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Menu / List — 3 horizontal lines, used for nav menu / row options. */
export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M5.33337 7H18.6667M5.33337 12H18.6667M5.33337 17H18.6667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Check — small tick mark, used inside the multi-select checkbox. */
export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M6 10L9 13L14 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Similar Sounds — two overlapping squares, used for "find similar" actions. */
export function SimilarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M7.5 12.5L12.5 7.5M6.5 5C6.5 4.4477 6.719 3.919 7.109 3.529C7.499 3.139 8.028 2.92 8.58 2.92H14.42C14.972 2.92 15.501 3.139 15.891 3.529C16.281 3.919 16.5 4.4477 16.5 5V10.84C16.5 11.392 16.281 11.921 15.891 12.311C15.501 12.701 14.972 12.92 14.42 12.92H8.58C8.028 12.92 7.499 12.701 7.109 12.311C6.719 11.921 6.5 11.392 6.5 10.84V5ZM3.5 8C3.5 7.4477 3.719 6.919 4.109 6.529C4.499 6.139 5.028 5.92 5.58 5.92H11.42C11.972 5.92 12.501 6.139 12.891 6.529C13.281 6.919 13.5 7.4477 13.5 8V13.84C13.5 14.392 13.281 14.921 12.891 15.311C12.501 15.701 11.972 15.92 11.42 15.92H5.58C5.028 15.92 4.499 15.701 4.109 15.311C3.719 14.921 3.5 14.392 3.5 13.84V8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Tempo — sparkle-style diamond, used for "change tempo" actions. */
export function TempoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M13.24 6.76C14.1 7.62 14.58 8.78 14.58 10C14.58 11.22 14.1 12.38 13.24 13.24C12.38 14.1 11.22 14.58 10 14.58C8.78 14.58 7.62 14.1 6.76 13.24C5.9 12.38 5.42 11.22 5.42 10C5.42 8.78 5.9 7.62 6.76 6.76C7.62 5.9 8.78 5.42 10 5.42C11.22 5.42 12.38 5.9 13.24 6.76ZM13.24 6.76L10 10M2.5 10H2.51M17.5 10H17.51M10 2.5V2.51M10 17.5V17.51M4.67 4.67L4.66 4.66M15.35 4.67L15.34 4.66M15.34 15.34L15.35 15.35M4.66 15.34L4.67 15.35"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Provider — head-and-shoulders silhouette, used for "view provider" links. */
export function ProviderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M5 17.5V15.83C5 14.95 5.35 14.1 5.98 13.48C6.6 12.85 7.45 12.5 8.33 12.5H11.67C12.55 12.5 13.4 12.85 14.02 13.48C14.65 14.1 15 14.95 15 15.83V17.5M6.67 5.83C6.67 6.72 7.02 7.57 7.64 8.19C8.27 8.82 9.12 9.17 10 9.17C10.88 9.17 11.73 8.82 12.36 8.19C12.98 7.57 13.33 6.72 13.33 5.83C13.33 4.95 12.98 4.1 12.36 3.48C11.73 2.85 10.88 2.5 10 2.5C9.12 2.5 8.27 2.85 7.64 3.48C7.02 4.1 6.67 4.95 6.67 5.83Z"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Collection — folder with a plus, used for "add to collection" actions. */
export function CollectionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.5 6.25C2.5 5.58696 2.76339 4.95107 3.23223 4.48223C3.70107 4.01339 4.33696 3.75 5 3.75H8.33L10 5.83H15C15.663 5.83 16.2989 6.09339 16.7678 6.56223C17.2366 7.03107 17.5 7.667 17.5 8.33V13.75C17.5 14.413 17.2366 15.049 16.7678 15.5178C16.2989 15.9866 15.663 16.25 15 16.25H5C4.33696 16.25 3.70107 15.9866 3.23223 15.5178C2.76339 15.049 2.5 14.413 2.5 13.75V6.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 9.58V13.75M7.92 11.67H12.08"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Flag — outline pennant, used for "report" actions. */
export function FlagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9" />
      <path d="M5 21v-7" />
    </svg>
  );
}

/** Instagram — outline camera/ring mark, used for social links. */
export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M16.5 7.5h.01" />
    </svg>
  );
}

/** TikTok — outline note/wave mark, used for social links. */
export function TiktokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

/** YouTube — outline play mark, used for social links. */
export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M11 10.5v3l3 -1.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** X (Twitter) — outline crossed-strokes mark, used for social links. */
export function XSocialIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 4l16 16" />
      <path d="M20 4l-16 16" />
    </svg>
  );
}
