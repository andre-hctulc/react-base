import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./useAsyncMemo.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "useAsyncMemo.ts", path: "hooks/others/useAsyncMemo.ts", demos: demos || [] };

export default mod;
