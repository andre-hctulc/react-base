import { ModuleDef } from "./types";

const moduleImports = import.meta.glob("./_modules/**/*.def.{ts,tsx}", { import: "default" });
const modules: ModuleDef[] = (await Promise.all(Object.values(moduleImports).map(imp => imp()))) as any;
export default modules;
