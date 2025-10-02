# react-base

[headlessui](https://headlessui.com) X [tailwind-variants](https://www.tailwind-variants.org)

## Usage

_globals.css_

```css
@import "tailwindcss";
@import "@dre44/react-base";
```

_LoginButton.tsx_

```tsx
import { Button } from "@dre44/react-base";

interface LoginButtonProps {
    className?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ className }) => {
    return (
        <Button className={className} href="/login" variant="text">
            Login
        </Button>
    );
};
```

## Compatibility

`react@18` `react-dom@18` `@types/react@18` `@types/react-dom@18`

## Icons

We use [Phosphor Icons](https://phosphoricons.com) as system icons
