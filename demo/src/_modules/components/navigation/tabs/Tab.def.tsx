import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./Tab.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "Tab.tsx", path: "components/navigation/tabs/Tab.tsx", demos: demos || [] };

export default mod;
