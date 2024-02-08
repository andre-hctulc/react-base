import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./useIsSticky.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "useIsSticky.ts", path: "hooks/others/useIsSticky.ts", demos: demos || [] };

export default mod;
