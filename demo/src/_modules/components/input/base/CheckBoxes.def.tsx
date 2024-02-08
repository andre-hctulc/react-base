import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./CheckBoxes.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "CheckBoxes.tsx", path: "components/input/base/CheckBoxes.tsx", demos: demos || [] };

export default mod;
