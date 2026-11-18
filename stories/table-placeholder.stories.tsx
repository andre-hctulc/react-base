import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table, TableBody } from "../src/components/ui/table.js";
import { TablePlaceholder } from "../src/components/table-placeholder.js";

const meta = { title: "Components/TablePlaceholder" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const TableLoadingPlaceholderExample: FC = () => {
    return (
        <Table>
            <TableBody>
                <TablePlaceholder />
            </TableBody>
        </Table>
    );
};

export const TableLoadingPlaceholder: Story = {
    render: () => <TableLoadingPlaceholderExample />,
};
