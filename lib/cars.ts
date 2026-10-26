export type Category = "Citadine" | "Berline" | "SUV" | "Sport" | "\u00c9lectrique" | "Van";
export type Fuel = "Essence" | "Diesel" | "Hybride" | "\u00c9lectrique";

export interface Car {
  id: string;
  brand: string;
  model: string;
  category: Category;
  year: number;
  pricePerDay: number;
  seats: number;
  doors: number;
  gearbox: "Auto" | "Manuelle";
  fuel: Fuel;
  luggage: number;
  color: string; // couleur de la voiture (illustration)
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  features: string[];
}

export const CATEGORIES: Category[] = ["Citadine", "Berline", "SUV", "Sport", "\u00c9lectrique", "Van"];
export const FUELS: Fuel[] = ["Essence", "Diesel", "Hybride", "\u00c9lectrique"];

export const CARS: Car[] = [
  {
    id: "peugeot-208", brand: "Peugeot", model: "208", category: "Citadine", year: 2024,
    pricePerDay: 39, seats: 5, doors: 5, gearbox: "Manuelle", fuel: "Essence", luggage: 2,
    color: "#E11D48", rating: 4.6, reviews: 214, badge: "Petit prix",
    description: "La citadine parfaite pour se faufiler en ville et partir en week-end sans se ruiner. Sobre, agile et tr\u00e8s facile \u00e0 garer.",
    features: ["Climatisation", "Bluetooth", "Cam\u00e9ra de recul", "R\u00e9gulateur de vitesse", "Apple CarPlay"],
  },
  {
    id: "renault-clio", brand: "Renault", model: "Clio", category: "Citadine", year: 2024,
    pricePerDay: 37, seats: 5, doors: 5, gearbox: "Manuelle", fuel: "Diesel", luggage: 2,
    color: "#F59E0B", rating: 4.5, reviews: 301,
    description: "Un classique fiable et \u00e9conomique. Id\u00e9ale pour les trajets du quotidien comme pour les petites escapades.",
    features: ["Climatisation", "Bluetooth", "GPS", "Prise USB", "Aide au stationnement"],
  },
  {
    id: "fiat-500e", brand: "Fiat", model: "500e", category: "\u00c9lectrique", year: 2025,
    pricePerDay: 49, seats: 4, doors: 3, gearbox: "Auto", fuel: "\u00c9lectrique", luggage: 1,
    color: "#34D399", rating: 4.7, reviews: 96, badge: "\u00c9co",
    description: "Petite, styl\u00e9e et 100 % \u00e9lectrique. Autonomie parfaite pour la ville, z\u00e9ro \u00e9mission et un look irr\u00e9sistible.",
    features: ["Climatisation auto", "Bluetooth", "\u00c9cran tactile", "Recharge rapide", "Apple CarPlay"],
  },
  {
    id: "vw-golf", brand: "Volkswagen", model: "Golf", category: "Berline", year: 2024,
    pricePerDay: 55, seats: 5, doors: 5, gearbox: "Auto", fuel: "Essence", luggage: 3,
    color: "#3B82F6", rating: 4.7, reviews: 187,
    description: "La compacte polyvalente par excellence : confortable sur autoroute, agr\u00e9able en ville, coffre g\u00e9n\u00e9reux.",
    features: ["Bo\u00eete automatique", "Climatisation auto", "GPS", "Bluetooth", "R\u00e9gulateur adaptatif"],
  },
  {
    id: "bmw-serie-3", brand: "BMW", model: "S\u00e9rie 3", category: "Berline", year: 2025,
    pricePerDay: 89, seats: 5, doors: 4, gearbox: "Auto", fuel: "Diesel", luggage: 3,
    color: "#1E293B", rating: 4.9, reviews: 142, badge: "Premium",
    description: "Le plaisir de conduite \u00e0 l'allemande. Une berline \u00e9l\u00e9gante et dynamique pour les voyages d'affaires ou les grandes occasions.",
    features: ["Cuir", "Toit ouvrant", "GPS Pro", "Si\u00e8ges chauffants", "Audio Harman Kardon"],
  },
  {
    id: "mercedes-classe-c", brand: "Mercedes", model: "Classe C", category: "Berline", year: 2025,
    pricePerDay: 95, seats: 5, doors: 4, gearbox: "Auto", fuel: "Hybride", luggage: 3,
    color: "#94A3B8", rating: 4.9, reviews: 128, badge: "Premium",
    description: "Le luxe discret. Habitacle raffin\u00e9, technologie de pointe et motorisation hybride pour rouler avec \u00e9l\u00e9gance.",
    features: ["Cuir", "\u00c9cran MBUX", "\u00c9clairage d'ambiance", "Cam\u00e9ra 360\u00b0", "Si\u00e8ges massants"],
  },
  {
    id: "dacia-duster", brand: "Dacia", model: "Duster", category: "SUV", year: 2024,
    pricePerDay: 52, seats: 5, doors: 5, gearbox: "Manuelle", fuel: "Diesel", luggage: 4,
    color: "#65A30D", rating: 4.5, reviews: 256, badge: "Best-seller",
    description: "Le SUV robuste et abordable. Garde au sol g\u00e9n\u00e9reuse, grand coffre : parfait pour la famille et les routes moins sages.",
    features: ["4x4 disponible", "Climatisation", "Barres de toit", "Bluetooth", "Cam\u00e9ra de recul"],
  },
  {
    id: "toyota-rav4", brand: "Toyota", model: "RAV4", category: "SUV", year: 2025,
    pricePerDay: 79, seats: 5, doors: 5, gearbox: "Auto", fuel: "Hybride", luggage: 4,
    color: "#0EA5E9", rating: 4.8, reviews: 173,
    description: "Hybride, spacieux et ultra-fiable. Consommation ma\u00eetris\u00e9e et confort de route pour toute la famille.",
    features: ["Bo\u00eete automatique", "GPS", "Aide \u00e0 la conduite", "Hayon \u00e9lectrique", "Apple CarPlay"],
  },
  {
    id: "tesla-model-3", brand: "Tesla", model: "Model 3", category: "\u00c9lectrique", year: 2025,
    pricePerDay: 99, seats: 5, doors: 4, gearbox: "Auto", fuel: "\u00c9lectrique", luggage: 3,
    color: "#F8FAFC", rating: 4.8, reviews: 164, badge: "Tendance",
    description: "La r\u00e9f\u00e9rence de l'\u00e9lectrique. Acc\u00e9l\u00e9rations fulgurantes, grande autonomie et technologie embarqu\u00e9e bluffante.",
    features: ["Autopilot", "Toit panoramique", "Supercharge", "\u00c9cran 15\"", "Audio premium"],
  },
  {
    id: "porsche-911", brand: "Porsche", model: "911 Carrera", category: "Sport", year: 2024,
    pricePerDay: 349, seats: 4, doors: 2, gearbox: "Auto", fuel: "Essence", luggage: 1,
    color: "#FACC15", rating: 5.0, reviews: 48, badge: "Prestige",
    description: "Le mythe. Une exp\u00e9rience de conduite inoubliable pour un week-end d'exception ou une occasion sp\u00e9ciale.",
    features: ["Mode Sport+", "Cuir", "\u00c9chappement sport", "Chrono Pack", "Si\u00e8ges baquets"],
  },
  {
    id: "audi-r8", brand: "Audi", model: "R8", category: "Sport", year: 2024,
    pricePerDay: 429, seats: 2, doors: 2, gearbox: "Auto", fuel: "Essence", luggage: 1,
    color: "#DC2626", rating: 5.0, reviews: 31, badge: "Prestige",
    description: "Un V10 en position centrale et un son d'enfer. Pour ceux qui veulent marquer les esprits.",
    features: ["V10 5.2L", "Quattro", "Cuir Nappa", "Virtual Cockpit", "Mode Performance"],
  },
  {
    id: "vw-multivan", brand: "Volkswagen", model: "Multivan", category: "Van", year: 2025,
    pricePerDay: 109, seats: 7, doors: 5, gearbox: "Auto", fuel: "Hybride", luggage: 6,
    color: "#6366F1", rating: 4.8, reviews: 89,
    description: "Jusqu'\u00e0 7 passagers dans un confort de salon. Id\u00e9al pour les vacances en groupe ou les d\u00e9m\u00e9nagements.",
    features: ["7 places", "Portes coulissantes", "Table modulable", "Climatisation 3 zones", "GPS"],
  },
];

