import type { Meta, StoryObj } from "@storybook/react-vite";
import { DTable } from "../src/components/dtable.js";

const meta = { title: "Components/Dtable" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

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
