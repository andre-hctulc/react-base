import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./FileEmblem.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "FileEmblem.tsx", path: "components/icons/FileEmblem.tsx", demos: demos || [] };

export default mod;
