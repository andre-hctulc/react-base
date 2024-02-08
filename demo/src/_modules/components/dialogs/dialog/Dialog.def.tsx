import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Dialog.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Dialog.tsx", path: "components/dialogs/dialog/Dialog.tsx", demos: demos || [] };

export default mod;
