import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./DevTools.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "DevTools.tsx", path: "components/dev/DevTools.tsx", demos: demos || [] };

export default mod;
