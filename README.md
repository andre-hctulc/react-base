# react-base

A React/Tailwind lib

## Features

-   React-hooks
-   React-contexts
-   React-components
-   base tailwind theme

## Usage

**1.** Extend the default Theme

_tailwind.config.ts_

```ts
import type { Config } from "tailwindcss";
import baseTheme from "@react-base/theme";

const config: Config = {
    content: ["@react-base/src/**/*", ...],
    theme: { extend: {...}, ...baseTheme },
};

export default config;
```

**2.** Start writing components

_Component.tsx_

```tsx
import React from "react";
// Imports tailwind styles
import "@react-base/src/index";
import Tooltip from "@react-base/src/components/layout/Stack";
import Button from "@react-base/src/components/layout/Button";
import { StyleProps, ParentProps } from "@react-base/src/types";

interface ButtonWithTooltipProps extends StyleProps, ParentProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    tooltip: string;
}

export default function ButtonWithTooltip(props: ButtonWithTooltipProps) {
    return (
        <Tooltip content={props.tooltip} enterDelay={300} enterNextDelay={500}>
            <Button className={props.className} style={props.style} onClick={props.onClick} variant="contained">
                {props.children}
            </Button>
        </Tooltip>
    );
}
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

See _demo/src/\_modules/_ for examples
