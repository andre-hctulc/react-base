import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./useCurrentLocalStorage.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "useCurrentLocalStorage.ts", path: "hooks/storage/useCurrentLocalStorage.ts", demos: demos || [] };

export default mod;
