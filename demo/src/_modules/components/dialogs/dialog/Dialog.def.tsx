import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./Dialog.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "Dialog.tsx", path: "components/dialogs/dialog/Dialog.tsx", demos: demos || [] };

export default mod;
