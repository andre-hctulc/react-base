import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./FormControl.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "FormControl.tsx", path: "components/input/form/FormControl.tsx", demos: demos || [] };

export default mod;
