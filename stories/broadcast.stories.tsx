import type { Meta, StoryObj } from "@storybook/react-vite";
import { Broadcast } from "../src/components/broadcast.js";

const meta = { title: "Components/Broadcast" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <Broadcast props={{ className: "rounded-md border bg-muted px-3 py-2 text-sm" }}>
        <button type="button">Broadcast props</button><button type="button">to children</button>
    </Broadcast>,
};
