import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./BytesText.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "BytesText.tsx", path: "components/text/BytesText.tsx", demos: demos || [] };

export default mod;
