# Docs

## Conventions

-   `Component Props` are capitalized

    ```ts
    // Component type
    interface Props {
        LinkComponent?: React.ComponentType<{ href: string }>;
    }

    // components
    interface Props {
        icon?: React.ReactNode;
    }

    // many components types/components
    interface Props {
        components?: {
            icon?: React.ReactNode;
            // ...
        };
        Components?: {
            Link?: React.ComponentType<{ href: string }>;
            // ...
        };
    }
    ```

-   ``
-   `Variants` should be snake cas. E.g. _full_screen_
-   `as` Prop defined the root element
-   Component `JS Docs`

    ```tsx
    /**
     * Component Description
     *
     * ### Props
     * - `propName` - Prop description
     * - `prop2` - Prop 2 description
     *
     * ### Events
     * - `onEventName` - Event description

     * ### Caveats
     * Yap Yap Yap
     */
    export const Component: React.FC<ComponentProps> = ({ ... }) => { ... };
    ```

## Storybook

We use [Storybook](https://storybook.js.org/docs) for **documentation** and **testing**!

## Icons

We use icons from [here](https://phosphoricons.com/?q=%22x%22&weight=%22bold%22). Only Icons that are used internally are included in _components/icons_.

All icon svg should use `fill="currentColor"`
