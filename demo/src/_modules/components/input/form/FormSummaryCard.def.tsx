import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./FormSummaryCard.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "FormSummaryCard.tsx", path: "components/input/form/FormSummaryCard.tsx", demos: demos || [] };

export default mod;
