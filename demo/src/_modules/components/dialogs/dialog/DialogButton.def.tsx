import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./DialogButton.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "DialogButton.tsx", path: "components/dialogs/dialog/DialogButton.tsx", demos: demos || [] };

export default mod;
