# react-base

A React/Tailwind lib

## Features

-   React hooks
-   React contexts
-   React components
-   React util/types
-   Base tailwind config

## Usage

**1.** Setup

_tailwind.config.ts_

```ts
import type { Config } from "tailwindcss";
import setup from "@react-base/src/setup";

export default setup({
    content: ["path/to/react-base/src/**/*", ...],
    theme: {
        extend: {...},
        ...
    },
    ...
});
```

**2.** Start writing components

_ButtonWithTooltip.tsx_

```tsx
// Imports default styles
import "@react-base/src/index";
import { Tooltip, Button } from "@react-base/src/components/buttons";
import { useAlerts } from "@react-base/src/hooks";
import { StyleProps, ParentProps } from "@react-base/src/types";

interface ButtonWithTooltipProps extends StyleProps, ParentProps<string> {
    tooltip: string;
}

export default function ButtonWithTooltip(props: ButtonWithTooltipProps) {
    const { info } = useAlerts();

    return (
        <Tooltip content={props.tooltip} enterDelay={300} enterNextDelay={500}>
            <Button
                onClick={() => info("Button clicked!")}
                className={props.className}
                style={props.style}
                variant="contained"
            >
                {props.children}
            </Button>
        </Tooltip>
    );
}
```

### Usage with NextJS

_next.config.js_

```js
const nextConfig = {
    ...
    transpilePackages: ["path/to/react-base", ...],
};

module.exports = nextConfig;
```

## Demo

The demo provides Component-Previews, Code-Examples and Code-Views of all modules. Including components, hooks and contexts.

**Run the demo:**

```bash
npm run demo
```

The demo is served locally at _http://localhost:3065_

### Build the demo-App

The demo is built with vite

```bash
# Build module definitions
npm run demo-prepare
# Build the demo-App (vite)
cd demo
npm run build
```

**Define Demo for a module**

See _demo/src/\_modules/\*\*/\*.demo\*.{ts,tsx}_ for examples

## Theming

### Theme colors

Default theme colors are _primary, secondary, accent, success, warning, error, info_ and can be overridden in the theme colors.
You can use them just like any other tailwind color or in component props (type `ThemeColor`. See custom theme colors).

```tsx
<div className="border-primary text-accent-dark bg-error-super-light">...</div>
```

### Custom Theme colors

**1.** Define theme colors

_tailwind.config.ts_

```ts
import setup from "@react-base/src/setup";
import type { Config } from "tailwindcss";

return setup({
    theme: {
        extend: {
            colors: {
                // You can also overwrite default colors like primary ,error etc. here
                green: {
                    // These values are currently all required for the theme color to be recognized
                    // Might change to 100, 200, 300, ...
                    DEFAULT: "#1d782f",
                    light: "#4b8e58",
                    dark: "#0a5f1b",
                    "super-light": "#8abc94",
                    "contrast-text": "#f9f9f9",
                },
            },
        },
    },
});
```

**2.** Declare theme color type

_types.ts_

```ts
declare module "@react-base/src/types" {
    interface ThemeColorMap {
        green: any;
    }
}
```

**3.** Use the color in components

_GreenIcon.tsx_

```tsx
import React from "react";
import { Icon } from "@react-base/src/components/icons";
import { StyleProps, ParentProps } from "@react-base/src/types";

export default function GreenIcon(props: StyleProps & ParentProps<React.ReactElement, true>) {
    return (
        <Icon color="green" className={props.className} style={props.style}>
            {props.children}
        </Icon>
    );
}
```

or

```tsx
import clsx from "clsx";
import { Flex } from "@react-base/src/components/layout";
import { ThemeColor, StyleProps, ParentProps } from "@react-base/src/types";
import { themeColor } from "@react-base/src/util";

interface ColoredBoxProps extends StyleProps, ParentProps<string> {
    color: ThemeColor;
}

export default function ColoredBox(props: ColoredBoxProps) {
    const { bg } = themeColor(props.color);

    return (
        <Flex className={clsx(props.className, bg)} style={props.style}>
            {props.children}
        </Flex>
    );
}
```

### Background/Text

There is 3 text colors and 3 background colors:

```tsx
<>
    <span className="bg-bg text-text">...</span>
    <span className="bg-bg-paper text-text-secondary">...</span>
    <span className="bg-bg-paper2 text-text-disabled">...</span>
</>
```

_For most cases you can use the_ `Typography` _component for text_

## Prop Patterns

### StyleProps

`StyleProps` enable [clsx](https://www.npmjs.com/package/clsx)-like usage direcrly in the `className` prop
and the usage of style array.

-   Implement

```tsx
import { StyleProps } from "@react-base/src/types";
import { styleProps } from "@react-base/src/util";

function StyledDiv(props: StyleProps & { children?: React.ReactNode }) {
    return (
        <CustomCard
            {...styleProps(
                {
                    // default classes
                    className: "border rounded p-3",
                    // default style
                    style: { display: "flex" },
                },
                props
            )}
        >
            {props.children}
        </CustomCard>
}
```

-   Usage

```tsx
<StyledDiv className="bg-paper" style={{ flexDirection: "column" }}>...</StyledDiv>
// advanced
<StyledDiv
    className={[
        "bg-paper",
        active && "outline-secondary",
        ...otherClasses
    ]}
    style={[{ flexDirection: "column" }, ...otherStyles]}
>
    ...
</StyledDiv>
```
