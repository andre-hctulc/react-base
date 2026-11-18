import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { XScroll } from "../src/components/x-scroll.js";

const meta = { title: "Components/XScroll" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const DefaultExample: FC = () => {
    return (
        <XScroll hideScrollbar><div className="flex w-48 gap-3 overflow-x-auto rounded-md border p-3">
            {["Alpha", "Beta", "Gamma", "Delta", "Epsilon"].map((item) => (
                <span key={item} className="shrink-0 rounded bg-muted px-3 py-2 text-sm">{item}</span>
            ))}
        </div></XScroll>
    );
};

export const Default: Story = {
    render: () => <DefaultExample />,
};
