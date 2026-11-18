import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DTable } from "../src/components/dtable.js";

const meta = { title: "Components/Dtable" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const DataTableExample: FC = () => {
    return (
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
    );
};

export const DataTable: Story = {
    render: () => <DataTableExample />,
};
