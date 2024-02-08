import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./useCurrentPathname.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "useCurrentPathname.ts", path: "hooks/dom/useCurrentPathname.ts", demos: demos || [] };

export default mod;
