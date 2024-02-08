import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./FormSummary.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "FormSummary.tsx", path: "components/input/form/FormSummary.tsx", demos: demos || [] };

export default mod;
