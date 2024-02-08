import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./LinkContainer.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "LinkContainer.tsx", path: "components/navigation/links/LinkContainer.tsx", demos: demos || [] };

export default mod;
