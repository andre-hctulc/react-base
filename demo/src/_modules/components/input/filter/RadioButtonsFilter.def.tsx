import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./RadioButtonsFilter.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "RadioButtonsFilter.tsx", path: "components/input/filter/RadioButtonsFilter.tsx", demos: demos || [] };

export default mod;
