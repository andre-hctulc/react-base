import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./TimeText.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "TimeText.tsx", path: "components/text/TimeText.tsx", demos: demos || [] };

export default mod;
