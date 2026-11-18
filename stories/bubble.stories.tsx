import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bubble } from "../src/components/bubble.js";

const meta = { title: "Components/Bubble" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const DefaultExample: FC = () => {
    return (
        <Bubble eventProp="onClick" onBubble={(event) => console.log(event.type)}>
            <button className="rounded-md border px-3 py-2 text-sm" type="button">Bubble click event</button>
        </Bubble>
    );
};

export const Default: Story = {
    render: () => <DefaultExample />,
};
