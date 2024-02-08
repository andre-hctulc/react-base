import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./URLCopy.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "URLCopy.tsx", path: "components/text/URLCopy.tsx", demos: demos || [] };

export default mod;
