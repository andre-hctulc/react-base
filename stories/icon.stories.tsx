import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleCheck } from "lucide-react";
import { Icon } from "../src/components/icon.js";

const meta = { title: "Components/Icon" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const DefaultExample: FC = () => {
    return <Icon color="success"><CircleCheck /></Icon>;
};

export const Default: Story = { render: () => <DefaultExample /> };
