import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./FlowBox.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "FlowBox.tsx", path: "components/layout/FlowBox.tsx", demos: demos || [] };

export default mod;
