import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Label.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Label.tsx", path: "components/input/Label.tsx", demos: demos || [] };

export default mod;
