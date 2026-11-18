import type { Meta, StoryObj } from "@storybook/react-vite";
import { Overlay } from "../src/components/overlay.js";

const meta = { title: "Components/Overlay" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const OverlayExample: Story = {
    render: () => (
        <div className="relative h-44 overflow-hidden rounded-md border bg-muted">
            <p className="p-4">Protected content</p>
            <Overlay variant="absolute" bg="blur" centerContent>
                <span className="rounded-md bg-background px-3 py-2 text-sm shadow">Overlay content</span>
            </Overlay>
        </div>
    ),
};
