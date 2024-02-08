import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./TimeText.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "TimeText.tsx", path: "components/text/TimeText.tsx", demos: demos || [] };

export default mod;
