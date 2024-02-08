import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./Droppable.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "Droppable.tsx", path: "components/input/dnd/Droppable.tsx", demos: demos || [] };

export default mod;
