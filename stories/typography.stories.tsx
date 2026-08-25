import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleCheck } from "lucide-react";
import { ColorText, ErrorText, SuccessText } from "../src/components/color-text.js";
import { Dot } from "../src/components/dot.js";
import { Icon } from "../src/components/icon.js";
import { LabelMimic } from "../src/components/label-mimic.js";
import { Stat } from "../src/components/stat.js";
import { Subtitle } from "../src/components/subtitle.js";
import { TextBlock } from "../src/components/text-block.js";
import { Title } from "../src/components/title.js";
import { Typography } from "../src/components/typography.js";

const meta = {
    title: "Components/Typography",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeadingsAndText: Story = {
    render: () => (
        <div className="max-w-xl space-y-4">
            <Title icon={<CircleCheck />}>Workspace access</Title>
            <Subtitle variant="h3">Review details</Subtitle>
            <Typography textSize="sm" lineHeight="relaxed">
                Typography provides small, composable text treatments for product interfaces.
            </Typography>
            <TextBlock lines="2" className="max-w-sm">
                This longer message demonstrates multiline truncation while preserving readable text wrapping.
            </TextBlock>
        </div>
    ),
};

export const StatusText: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-4">
            <ColorText color="info">Information</ColorText>
            <SuccessText>Completed</SuccessText>
            <ErrorText>Needs attention</ErrorText>
            <LabelMimic color="warning">Pending review</LabelMimic>
            <Icon color="success">
                <CircleCheck />
            </Icon>
            <Dot color="success" />
        </div>
    ),
};

export const Statistic: Story = {
    render: () => (
        <Stat value={42} description="Open items" unit="items">
            <span className="block text-lg font-semibold">42</span>
        </Stat>
    ),
};
