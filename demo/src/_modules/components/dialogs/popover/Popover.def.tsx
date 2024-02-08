import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./Popover.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "Popover.tsx", path: "components/dialogs/popover/Popover.tsx", demos: demos || [] };

export default mod;
