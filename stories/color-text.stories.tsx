import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorText, ErrorText, SuccessText } from "../src/components/color-text.js";

const meta = { title: "Components/ColorText" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const DefaultExample: FC = () => {
    return (
        <div className="flex flex-wrap items-center gap-4">
            <ColorText color="info">Information</ColorText><SuccessText>Completed</SuccessText><ErrorText>Needs attention</ErrorText>
        </div>
    );
};

export const Default: Story = {
    render: () => <DefaultExample />,
};
