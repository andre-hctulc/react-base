import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./StorageProvider.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "StorageProvider.tsx", path: "hooks/storage/StorageProvider.tsx", demos: demos || [] };

export default mod;
