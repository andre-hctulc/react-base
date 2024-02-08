import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./CheckBoxes.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "CheckBoxes.tsx", path: "components/input/base/CheckBoxes.tsx", demos: demos || [] };

export default mod;
