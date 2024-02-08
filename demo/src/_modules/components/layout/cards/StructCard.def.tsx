import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./StructCard.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "StructCard.tsx", path: "components/layout/cards/StructCard.tsx", demos: demos || [] };

export default mod;
