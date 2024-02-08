import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./DialogContent.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "DialogContent.tsx", path: "components/dialogs/dialog/DialogContent.tsx", demos: demos || [] };

export default mod;
