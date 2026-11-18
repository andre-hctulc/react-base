import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stat } from "../src/components/stat.js";

const meta = { title: "Components/Stat" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const StatisticExample: FC = () => {
    return (
        <Stat value={42} description="Open items" unit="items">
            <span className="block text-lg font-semibold">42</span>
        </Stat>
    );
};

export const Statistic: Story = {
    render: () => <StatisticExample />,
};
