import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextBlock } from "../src/components/text-block.js";

const meta = { title: "Components/TextBlock" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <TextBlock lines="2" className="max-w-sm">
        This longer message demonstrates multiline truncation while preserving readable text wrapping.
    </TextBlock>,
};
