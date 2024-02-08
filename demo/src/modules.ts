import { ModuleDef } from "./types";

const moduleDefs: ModuleDef[] = Object.values(import.meta.glob("./_modules/**/*.def.{ts,tsx}", { import: "default", eager: true }));

export default moduleDefs;
