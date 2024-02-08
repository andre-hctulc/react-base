import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./DevTab.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "DevTab.tsx", path: "components/dev/DevTab.tsx", demos: demos || [] };

export default mod;
