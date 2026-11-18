import type { Meta, StoryObj } from "@storybook/react-vite";
import { XScroll } from "../src/components/x-scroll.js";

const meta = { title: "Components/XScroll" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <XScroll hideScrollbar><div className="flex w-48 gap-3 overflow-x-auto rounded-md border p-3">
        {["Alpha", "Beta", "Gamma", "Delta", "Epsilon"].map((item) => (
            <span key={item} className="shrink-0 rounded bg-muted px-3 py-2 text-sm">{item}</span>
        ))}
    </div></XScroll>,
};
