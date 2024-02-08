import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./ToggleButtonGroup.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "ToggleButtonGroup.tsx", path: "components/input/buttons/ToggleButtonGroup.tsx", demos: demos || [] };

export default mod;
