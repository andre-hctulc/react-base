import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./FancyLink.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "FancyLink.tsx", path: "components/navigation/links/FancyLink.tsx", demos: demos || [] };

export default mod;
