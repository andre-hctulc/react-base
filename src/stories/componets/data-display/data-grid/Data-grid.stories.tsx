import type { Meta, StoryObj } from "@storybook/react";
import { DataGrid } from "../../../../components/data-display/data-grid";

// #### META ####
const meta = {
    title: "data-display/data-grid/data-grid",
    component: DataGrid,
    parameters: {
        layout: "centered",
    },
    argTypes: {},
} satisfies Meta<typeof DataGrid>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

const data: { id: string; text: string; value: number }[] = [
    { id: "1", text: "1 Element", value: 10 },
    { id: "2", text: "2 Element", value: 20 },
    { id: "3", text: "3 Element", value: 30 },
    { id: "4", text: "4 Element", value: 40 },
    { id: "5", text: "5 Element", value: 50 },
];

export const Default: Story = {
    args: {
        cols: [
            { label: "ID", path: "id" },
            { label: "Text", path: "text" },
            { label: "Number", path: "value" },
        ],
        rows: data,
        rowId: row => (row as any).id,
    },
};
// ---- STORIES ----
