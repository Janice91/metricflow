export interface Option {
  id: string;
  label: string;
  desc: string;
  price: number; // par jour
}

export const OPTIONS: Option[] = [
  { id: "insurance", label: "Assurance tous risques", desc: "Franchise r\u00e9duite \u00e0 0 \u20ac", price: 12 },
  { id: "driver", label: "Conducteur additionnel", desc: "Partagez le volant", price: 7 },
  { id: "gps", label: "GPS embarqu\u00e9", desc: "Cartes \u00e0 jour, Europe", price: 5 },
  { id: "seat", label: "Si\u00e8ge b\u00e9b\u00e9 / rehausseur", desc: "Homologu\u00e9, install\u00e9", price: 6 },
  { id: "wifi", label: "Wi-Fi 4G illimit\u00e9", desc: "Jusqu'\u00e0 5 appareils", price: 8 },
];

export function daysBetween(start: string, end: string): number {
  if (!start || !end) return 0;
  const a = new Date(start + "T00:00:00").getTime();
  const b = new Date(end + "T00:00:00").getTime();
  const d = Math.round((b - a) / 86400000);
  return d > 0 ? d : 0;
}

export interface Quote {
  days: number;
  base: number;
  discount: number;
  discountPct: number;
  options: number;
  total: number;
}

// Remise longue dur?e : 5% d?s 3 jours, 10% d?s 7 jours, 15% d?s 14 jours
export function discountRate(days: number): number {
  if (days >= 14) return 0.15;
  if (days >= 7) return 0.1;
  if (days >= 3) return 0.05;
  return 0;
}

export function quote(pricePerDay: number, days: number, optionIds: string[]): Quote {
  const base = pricePerDay * days;
  const rate = discountRate(days);
  const discount = Math.round(base * rate);
  const optionsTotal = OPTIONS.filter((o) => optionIds.includes(o.id)).reduce((s, o) => s + o.price * days, 0);
  return { days, base, discount, discountPct: Math.round(rate * 100), options: optionsTotal, total: base - discount + optionsTotal };
}

export const eur = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export function todayISO(offset = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function fmtDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso + "T00:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}
