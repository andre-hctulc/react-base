import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./TreeView.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "TreeView.tsx", path: "components/navigation/treeview/TreeView.tsx", demos: demos || [] };

export default mod;
