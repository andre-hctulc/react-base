import type { Meta, StoryObj } from "@storybook/react";
import { Page, PageContent, PageFooter, PageHeader } from "../../../components/layout";

// #### META ####
const meta = {
    title: "layout/page",
    component: Page,
    parameters: {
        layout: "centered",
    },
    argTypes: { variant: { control: "select", options: ["center", "default", "flex-row", "flex-col"] } },
} satisfies Meta<typeof Page>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => (
        <Page {...args}>
            <PageHeader title="Page header Title" actions={<span>actions</span>}></PageHeader>
            <PageContent>Page content</PageContent>
            <PageFooter>Page footer</PageFooter>
        </Page>
    ),
    args: { variant: "default" },
};
// ---- STORIES ----
