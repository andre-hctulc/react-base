import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./useCurrentSessionStorage.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "useCurrentSessionStorage.ts", path: "hooks/storage/useCurrentSessionStorage.ts", demos: demos || [] };

export default mod;
