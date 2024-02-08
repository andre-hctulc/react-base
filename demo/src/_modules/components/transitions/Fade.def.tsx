import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Fade.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Fade.tsx", path: "components/transitions/Fade.tsx", demos: demos || [] };

export default mod;
