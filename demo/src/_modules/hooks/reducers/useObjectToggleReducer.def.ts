import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./useObjectToggleReducer.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "useObjectToggleReducer.ts", path: "hooks/reducers/useObjectToggleReducer.ts", demos: demos || [] };

export default mod;
