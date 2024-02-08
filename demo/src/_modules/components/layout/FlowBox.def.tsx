import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./FlowBox.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "FlowBox.tsx", path: "components/layout/FlowBox.tsx", demos: demos || [] };

export default mod;
