import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./Overlay.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "Overlay.tsx", path: "components/layout/overlays/Overlay.tsx", demos: demos || [] };

export default mod;
