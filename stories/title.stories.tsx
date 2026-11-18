import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleCheck } from "lucide-react";
import { Title } from "../src/components/title.js";

const meta = { title: "Components/Title" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <Title icon={<CircleCheck />}>Workspace access</Title> };
