import type { Category } from "@/lib/cars";

// Illustration vectorielle d'une voiture vue de c?t?, color?e selon la voiture.
export default function CarIllustration({ color, category, className = "" }: { color: string; category: Category; className?: string }) {
  const body: Record<string, string> = {
    Citadine: "M30 120 L40 96 Q48 80 70 76 L118 72 Q140 50 175 48 L225 48 Q262 50 282 74 L322 82 Q348 88 352 112 L356 128 L30 128 Z",
    Berline: "M20 122 L32 100 Q42 88 70 84 L125 80 Q155 54 200 52 L250 52 Q285 54 305 80 L350 88 Q376 94 380 114 L382 128 L20 128 Z",
    SUV: "M24 128 L30 92 Q36 76 62 72 L110 68 Q125 44 165 40 L260 40 Q296 42 312 70 L350 76 Q374 80 378 104 L380 128 Z",
    Sport: "M16 124 L30 106 Q48 94 90 90 L150 84 Q190 56 232 58 Q270 60 296 84 L352 92 Q382 98 386 118 L386 128 L16 128 Z",
    "\u00c9lectrique": "M24 124 L36 98 Q46 82 74 78 L128 74 Q158 48 202 48 L252 48 Q288 50 306 78 L350 84 Q376 90 380 112 L382 128 L24 128 Z",
    Van: "M20 128 L24 70 Q26 50 50 46 L290 44 Q318 46 330 70 L366 86 Q384 94 386 112 L388 128 Z",
  };
  const win: Record<string, string> = {
    Citadine: "M130 76 Q148 58 176 56 L222 56 Q250 58 266 76 Z",
    Berline: "M138 82 Q162 60 200 58 L248 58 Q276 60 292 82 Z",
    SUV: "M124 70 Q136 50 168 48 L258 48 Q284 50 298 70 Z",
    Sport: "M156 86 Q190 64 232 64 Q262 66 282 86 Z",
    "\u00c9lectrique": "M136 76 Q160 56 202 54 L250 54 Q278 56 294 76 Z",
    Van: "M44 70 L50 56 L286 54 Q306 56 316 72 Z",
  };
  const c = body[category] ?? body.Berline;
  const w = win[category] ?? win.Berline;
  return (
    <svg viewBox="0 0 400 170" className={className} role="img" aria-label="Illustration de la voiture">
      <ellipse cx="205" cy="152" rx="170" ry="9" fill="#0b1220" opacity=".13" />
      <path d={c} fill={color} />
      <path d={c} fill="url(#shine)" />
      <path d={w} fill="#0b1220" opacity=".78" />
      <path d={w} fill="url(#glass)" />
      <rect x="196" y="58" width="3" height="68" fill="#0b1220" opacity=".25" />
      <rect x="350" y="106" width="30" height="7" rx="3" fill="#fde68a" />
      <rect x="22" y="104" width="18" height="6" rx="3" fill="#ef4444" />
      {[100, 300].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="128" r="27" fill="#0b1220" />
          <circle cx={cx} cy="128" r="15" fill="#cbd5e1" />
          <circle cx={cx} cy="128" r="5" fill="#475569" />
        </g>
      ))}
      <defs>
        <linearGradient id="shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".35" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".25" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7dd3fc" stopOpacity=".5" />
          <stop offset="1" stopColor="#7dd3fc" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
