import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./GridCols.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "GridCols.tsx", path: "components/layout/GridCols.tsx", demos: demos || [] };

export default mod;
