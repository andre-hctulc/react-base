import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Icon.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Icon.tsx", path: "components/icons/Icon.tsx", demos: demos || [] };

export default mod;
