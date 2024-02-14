import { dirname } from "./helpers";
import { ModuleDef } from "./types";

const moduleDefs: ModuleDef[] = Object.values(import.meta.glob("./_modules/**/*.def.{ts,tsx}", { import: "default", eager: true }));

const modules = moduleDefs.sort((a, b) => {
    const aDir = dirname(a.path);
    const bDir = dirname(b.path);
    if (aDir === bDir) {
        if (a.demos.length && !b.demos.length) return -1;
        else if (!a.demos.length && b.demos.length) return 1;
        else return a.path.localeCompare(b.path);
    } else return a.path.localeCompare(b.path);
});

export default modules;
