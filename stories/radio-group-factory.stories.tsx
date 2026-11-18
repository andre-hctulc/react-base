import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroupFactory } from "../src/components/radio-group-factory.js";

const meta = { title: "Components/RadioGroupFactory" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const DefaultExample: FC = () => {
    return (
        <RadioGroupFactory variant="cards" options={[
            { title: "Personal", value: "personal", description: "Only you can access it." },
            { title: "Team", value: "team", description: "Share with your workspace." },
        ]} defaultValue="team" />
    );
};

export const Default: Story = {
    render: () => <DefaultExample />,
};
