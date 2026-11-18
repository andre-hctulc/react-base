import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table, TableBody } from "../src/components/ui/table.js";
import { TablePlaceholder } from "../src/components/table-placeholder.js";

const meta = { title: "Components/TablePlaceholder" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const TableLoadingPlaceholder: Story = {
    render: () => (
        <Table>
            <TableBody>
                <TablePlaceholder />
            </TableBody>
        </Table>
    ),
};
