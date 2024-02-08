import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./TreeViewItem.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "TreeViewItem.tsx", path: "components/navigation/treeview/TreeViewItem.tsx", demos: demos || [] };

export default mod;
