import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./DialogHeader.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "DialogHeader.tsx", path: "components/dialogs/dialog/DialogHeader.tsx", demos: demos || [] };

export default mod;
