import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Page.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Page.tsx", path: "components/layout/page/Page.tsx", demos: demos || [] };

export default mod;
