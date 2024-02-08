import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./CheckBox.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "CheckBox.tsx", path: "components/input/base/CheckBox.tsx", demos: demos || [] };

export default mod;
