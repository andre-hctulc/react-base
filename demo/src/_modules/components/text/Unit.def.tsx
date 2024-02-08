import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Unit.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Unit.tsx", path: "components/text/Unit.tsx", demos: demos || [] };

export default mod;
