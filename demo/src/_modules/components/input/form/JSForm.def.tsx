import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./JSForm.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "JSForm.tsx", path: "components/input/form/JSForm.tsx", demos: demos || [] };

export default mod;
