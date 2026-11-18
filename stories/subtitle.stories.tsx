import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Subtitle } from "../src/components/subtitle.js";

const meta = { title: "Components/Subtitle" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const DefaultExample: FC = () => {
    return <Subtitle variant="h3">Review details</Subtitle>;
};

export const Default: Story = { render: () => <DefaultExample /> };
