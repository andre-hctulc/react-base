import type { Meta, StoryObj } from "@storybook/react-vite";
import { LabelMimic } from "../src/components/label-mimic.js";

const meta = { title: "Components/LabelMimic" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <LabelMimic color="warning">Pending review</LabelMimic> };
