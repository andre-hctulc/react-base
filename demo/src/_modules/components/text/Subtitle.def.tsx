import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Subtitle.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Subtitle.tsx", path: "components/text/Subtitle.tsx", demos: demos || [] };

export default mod;
