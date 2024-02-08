import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./DialogTitle.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "DialogTitle.tsx", path: "components/dialogs/dialog/DialogTitle.tsx", demos: demos || [] };

export default mod;
