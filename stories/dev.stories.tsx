import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dev } from "../src/components/dev.js";
import DevProvider from "../src/components/dev-provider.js";

const meta = { title: "Components/Dev" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const DefaultExample: FC = () => {
    return <DevProvider devMode><Dev highlight>Development-only content</Dev></DevProvider>;
};

export const Default: Story = {
    render: () => <DefaultExample />,
};
