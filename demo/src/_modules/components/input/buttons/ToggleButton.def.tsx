import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./ToggleButton.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "ToggleButton.tsx", path: "components/input/buttons/ToggleButton.tsx", demos: demos || [] };

export default mod;
