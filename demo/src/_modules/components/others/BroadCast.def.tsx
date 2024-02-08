import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./BroadCast.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "BroadCast.tsx", path: "components/others/BroadCast.tsx", demos: demos || [] };

export default mod;
