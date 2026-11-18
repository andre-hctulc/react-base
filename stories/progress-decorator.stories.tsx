import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "../src/components/ui/progress.js";
import { ProgressDecorator } from "../src/components/progress-decorator.js";

const meta = { title: "Components/ProgressDecorator" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const ProgressExampleExample: FC = () => {
    return (
        <ProgressDecorator valueLabel="Migration" value="60%" description="Three of five steps completed">
            <Progress value={60} />
        </ProgressDecorator>
    );
};

export const ProgressExample: Story = {
    render: () => <ProgressExampleExample />,
};
