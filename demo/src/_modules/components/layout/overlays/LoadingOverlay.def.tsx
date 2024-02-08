import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./LoadingOverlay.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "LoadingOverlay.tsx", path: "components/layout/overlays/LoadingOverlay.tsx", demos: demos || [] };

export default mod;
