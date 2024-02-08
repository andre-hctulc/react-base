import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./useAssets.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "useAssets.ts", path: "hooks/others/useAssets.ts", demos: demos || [] };

export default mod;
