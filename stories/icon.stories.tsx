import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleCheck } from "lucide-react";
import { Icon } from "../src/components/icon.js";

const meta = { title: "Components/Icon" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <Icon color="success"><CircleCheck /></Icon> };
