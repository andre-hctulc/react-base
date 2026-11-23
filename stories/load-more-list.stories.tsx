import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type FC } from "react";
import { LoadMoreList, type LoadMoreListProps } from "../src/components/load-more-list.js";

const meta = {
    title: "Components/Load More List",
    parameters: {
        docs: {
            description: {
                component:
                    "Shows a spinner while loading the first page, then loads more only when the button is clicked. " +
                    "Use loader for SWR pagination, or items, hasMore, loading and onLoadMore for controlled data. " +
                    "Customize the action with loadMoreLabel, buttonProps and buttonContainerProps.",
            },
        },
    },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const allItems = Array.from({ length: 8 }, (_, index) => index + 1);
const loader: NonNullable<LoadMoreListProps<number>["loader"]> = (pageIndex, pageSize) =>
    allItems.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

function renderItems(items: number[]) {
    return items.map((item) => (
        <li key={item} className="rounded-md border bg-background px-3 py-2 text-sm">
            Item {item}
        </li>
    ));
}

const DefaultExample: FC = () => {
    return (
        <LoadMoreList as="ul" className="max-w-md space-y-2" pageSize={3} loader={loader}>
            {renderItems}
        </LoadMoreList>
    );
};

export const Default: Story = {
    render: () => <DefaultExample />,
};

const SlowLoaderExample: FC = () => {
    return (
        <LoadMoreList
            as="ul"
            className="max-w-md space-y-2"
            pageSize={3}
            loader={async (...args) => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                return loader(...args);
            }}
        >
            {renderItems}
        </LoadMoreList>
    );
};

export const SlowLoader: Story = {
    render: () => <SlowLoaderExample />,
};

const ShortFirstPageExample: FC = () => {
    return (
        <LoadMoreList as="ul" pageSize={10} loader={loader}>
            {renderItems}
        </LoadMoreList>
    );
};

export const ShortFirstPage: Story = {
    render: () => <ShortFirstPageExample />,
};

const EmptyExample: FC = () => {
    return (
        <LoadMoreList<number> loader={() => []} empty="No items found">
            {() => null}
        </LoadMoreList>
    );
};

export const Empty: Story = {
    render: () => <EmptyExample />,
};

const LoaderErrorExample: FC = () => {
    return (
        <LoadMoreList<number>
            loader={() => Promise.reject(new Error("Unable to load items"))}
            error="Unable to load items"
            swrOptions={{ shouldRetryOnError: false }}
        >
            {() => null}
        </LoadMoreList>
    );
};

export const LoaderError: Story = {
    render: () => <LoaderErrorExample />,
};

const ControlledExample: FC = () => {
    const [items, setItems] = useState(allItems.slice(0, 3));

    return (
        <LoadMoreList
            as="ul"
            className="max-w-md space-y-2"
            items={items}
            hasMore={items.length < allItems.length}
            onLoadMore={() => setItems(allItems.slice(0, items.length + 3))}
            loadMoreLabel="Show more items"
        >
            {renderItems}
        </LoadMoreList>
    );
};

export const Controlled: Story = {
    render: () => <ControlledExample />,
};
