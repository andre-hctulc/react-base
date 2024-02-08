import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./EmptyText.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "EmptyText.tsx", path: "components/text/EmptyText.tsx", demos: demos || [] };

export default mod;
