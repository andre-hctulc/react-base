import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./useBlobUrl.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "useBlobUrl.ts", path: "hooks/others/useBlobUrl.ts", demos: demos || [] };

export default mod;
