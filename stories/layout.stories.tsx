import type { Meta, StoryObj } from "@storybook/react-vite";
import { Center, CenterH, CenterV } from "../src/components/center.js";
import { Flex } from "../src/components/flex.js";
import { LabeledSeparator } from "../src/components/labeled-separator.js";
import { Page, PageContent, PageHeader } from "../src/components/page.js";
import { Root } from "../src/components/root.js";
import { Spacer } from "../src/components/spacer.js";
import { TableOutline } from "../src/components/table-outline.js";
import { Toolbar } from "../src/components/toolbar.js";

const meta = {
    title: "Components/Layout",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const boxClassName = "rounded-md border bg-muted px-3 py-2 text-sm";

export const Containers: Story = {
    render: () => (
        <Root className="gap-6 rounded-lg border p-6">
            <Flex alignItems="center" justifyContent="between" className="gap-3">
                <span className={boxClassName}>Flex start</span>
                <span className={boxClassName}>Flex end</span>
            </Flex>
            <Spacer gap="sm">
                <span className={boxClassName}>Spacer item one</span>
                <span className={boxClassName}>Spacer item two</span>
            </Spacer>
            <Toolbar justifyContent="between" className="rounded-md border p-3">
                <span>Toolbar</span>
                <span className="text-muted-foreground text-sm">Actions</span>
            </Toolbar>
        </Root>
    ),
};

export const Alignment: Story = {
    render: () => (
        <div className="grid gap-4 sm:grid-cols-3">
            <Center className="h-28 rounded-md border bg-muted">Center</Center>
            <CenterH className="h-28 rounded-md border bg-muted pt-4">CenterH</CenterH>
            <CenterV className="h-28 rounded-md border bg-muted pl-4">CenterV</CenterV>
        </div>
    ),
};

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

export const TableFrame: Story = {
    render: () => (
        <TableOutline>
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b text-left">
                        <th className="p-3">Name</th>
                        <th className="p-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-3">Release checklist</td>
                        <td className="p-3">Ready</td>
                    </tr>
                </tbody>
            </table>
        </TableOutline>
    ),
};
