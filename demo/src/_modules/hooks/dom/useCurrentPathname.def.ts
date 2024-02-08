import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./useCurrentPathname.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "useCurrentPathname.ts", path: "hooks/dom/useCurrentPathname.ts", demos: demos || [] };

export default mod;
