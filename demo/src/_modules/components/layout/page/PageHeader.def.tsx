import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./PageHeader.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "PageHeader.tsx", path: "components/layout/page/PageHeader.tsx", demos: demos || [] };

export default mod;
