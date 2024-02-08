import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./useObjectToggleReducer.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "useObjectToggleReducer.ts", path: "hooks/reducers/useObjectToggleReducer.ts", demos: demos || [] };

export default mod;
