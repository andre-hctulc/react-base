import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./HelperText.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "HelperText.tsx", path: "components/text/HelperText.tsx", demos: demos || [] };

export default mod;
