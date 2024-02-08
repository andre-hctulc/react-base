import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./BlankButton.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "BlankButton.tsx", path: "components/input/buttons/BlankButton.tsx", demos: demos || [] };

export default mod;
