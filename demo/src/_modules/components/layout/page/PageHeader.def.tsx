import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./PageHeader.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "PageHeader.tsx", path: "components/layout/page/PageHeader.tsx", demos: demos || [] };

export default mod;
