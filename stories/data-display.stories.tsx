import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "../src/components/ui/progress.js";
import { Table, TableBody } from "../src/components/ui/table.js";
import { Checklist } from "../src/components/checklist.js";
import { DataSummary } from "../src/components/data-summary.js";
import { DTable } from "../src/components/dtable.js";
import { ProgressDecorator } from "../src/components/progress-decorator.js";
import { TablePlaceholder } from "../src/components/table-placeholder.js";

const meta = {
    title: "Components/Data Display",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChecklistExample: Story = {
    render: () => (
        <Checklist
            checked={["profile", "security"]}
            items={[
                { key: "profile", title: "Profile", text: "Contact details saved" },
                { key: "security", title: "Security", text: "Two-factor authentication enabled" },
                { key: "billing", title: "Billing", text: "Add a payment method", secondary: true },
            ]}
        />
    ),
};

export const Summaries: Story = {
    render: () => (
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
    ),
};

export const ProgressExample: Story = {
    render: () => (
        <ProgressDecorator valueLabel="Migration" value="60%" description="Three of five steps completed">
            <Progress value={60} />
        </ProgressDecorator>
    ),
};

export const DataTable: Story = {
    render: () => (
        <DTable
            columns={
                [
                    { accessorKey: "name", header: "Name" },
                    { accessorKey: "status", header: "Status" },
                ] as any
            }
            data={[
                { name: "Audit trail", status: "Ready" },
                { name: "Access review", status: "In progress" },
            ]}
        />
    ),
};

export const TableLoadingPlaceholder: Story = {
    render: () => (
        <Table>
            <TableBody>
                <TablePlaceholder />
            </TableBody>
        </Table>
    ),
};
