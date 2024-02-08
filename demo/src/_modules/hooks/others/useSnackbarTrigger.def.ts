import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./useSnackbarTrigger.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "useSnackbarTrigger.ts", path: "hooks/others/useSnackbarTrigger.ts", demos: demos || [] };

export default mod;
