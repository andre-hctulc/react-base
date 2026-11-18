import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TableOutline } from "../src/components/table-outline.js";

const meta = { title: "Components/TableOutline" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const TableFrameExample: FC = () => {
    return (
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
    );
};

export const TableFrame: Story = {
    render: () => <TableFrameExample />,
};
