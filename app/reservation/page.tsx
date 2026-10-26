import { Suspense } from "react";
import Checkout from "./Checkout";

export const metadata = { title: "R\u00e9servation \u2014 Driveo" };

export default function Page() {
  return (
    <Suspense fallback={<p className="p-10 text-center text-muted">Chargement&#x2026;</p>}>
      <Checkout />
    </Suspense>
  );
}
