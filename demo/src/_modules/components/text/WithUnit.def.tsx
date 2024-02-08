import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./WithUnit.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "WithUnit.tsx", path: "components/text/WithUnit.tsx", demos: demos || [] };

export default mod;
