import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "../src/components/typography.js";

const meta = { title: "Components/Typography" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <Typography textSize="sm" lineHeight="relaxed">
        Typography provides small, composable text treatments for product interfaces.
    </Typography>,
};
