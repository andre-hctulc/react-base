import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./FancyLink.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "FancyLink.tsx", path: "components/navigation/links/FancyLink.tsx", demos: demos || [] };

export default mod;
