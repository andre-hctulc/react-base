import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ClipboardIconButton } from "../src/components/clipboard-icon-button.js";

const meta = { title: "Components/ClipboardIconButton" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const ClipboardExample: FC = () => {
    return <ClipboardIconButton valueToCopy="fdc-platform" aria-label="Copy workspace name" />;
};

export const Clipboard: Story = {
    render: () => <ClipboardExample />,
};
