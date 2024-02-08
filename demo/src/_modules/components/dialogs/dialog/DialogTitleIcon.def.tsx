import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./DialogTitleIcon.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "DialogTitleIcon.tsx", path: "components/dialogs/dialog/DialogTitleIcon.tsx", demos: demos || [] };

export default mod;
