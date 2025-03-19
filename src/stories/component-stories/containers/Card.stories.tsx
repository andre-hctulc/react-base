import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardBody, CardFooter, CardHeader } from "../../../components/containers/card.js";
import { IconButton } from "../../../components/index.js";
import { InfoCircleIcon } from "../../../components/icons/info-circle.js";

// #### META ####
const meta = {
    title: "containers/card",
    component: Card,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        variant: { control: "select", options: ["custom", "elevated", "outlined"] },
        title: { control: "text" },
        shadow: { control: "select", options: ["lg", "none", "sm", "md", "base", "xl"] },
        size: { control: "select", options: ["lg", "xs", "sm", "md", "xl"] },
        rounded: { control: "select", options: ["lg", "none", "xs", "sm", "md"] },
        // remove from ui
        defaultValue: { table: { disable: true } },
        onChange: { table: { disable: true } },
        id: { table: { disable: true } },
        style: { table: { disable: true } },
        className: { table: { disable: true } },
        as: { table: { disable: true } },
    },
    args: {},
} satisfies Meta<typeof Card>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => (
        <Card {...args}>
            <CardHeader
                title={args.title || "Card title"}
                actions={
                    <>
                        <IconButton>
                            <InfoCircleIcon></InfoCircleIcon>
                        </IconButton>
                    </>
                }
            ></CardHeader>
            <CardBody>some content</CardBody>
            <CardFooter>Footer</CardFooter>
        </Card>
    ),
    args: { size: "md" },
};
// ---- STORIES ----
