import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./CodeInput.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "CodeInput.tsx", path: "components/input/CodeInput.tsx", demos: demos || [] };

export default mod;
