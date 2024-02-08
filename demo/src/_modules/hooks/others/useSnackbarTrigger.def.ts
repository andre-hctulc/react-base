import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./useSnackbarTrigger.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "useSnackbarTrigger.ts", path: "hooks/others/useSnackbarTrigger.ts", demos: demos || [] };

export default mod;
