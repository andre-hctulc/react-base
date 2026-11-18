import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Broadcast } from "../src/components/broadcast.js";

const meta = { title: "Components/Broadcast" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const DefaultExample: FC = () => {
    return (
        <Broadcast props={{ className: "rounded-md border bg-muted px-3 py-2 text-sm" }}>
            <button type="button">Broadcast props</button><button type="button">to children</button>
        </Broadcast>
    );
};

export const Default: Story = {
    render: () => <DefaultExample />,
};
