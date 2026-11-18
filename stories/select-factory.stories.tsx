import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectFactory } from "../src/components/select-factory.js";

const meta = { title: "Components/SelectFactory" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const DefaultExample: FC = () => {
    return (
        <SelectFactory items={{
            Administration: [{ label: "Administrator", value: "admin" }],
            Members: [{ label: "Editor", value: "editor" }, { label: "Viewer", value: "viewer" }],
        }} defaultValue="editor" />
    );
};

export const Default: Story = {
    render: () => <DefaultExample />,
};
