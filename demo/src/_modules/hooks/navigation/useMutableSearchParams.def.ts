import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./useMutableSearchParams.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "useMutableSearchParams.ts", path: "hooks/navigation/useMutableSearchParams.ts", demos: demos || [] };

export default mod;
