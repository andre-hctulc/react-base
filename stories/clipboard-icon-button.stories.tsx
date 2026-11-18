import type { Meta, StoryObj } from "@storybook/react-vite";
import { ClipboardIconButton } from "../src/components/clipboard-icon-button.js";

const meta = { title: "Components/ClipboardIconButton" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Clipboard: Story = {
    render: () => <ClipboardIconButton valueToCopy="fdc-platform" aria-label="Copy workspace name" />,
};
