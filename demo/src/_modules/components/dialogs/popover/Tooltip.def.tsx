import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./Tooltip.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "Tooltip.tsx", path: "components/dialogs/popover/Tooltip.tsx", demos: demos || [] };

export default mod;
