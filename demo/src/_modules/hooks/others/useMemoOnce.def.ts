import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./useMemoOnce.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "useMemoOnce.ts", path: "hooks/others/useMemoOnce.ts", demos: demos || [] };

export default mod;
