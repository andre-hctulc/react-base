import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spacer } from "../src/components/spacer.js";

const meta = { title: "Components/Spacer" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const boxClassName = "rounded-md border bg-muted px-3 py-2 text-sm";

const DefaultExample: FC = () => {
    return (
        <Spacer gap="sm"><span className={boxClassName}>Spacer item one</span>
            <span className={boxClassName}>Spacer item two</span></Spacer>
    );
};

export const Default: Story = {
    render: () => <DefaultExample />,
};
