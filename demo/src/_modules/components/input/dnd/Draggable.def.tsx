import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./Draggable.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "Draggable.tsx", path: "components/input/dnd/Draggable.tsx", demos: demos || [] };

export default mod;
