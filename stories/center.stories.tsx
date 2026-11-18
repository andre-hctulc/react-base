import type { Meta, StoryObj } from "@storybook/react-vite";
import { Center, CenterH, CenterV } from "../src/components/center.js";

const meta = { title: "Components/Center" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Alignment: Story = {
    render: () => (
        <div className="grid gap-4 sm:grid-cols-3">
            <Center className="h-28 rounded-md border bg-muted">Center</Center>
            <CenterH className="h-28 rounded-md border bg-muted pt-4">CenterH</CenterH>
            <CenterV className="h-28 rounded-md border bg-muted pl-4">CenterV</CenterV>
        </div>
    ),
};
