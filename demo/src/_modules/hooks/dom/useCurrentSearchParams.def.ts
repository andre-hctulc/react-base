import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./useCurrentSearchParams.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "useCurrentSearchParams.ts", path: "hooks/dom/useCurrentSearchParams.ts", demos: demos || [] };

export default mod;
