import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./useKeyDownObserver.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "useKeyDownObserver.tsx", path: "hooks/others/useKeyDownObserver.tsx", demos: demos || [] };

export default mod;
