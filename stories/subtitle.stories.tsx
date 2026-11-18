import type { Meta, StoryObj } from "@storybook/react-vite";
import { Subtitle } from "../src/components/subtitle.js";

const meta = { title: "Components/Subtitle" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <Subtitle variant="h3">Review details</Subtitle> };
