import type { Meta, StoryObj } from "@storybook/react-vite";
import { LabeledSeparator } from "../src/components/labeled-separator.js";
import { Page, PageContent, PageHeader } from "../src/components/page.js";

const meta = { title: "Components/Page" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const boxClassName = "rounded-md border bg-muted px-3 py-2 text-sm";

export const PageStructure: Story = {
    render: () => (
        <Page className="overflow-hidden rounded-lg border">
            <PageHeader title="Account settings" actions={<span className={boxClassName}>Save</span>} />
            <LabeledSeparator>Profile</LabeledSeparator>
            <PageContent>
                <p className="text-muted-foreground">
                    Page content is constrained by the selected page width.
                </p>
            </PageContent>
        </Page>
    ),
};
