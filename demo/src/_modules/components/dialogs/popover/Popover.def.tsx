import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Popover.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Popover.tsx", path: "components/dialogs/popover/Popover.tsx", demos: demos || [] };

export default mod;
