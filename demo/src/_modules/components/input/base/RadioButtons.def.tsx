import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./RadioButtons.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "RadioButtons.tsx", path: "components/input/base/RadioButtons.tsx", demos: demos || [] };

export default mod;
