import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./usePromise.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "usePromise.ts", path: "hooks/others/usePromise.ts", demos: demos || [] };

export default mod;
