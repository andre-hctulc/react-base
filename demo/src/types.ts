// Comp

export interface DemoProps {
    demoProps?: Record<string, any>;
}

export type PropDef = {
    type: "string" | "number" | "boolean" | "object" | "array";
    listValues?: string[];
    range?: [number, number];
    propName: string;
    defaultValue?: any;
    helperText?: string
};
export type DemoDef = { render: React.ComponentType<DemoProps>; demoProps?: PropDef[]; name: string };

export type ModuleDef = {
    name: string;
    demos: DemoDef[];
    path: string;
};