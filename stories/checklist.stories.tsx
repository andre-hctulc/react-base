import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checklist } from "../src/components/checklist.js";

const meta = { title: "Components/Checklist" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const ChecklistExampleExample: FC = () => {
    return (
        <Checklist
            checked={["profile", "security"]}
            items={[
                { key: "profile", title: "Profile", text: "Contact details saved" },
                { key: "security", title: "Security", text: "Two-factor authentication enabled" },
                { key: "billing", title: "Billing", text: "Add a payment method", secondary: true },
            ]}
        />
    );
};

export const ChecklistExample: Story = {
    render: () => <ChecklistExampleExample />,
};
