import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./Subtitle.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "Subtitle.tsx", path: "components/text/Subtitle.tsx", demos: demos || [] };

export default mod;
