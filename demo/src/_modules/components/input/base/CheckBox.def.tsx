import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./CheckBox.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "CheckBox.tsx", path: "components/input/base/CheckBox.tsx", demos: demos || [] };

export default mod;
