import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Draggable.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Draggable.tsx", path: "components/input/dnd/Draggable.tsx", demos: demos || [] };

export default mod;
