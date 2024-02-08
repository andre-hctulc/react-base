import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Tab.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Tab.tsx", path: "components/navigation/tabs/Tab.tsx", demos: demos || [] };

export default mod;
