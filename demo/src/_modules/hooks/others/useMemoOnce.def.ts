import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./useMemoOnce.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "useMemoOnce.ts", path: "hooks/others/useMemoOnce.ts", demos: demos || [] };

export default mod;
