import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./Toolbar.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "Toolbar.tsx", path: "components/layout/Toolbar.tsx", demos: demos || [] };

export default mod;
