"use client";
import { createContext, useContext, useMemo } from "react";
import { buildCatalog, type Catalog, type CatalogData } from "./catalogMap";

const Ctx = createContext<Catalog | null>(null);

// Donne les voitures et les agences a tous les composants du site.
export function CatalogProvider({ initial, children }: { initial: CatalogData; children: React.ReactNode }) {
  const value = useMemo(() => buildCatalog(initial), [initial]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCatalog(): Catalog {
  const c = useContext(Ctx);
  if (!c) throw new Error("CatalogProvider manquant");
  return c;
}
