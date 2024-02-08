import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./DevTab.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "DevTab.tsx", path: "components/dev/DevTab.tsx", demos: demos || [] };

export default mod;
