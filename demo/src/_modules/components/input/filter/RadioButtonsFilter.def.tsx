import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./RadioButtonsFilter.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "RadioButtonsFilter.tsx", path: "components/input/filter/RadioButtonsFilter.tsx", demos: demos || [] };

export default mod;
