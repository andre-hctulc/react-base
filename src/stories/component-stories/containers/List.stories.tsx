import type { Meta, StoryObj } from "@storybook/react";
import { ListItem } from "../../../components/containers/list-item.js";
import { List } from "../../../components/containers/list.js";

// #### META ####
const meta = {
    title: "containers/list",
    component: List,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        // remove from ui
        items: { table: { disable: true } },
        style: { table: { disable: true } },
        className: { table: { disable: true } },
        onItemClick: { table: { disable: true } },
        children: { table: { disable: true } },
        activeItems: { table: { disable: true } },
        LinkComponent: { table: { disable: true } },
        loading: { table: { disable: true } },
        variant: { table: { disable: true } },
        iconButtonProps: { table: { disable: true } },
        listItemProps: { table: { disable: true } },
        as: { table: { disable: true } },
    },
    args: {},
} satisfies Meta<typeof List>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

const items: ListItem[] = Array.from({ length: 10 }, (_, i) => ({
    key: (i + 1).toString(),
    label: `Item${i + 1}`,
}));

export const Default: Story = {
    render: (args) => <List {...args} />,
    args: { items },
};
// ---- STORIES ----
