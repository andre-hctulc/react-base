import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./LoadingOverlay.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "LoadingOverlay.tsx", path: "components/layout/overlays/LoadingOverlay.tsx", demos: demos || [] };

export default mod;
