import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./DialogFooter.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "DialogFooter.tsx", path: "components/dialogs/dialog/DialogFooter.tsx", demos: demos || [] };

export default mod;
