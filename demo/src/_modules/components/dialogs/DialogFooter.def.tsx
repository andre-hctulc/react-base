// auto generated by script 'demo-prepare'

import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./DialogFooter.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "DialogFooter.tsx", path: "components/dialogs/DialogFooter.tsx", demos: demos || [] };

export default mod;
