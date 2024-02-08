import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Pagination.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Pagination.tsx", path: "components/navigation/Pagination.tsx", demos: demos || [] };

export default mod;
