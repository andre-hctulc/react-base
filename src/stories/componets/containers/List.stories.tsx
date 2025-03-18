import type { Meta, StoryObj } from "@storybook/react";
import { List, ListItem } from "../../../components/containers";

// #### META ####
const meta = {
    title: "containers/list",
    component: List,
    parameters: {
        layout: "centered",
    },
    argTypes: {},
    args: {},
} satisfies Meta<typeof List>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

const items: ListItem[] = Array.from({ length: 10 }, (_, i) => ({ key: (i + 1).toString(), label: `Item${i + 1}` }));

export const Default: Story = {
    args: { items },
};
// ---- STORIES ----
