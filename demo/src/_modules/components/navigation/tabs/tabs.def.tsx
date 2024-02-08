import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./tabs.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "tabs.tsx", path: "components/navigation/tabs/tabs.tsx", demos: demos || [] };

export default mod;
