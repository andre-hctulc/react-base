// auto generated by script 'demo-prepare'

import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./PageContent.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "PageContent.tsx", path: "components/page/PageContent.tsx", demos: demos || [] };

export default mod;