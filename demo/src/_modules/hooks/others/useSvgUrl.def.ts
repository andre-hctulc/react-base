import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./useSvgUrl.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "useSvgUrl.ts", path: "hooks/others/useSvgUrl.ts", demos: demos || [] };

export default mod;
