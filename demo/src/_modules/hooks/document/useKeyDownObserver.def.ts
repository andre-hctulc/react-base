// auto generated by script 'demo-prepare'

import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./useKeyDownObserver.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "useKeyDownObserver.ts", path: "hooks/document/useKeyDownObserver.ts", demos: demos || [] };

export default mod;