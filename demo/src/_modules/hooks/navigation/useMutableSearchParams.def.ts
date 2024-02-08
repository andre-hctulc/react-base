import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./useMutableSearchParams.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "useMutableSearchParams.ts", path: "hooks/navigation/useMutableSearchParams.ts", demos: demos || [] };

export default mod;
