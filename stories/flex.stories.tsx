import type { Meta, StoryObj } from "@storybook/react-vite";
import { Flex } from "../src/components/flex.js";

const meta = { title: "Components/Flex" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const boxClassName = "rounded-md border bg-muted px-3 py-2 text-sm";

export const Default: Story = {
    render: () => <Flex alignItems="center" justifyContent="between" className="gap-3">
        <span className={boxClassName}>Flex start</span><span className={boxClassName}>Flex end</span>
    </Flex>,
};
