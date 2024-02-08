import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./useCurrentLocalStorage.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "useCurrentLocalStorage.ts", path: "hooks/storage/useCurrentLocalStorage.ts", demos: demos || [] };

export default mod;
