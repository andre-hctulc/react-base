import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./ToggleIconButton.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "ToggleIconButton.tsx", path: "components/input/buttons/ToggleIconButton.tsx", demos: demos || [] };

export default mod;
