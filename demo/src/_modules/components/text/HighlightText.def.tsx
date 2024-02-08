import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./HighlightText.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "HighlightText.tsx", path: "components/text/HighlightText.tsx", demos: demos || [] };

export default mod;
