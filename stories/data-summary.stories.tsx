import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataSummary } from "../src/components/data-summary.js";

const meta = { title: "Components/DataSummary" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const SummariesExample: FC = () => {
    return (
        <div className="grid gap-8 md:grid-cols-2">
            <DataSummary
                data={{ plan: "Platform", seats: 12, enabled: true, regions: ["us-east-1", "eu-west-1"] }}
            />
            <DataSummary
                data={{
                    verVerVerVerVerVerLongKey:
                        "VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongValue",
                    verVerVerVerVerVerLongKey2:
                        "VeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongValue2",
                }}
            />
        </div>
    );
};

export const Summaries: Story = {
    render: () => <SummariesExample />,
};
