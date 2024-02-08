import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./URLCopy.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "URLCopy.tsx", path: "components/text/URLCopy.tsx", demos: demos || [] };

export default mod;
