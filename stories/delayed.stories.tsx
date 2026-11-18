import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type FC } from "react";
import { Delayed } from "../src/components/delayed.js";

const meta = { title: "Components/Delayed" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const DelayedExample: FC = () => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="space-y-3">
            <button
                className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
                onClick={() => setVisible((current) => !current)}
            >
                Toggle delayed content
            </button>
            <Delayed
                delay={600}
                in={visible}
                renderDelay={<span className="text-muted-foreground">Waiting...</span>}
            >
                <span className="font-medium">Ready</span>
            </Delayed>
        </div>
    );
};

export const DelayedContent: Story = {
    render: () => <DelayedExample />,
};
