import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CatalogProvider } from "@/lib/catalog";
import { getCatalog } from "@/lib/serverCatalog";

export const metadata: Metadata = {
  title: "Driveo \u2014 Location de voitures de luxe",
  description: "Louez Lamborghini Urus, Corvette C8, Ferrari, Rolls-Royce et plus. Prix clairs, assurance premium incluse, agences partout en France.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const c = await getCatalog();
  const initial = { allCars: c.allCars, allAgencies: c.allAgencies, carsFromDb: c.carsFromDb, agenciesFromDb: c.agenciesFromDb };
  return (
    <html lang="fr">
      <body className="flex min-h-screen flex-col antialiased">
        <CatalogProvider initial={initial}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CatalogProvider>
      </body>
    </html>
  );
}
