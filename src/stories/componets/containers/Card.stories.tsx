import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardBody, CardFooter, CardHeader } from "../../../components/containers";

// #### META ####
const meta = {
    title: "containers/card",
    component: Card,
    parameters: {
        layout: "centered",
    },
    argTypes: {},
    args: {},
} satisfies Meta<typeof Card>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => (
        <Card {...args}>
            <CardHeader title="Card Header"></CardHeader>
            <CardBody>Body Content</CardBody>
            <CardFooter>Footer</CardFooter>
        </Card>
    ),
    args: {
        size: "lg",
    },
};
// ---- STORIES ----
