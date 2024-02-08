import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./PageContent.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "PageContent.tsx", path: "components/layout/page/PageContent.tsx", demos: demos || [] };

export default mod;
