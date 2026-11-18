import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toolbar } from "../src/components/toolbar.js";

const meta = { title: "Components/Toolbar" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <Toolbar justifyContent="between" className="rounded-md border p-3">
        <span>Toolbar</span><span className="text-muted-foreground text-sm">Actions</span>
    </Toolbar>,
};
