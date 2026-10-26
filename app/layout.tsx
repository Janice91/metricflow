import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Driveo \u2014 Location de voitures de luxe",
  description: "Louez Lamborghini Urus, Corvette C8, Ferrari, Rolls-Royce et plus. Prix clairs, assurance premium incluse, agences partout en France.",
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
