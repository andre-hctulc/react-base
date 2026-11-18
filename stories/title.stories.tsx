import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleCheck } from "lucide-react";
import { Title } from "../src/components/title.js";

const meta = { title: "Components/Title" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const DefaultExample: FC = () => {
    return <Title icon={<CircleCheck />}>Workspace access</Title>;
};

export const Default: Story = { render: () => <DefaultExample /> };
