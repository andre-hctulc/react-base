import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./useMutationObserver.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "useMutationObserver.ts", path: "hooks/dom/useMutationObserver.ts", demos: demos || [] };

export default mod;
