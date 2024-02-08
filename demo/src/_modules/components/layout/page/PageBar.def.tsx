import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./PageBar.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "PageBar.tsx", path: "components/layout/page/PageBar.tsx", demos: demos || [] };

export default mod;
