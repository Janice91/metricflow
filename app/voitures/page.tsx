import { Suspense } from "react";
import Catalogue from "./Catalogue";

export const metadata = { title: "Nos voitures \u2014 Driveo" };

export default function Page() {
  return (
    <Suspense fallback={<p className="p-10 text-center text-muted">Chargement&#x2026;</p>}>
      <Catalogue />
    </Suspense>
  );
}
