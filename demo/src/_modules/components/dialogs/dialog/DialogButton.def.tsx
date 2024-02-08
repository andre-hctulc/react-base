import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./DialogButton.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "DialogButton.tsx", path: "components/dialogs/dialog/DialogButton.tsx", demos: demos || [] };

export default mod;
