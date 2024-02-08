import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./useAsyncEffect.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "useAsyncEffect.ts", path: "hooks/others/useAsyncEffect.ts", demos: demos || [] };

export default mod;
