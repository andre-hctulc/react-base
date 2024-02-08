import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./FileEmblem.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "FileEmblem.tsx", path: "components/icons/FileEmblem.tsx", demos: demos || [] };

export default mod;
