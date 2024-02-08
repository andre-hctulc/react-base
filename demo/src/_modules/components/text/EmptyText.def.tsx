import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./EmptyText.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "EmptyText.tsx", path: "components/text/EmptyText.tsx", demos: demos || [] };

export default mod;
