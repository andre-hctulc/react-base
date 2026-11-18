import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dot } from "../src/components/dot.js";

const meta = { title: "Components/Dot" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const DefaultExample: FC = () => {
    return <Dot color="success" />;
};

export const Default: Story = { render: () => <DefaultExample /> };
