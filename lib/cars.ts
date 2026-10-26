export type Category = "Berline" | "SUV" | "Sport" | "\u00c9lectrique" | "Van";
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
  photo?: string; // nom du fichier sur Wikimedia Commons (credit photo)
  description: string;
  features: string[];
}

export const CATEGORIES: Category[] = ["Sport", "SUV", "Berline", "\u00c9lectrique", "Van"];
export const FUELS: Fuel[] = ["Essence", "Diesel", "Hybride", "\u00c9lectrique"];

export const CARS: Car[] = [
  {
    id: "lamborghini-urus-performante", photo: "Lamborghini_Urus_Performante_1X7A6803.jpg", brand: "Lamborghini", model: "Urus Performante", category: "SUV", year: 2024,
    pricePerDay: 890, seats: 5, doors: 5, gearbox: "Auto", fuel: "Essence", luggage: 3,
    color: "#F2C200", rating: 5.0, reviews: 62, badge: "Best-seller",
    description: "Le SUV le plus rapide de sa cat\u00e9gorie. V8 biturbo de 666 ch, 0 \u00e0 100 km/h en 3,3 s et un son \u00e0 faire retourner tout le quartier.",
    features: ["V8 biturbo 666 ch", "Mode Corsa", "\u00c9chappement sport", "Cuir Alcantara", "Freins carbone-c\u00e9ramique"],
  },
  {
    id: "chevrolet-corvette-c8", photo: "2021_Chevrolet_Corvette_C8.jpg", brand: "Chevrolet", model: "Corvette C8", category: "Sport", year: 2024,
    pricePerDay: 590, seats: 2, doors: 2, gearbox: "Auto", fuel: "Essence", luggage: 1,
    color: "#1D4ED8", rating: 4.9, reviews: 74, badge: "Coup de c\u0153ur",
    description: "Le V8 am\u00e9ricain passe en position centrale. Look de supercar, 0 \u00e0 100 km/h autour de 3 s et un toit r\u00e9tractable pour entendre le moteur.",
    features: ["V8 6,2 L central", "Toit targa amovible", "\u00c9chappement sport", "Palettes au volant", "Mode Track"],
  },
  {
    id: "ferrari-296-gtb", photo: "Ferrari_296_GTB_Auto_Zuerich_2024_DSC_6405.jpg", brand: "Ferrari", model: "296 GTB", category: "Sport", year: 2024,
    pricePerDay: 1290, seats: 2, doors: 2, gearbox: "Auto", fuel: "Hybride", luggage: 1,
    color: "#DC2626", rating: 5.0, reviews: 38, badge: "Prestige",
    description: "V6 hybride rechargeable de 830 ch. La Ferrari qui allie sensations pures et technologie, pour un week-end inoubliable.",
    features: ["V6 hybride 830 ch", "Mode Qualifying", "Cuir", "\u00c9cran passager", "Suspensions actives"],
  },
  {
    id: "mclaren-720s", photo: "2018_McLaren_720S_V8_S-A_4.0.jpg", brand: "McLaren", model: "720S", category: "Sport", year: 2023,
    pricePerDay: 1190, seats: 2, doors: 2, gearbox: "Auto", fuel: "Essence", luggage: 1,
    color: "#F97316", rating: 4.9, reviews: 29, badge: "Prestige",
    description: "V8 4,0 L biturbo de 720 ch et portes papillon. Une acc\u00e9l\u00e9ration brutale et une tenue de route d'un autre monde.",
    features: ["V8 720 ch", "Portes papillon", "Ch\u00e2ssis carbone", "Mode Track", "Syst\u00e8me audio Bowers & Wilkins"],
  },
  {
    id: "porsche-911-turbo-s", photo: "Porsche_992_Turbo_S_1X7A0411.jpg", brand: "Porsche", model: "911 Turbo S", category: "Sport", year: 2024,
    pricePerDay: 890, seats: 4, doors: 2, gearbox: "Auto", fuel: "Essence", luggage: 2,
    color: "#94A3B8", rating: 4.9, reviews: 81,
    description: "650 ch, transmission int\u00e9grale et 0 \u00e0 100 km/h en 2,7 s. La supercar du quotidien, utilisable tous les jours.",
    features: ["650 ch", "Launch Control", "Int\u00e9grale", "Sport Chrono", "Si\u00e8ges baquets"],
  },
  {
    id: "mercedes-amg-g63", photo: "Mercedes-AMG_G_63_Genf_2018.jpg", brand: "Mercedes-AMG", model: "G 63", category: "SUV", year: 2025,
    pricePerDay: 690, seats: 5, doors: 5, gearbox: "Auto", fuel: "Essence", luggage: 4,
    color: "#111827", rating: 4.9, reviews: 118, badge: "Iconique",
    description: "L'ic\u00f4ne tout-terrain version AMG : V8 biturbo de 585 ch, pr\u00e9sence incroyable et confort de grande routi\u00e8re.",
    features: ["V8 biturbo 585 ch", "Cuir Nappa", "Mode Dynamic", "Si\u00e8ges massants", "Audio Burmester"],
  },
  {
    id: "rolls-royce-cullinan", photo: "2024_Rolls-Royce_Cullinan_%2885818%29.jpg", brand: "Rolls-Royce", model: "Cullinan", category: "SUV", year: 2024,
    pricePerDay: 1490, seats: 5, doors: 5, gearbox: "Auto", fuel: "Essence", luggage: 4,
    color: "#E5E7EB", rating: 5.0, reviews: 26, badge: "Ultra luxe",
    description: "Le SUV de l'ultra luxe. V12 d'un silence absolu, suspensions magiques et finitions faites main.",
    features: ["V12 6,75 L", "Plafond \u00e9toil\u00e9", "Suspension Magic Carpet", "Bar \u00e0 champagne", "Chauffeur en option"],
  },
  {
    id: "bentley-continental-gt", photo: "Bentley_Continental_GT_%284th_gen.%29_IMG_0556.jpg", brand: "Bentley", model: "Continental GT", category: "Berline", year: 2024,
    pricePerDay: 990, seats: 4, doors: 2, gearbox: "Auto", fuel: "Essence", luggage: 2,
    color: "#166534", rating: 4.9, reviews: 44,
    description: "Le grand tourisme britannique par excellence. V8 biturbo de 550 ch, cuir et bois pr\u00e9cieux pour de longs trajets en grand style.",
    features: ["V8 biturbo 550 ch", "Cuir et bois", "Rotating Display", "Audio Naim", "Si\u00e8ges massants"],
  },
  {
    id: "mercedes-maybach-classe-s", photo: "Mercedes-Maybach_Z223_680_1X7A5831.jpg", brand: "Mercedes-Maybach", model: "Classe S", category: "Berline", year: 2025,
    pricePerDay: 1090, seats: 4, doors: 4, gearbox: "Auto", fuel: "Essence", luggage: 3,
    color: "#0B0B0D", rating: 5.0, reviews: 57, badge: "Chauffeur dispo",
    description: "La limousine d'exception. V12 de 612 ch, si\u00e8ges salon et silence royal, avec chauffeur priv\u00e9 en option.",
    features: ["V12 612 ch", "Si\u00e8ges relax", "R\u00e9frig\u00e9rateur", "\u00c9crans arri\u00e8re", "Chauffeur en option"],
  },
  {
    id: "porsche-taycan-turbo-s", photo: "Porsche_Taycan_Turbo_S_IMG_3471.jpg", brand: "Porsche", model: "Taycan Turbo S", category: "\u00c9lectrique", year: 2025,
    pricePerDay: 690, seats: 4, doors: 4, gearbox: "Auto", fuel: "\u00c9lectrique", luggage: 2,
    color: "#3B82F6", rating: 4.9, reviews: 52, badge: "\u00c9co-luxe",
    description: "761 ch en 100 % \u00e9lectrique et 0 \u00e0 100 km/h en 2,4 s. Une berline de sport silencieuse et redoutable.",
    features: ["761 ch", "Launch Control", "Recharge ultra-rapide", "Suspension pneumatique", "Audio Burmester"],
  },
  {
    id: "tesla-model-s-plaid", photo: "Tesla_Model_S_Plaid_Autofr%C3%BChling_Ulm_IMG_9321.jpg", brand: "Tesla", model: "Model S Plaid", category: "\u00c9lectrique", year: 2025,
    pricePerDay: 590, seats: 5, doors: 4, gearbox: "Auto", fuel: "\u00c9lectrique", luggage: 3,
    color: "#F8FAFC", rating: 4.8, reviews: 97, badge: "Tendance",
    description: "1 020 ch et 0 \u00e0 100 km/h en 2,1 s. La berline \u00e9lectrique la plus rapide du monde, avec une autonomie XXL.",
    features: ["1 020 ch", "Autopilot", "Toit en verre", "Supercharge", "\u00c9cran 17\""],
  },
  {
    id: "mercedes-classe-v-vip", photo: "2023_Mercedes-Benz_V-Class_300d_%28W447%29_IMG_9812.jpg", brand: "Mercedes", model: "Classe V VIP", category: "Van", year: 2025,
    pricePerDay: 390, seats: 6, doors: 5, gearbox: "Auto", fuel: "Diesel", luggage: 5,
    color: "#475569", rating: 4.8, reviews: 63,
    description: "Le van de luxe pour 6 personnes. Si\u00e8ges capitaine en cuir, table et ambiance salon, id\u00e9al pour mariages, \u00e9v\u00e9nements et voyages en groupe.",
    features: ["6 si\u00e8ges capitaine", "Table centrale", "Mini-bar", "Vitres teint\u00e9es", "Chauffeur en option"],
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
