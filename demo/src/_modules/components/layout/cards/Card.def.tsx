import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Card.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Card.tsx", path: "components/layout/cards/Card.tsx", demos: demos || [] };

export default mod;
