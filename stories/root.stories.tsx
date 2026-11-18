import type { Meta, StoryObj } from "@storybook/react-vite";
import { Root } from "../src/components/root.js";

const meta = { title: "Components/Root" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const boxClassName = "rounded-md border bg-muted px-3 py-2 text-sm";

export const Default: Story = {
    render: () => <Root className="gap-6 rounded-lg border p-6"><span className={boxClassName}>Root content</span></Root>,
};
