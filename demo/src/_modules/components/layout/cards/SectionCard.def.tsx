import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./SectionCard.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "SectionCard.tsx", path: "components/layout/cards/SectionCard.tsx", demos: demos || [] };

export default mod;
