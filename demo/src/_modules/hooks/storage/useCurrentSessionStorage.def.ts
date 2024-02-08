import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./useCurrentSessionStorage.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "useCurrentSessionStorage.ts", path: "hooks/storage/useCurrentSessionStorage.ts", demos: demos || [] };

export default mod;
