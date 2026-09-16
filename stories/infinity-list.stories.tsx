import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type FC } from "react";
import { InfinityList } from "../src/components/infinity-list.js";

const meta = {
    title: "Components/Infinity List",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface ItemListProps {
    items: number[];
}

const ItemList: FC<ItemListProps> = ({ items }) => {
    return (
        <div className="space-y-2 p-3">
            {items.map((item) => (
                <div key={item} className="rounded-md border bg-background px-3 py-2 text-sm">
                    Item {item}
                </div>
            ))}
        </div>
    );
};

interface PageLoaderProps {
    tail?: number;
    slow?: boolean;
}

const PageLoader: FC<PageLoaderProps> = ({ tail, slow }) => {
    const allItems = Array.from({ length: 24 }, (_, index) => index);
    const initialPageIndex = tail === undefined ? 0 : 3;
    const loader = (pageIndex: number, pageSize: number) => {
        if (slow) {
            return new Promise<number[]>((resolve) => {
                setTimeout(() => {
                    resolve(allItems.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize));
                }, 1000);
            });
        }
        return Promise.resolve(allItems.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize));
    };

    return (
        <InfinityList
            className="h-64 max-w-md overflow-y-auto rounded-md border bg-muted/30"
            defaultItems={allItems.slice(initialPageIndex * 3, (initialPageIndex + 1) * 3)}
            initialPageIndex={initialPageIndex}
            tail={tail}
            triggerOffset={tail === undefined ? undefined : 0}
            previousTriggerOffset={tail === undefined ? undefined : 0}
            pageSize={3}
            loader={loader}
        >
            {(items) => <ItemList items={items} />}
        </InfinityList>
    );
};

function ErrorExample() {
    const [error, setError] = useState<string>();

    return (
        <div className="space-y-2">
            <InfinityList
                className="h-64 max-w-md overflow-y-auto rounded-md border bg-muted/30"
                loader={() => Promise.reject(new Error("Unable to load more items"))}
                onError={(error) => setError(error instanceof Error ? error.message : "Unknown error")}
            >
                {(items) => <ItemList items={items} />}
            </InfinityList>
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}

function ControlledExample() {
    const [items, setItems] = useState([0, 1, 2, 3, 4]);

    return (
        <InfinityList
            className="h-64 max-w-md overflow-y-auto rounded-md border bg-muted/30"
            items={items}
            onTrigger={() =>
                setItems((currentItems) => [
                    ...currentItems,
                    ...currentItems.slice(-2).map((item) => item + 2),
                ])
            }
        >
            {(currentItems) => <ItemList items={currentItems} />}
        </InfinityList>
    );
}

export const AutomaticLoading: Story = {
    render: () => <PageLoader />,
};

export const RetainedTail: Story = {
    render: () => <PageLoader tail={2} />,
};

export const LoaderError: Story = {
    render: () => <ErrorExample />,
};

export const Controlled: Story = {
    render: () => <ControlledExample />,
};

export const Loading: Story = {
    render: () => <PageLoader slow />,
};
