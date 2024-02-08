import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./DeleteDialog.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "DeleteDialog.tsx", path: "components/dialogs/dialog/DeleteDialog.tsx", demos: demos || [] };

export default mod;
