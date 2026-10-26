export interface Booking {
  ref: string;
  carId: string;
  pickup: string;
  dropoff: string;
  start: string;
  end: string;
  options: string[];
  total: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

const KEY = "driveo_bookings";

export function loadBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Booking[]) : [];
  } catch {
    return [];
  }
}

export function saveBooking(b: Booking) {
  try {
    const all = loadBookings();
    all.unshift(b);
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    /* stockage indisponible */
  }
}

export function cancelBooking(ref: string) {
  try {
    localStorage.setItem(KEY, JSON.stringify(loadBookings().filter((b) => b.ref !== ref)));
  } catch {
    /* ignore */
  }
}

export function newRef(): string {
  return "DRV-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}
