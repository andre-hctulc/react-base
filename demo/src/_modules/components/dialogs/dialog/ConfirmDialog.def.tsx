import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./ConfirmDialog.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "ConfirmDialog.tsx", path: "components/dialogs/dialog/ConfirmDialog.tsx", demos: demos || [] };

export default mod;