export function getCar(id: string): Car | undefined {
  return CARS.find((c) => c.id === id);
}

export interface Agency {
  id: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  airport?: boolean;
}

export const AGENCIES: Agency[] = [
  { id: "paris", city: "Paris", address: "12 rue de Rivoli, 75001", phone: "01 80 00 00 01", hours: "7h \u2013 22h, 7j/7" },
  { id: "paris-cdg", city: "Paris CDG", address: "A\u00e9roport Roissy \u2013 Terminal 2", phone: "01 80 00 00 02", hours: "24h/24", airport: true },
  { id: "lyon", city: "Lyon", address: "5 place Bellecour, 69002", phone: "04 80 00 00 03", hours: "8h \u2013 20h, 7j/7" },
  { id: "marseille", city: "Marseille", address: "Gare Saint-Charles, 13001", phone: "04 80 00 00 04", hours: "8h \u2013 20h, 7j/7" },
  { id: "nice", city: "Nice", address: "A\u00e9roport Nice C\u00f4te d'Azur", phone: "04 80 00 00 05", hours: "6h \u2013 23h, 7j/7", airport: true },
  { id: "bordeaux", city: "Bordeaux", address: "Gare Saint-Jean, 33800", phone: "05 80 00 00 06", hours: "8h \u2013 20h, 7j/7" },
];
