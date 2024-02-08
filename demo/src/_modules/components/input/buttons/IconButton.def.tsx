import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./IconButton.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "IconButton.tsx", path: "components/input/buttons/IconButton.tsx", demos: demos || [] };

export default mod;
