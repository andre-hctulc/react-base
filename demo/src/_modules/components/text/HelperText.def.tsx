import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./HelperText.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "HelperText.tsx", path: "components/text/HelperText.tsx", demos: demos || [] };

export default mod;
