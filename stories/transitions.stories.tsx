import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { CollapseV300 } from "../src/components/collapse.js";
import { Fade } from "../src/components/fade.js";
import { Transition } from "../src/components/transition.js";

const meta = { title: "Components/Transitions" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function TransitionExample() {
    const [show, setShow] = useState(true);
    const toggle = () => setShow((current) => !current);
    const content = <div className="rounded-md border bg-muted p-4">Animated content</div>;

    return (
        <div className="space-y-4">
            <button
                className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
                onClick={toggle}
            >
                Toggle
            </button>
            <Fade show={show}>{content}</Fade>
            <CollapseV300 show={show}>{content}</CollapseV300>
            <Transition
                show={show}
                enter="transition-transform duration-300"
                enterFrom="-translate-x-4"
                enterTo="translate-x-0"
                leave="transition-transform duration-300"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-4"
            >
                {content}
            </Transition>
        </div>
    );
}

export const Examples: Story = { render: () => <TransitionExample /> };
