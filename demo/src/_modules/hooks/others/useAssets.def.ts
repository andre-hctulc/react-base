import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./useAssets.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "useAssets.ts", path: "hooks/others/useAssets.ts", demos: demos || [] };

export default mod;
