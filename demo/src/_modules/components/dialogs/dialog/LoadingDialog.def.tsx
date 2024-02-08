import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./LoadingDialog.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "LoadingDialog.tsx", path: "components/dialogs/dialog/LoadingDialog.tsx", demos: demos || [] };

export default mod;
