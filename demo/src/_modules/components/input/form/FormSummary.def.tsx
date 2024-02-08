import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./FormSummary.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "FormSummary.tsx", path: "components/input/form/FormSummary.tsx", demos: demos || [] };

export default mod;
