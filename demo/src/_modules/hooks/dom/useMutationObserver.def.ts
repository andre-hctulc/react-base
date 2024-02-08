import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./useMutationObserver.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "useMutationObserver.ts", path: "hooks/dom/useMutationObserver.ts", demos: demos || [] };

export default mod;
