import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./TextArea.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "TextArea.tsx", path: "components/input/base/TextArea.tsx", demos: demos || [] };

export default mod;
