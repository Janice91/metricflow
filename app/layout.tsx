import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Driveo \u2014 Location de voiture simple et transparente",
  description: "Louez la voiture id\u00e9ale en quelques clics : citadines, SUV, \u00e9lectriques, sportives. Prix clairs, agences partout en France.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="flex min-h-screen flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
