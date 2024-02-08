import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./SectionCard.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "SectionCard.tsx", path: "components/layout/cards/SectionCard.tsx", demos: demos || [] };

export default mod;
