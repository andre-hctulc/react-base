import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./ButtonSpinner.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "ButtonSpinner.tsx", path: "components/input/buttons/ButtonSpinner.tsx", demos: demos || [] };

export default mod;
