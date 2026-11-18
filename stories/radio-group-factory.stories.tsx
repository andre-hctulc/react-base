import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroupFactory } from "../src/components/radio-group-factory.js";

const meta = { title: "Components/RadioGroupFactory" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <RadioGroupFactory variant="cards" options={[
        { title: "Personal", value: "personal", description: "Only you can access it." },
        { title: "Team", value: "team", description: "Share with your workspace." },
    ]} defaultValue="team" />,
};
