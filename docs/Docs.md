# Docs

## Conventions

-   `Slot Props` are capitalized

    ```ts
    interface Props {
        Pre?: React.ReactNode;
        HeaderProps?: HeaderProps;
    }
    ```

-   `Variants` should be snake cas. E.g. _full_screen_
-   `as` Prop defined the root element
-   tailwind variants are snake case
-   Component JS Docs

    ```tsx
    /**
     * Component Description
     *
     * ### Props
     * - `propName` - Prop description
     *
     * ### Events
     * - `eventName` - Event description
     */
    export const Component: React.FC<ComponentProps> = ({ ... }) => { ... };
    ```

## Storybook

We use [Storybook](https://storybook.js.org/docs) for **documentation** and **testing**!
