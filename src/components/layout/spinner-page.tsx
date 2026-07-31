import { cn } from "@/util/cn.js";
import { collapse } from "@dre44/util/objects";
import { PageContent } from "./page-content.js";
import { Page, type PageProps } from "./page.js";

const spinnerSizeMap = {
    xs: "size-3",
    sm: "size-4",
    md: "size-6",
    lg: "size-8",
    xl: "size-10",
    "2xl": "size-12",
    "3xl": "size-14",
    "4xl": "size-16",
    "5xl": "size-20",
} as const;

type SpinnerSize = keyof typeof spinnerSizeMap;

const Spinner = ({ size = "2xl" }: { size?: SpinnerSize }) => (
    <div
        className={cn(
            "animate-spin rounded-full border-4 border-gray-200 border-t-current",
            collapse(spinnerSizeMap, size),
        )}
    />
);

export interface SpinnerPageProps extends Omit<PageProps, "children"> {
    spinnerSize?: SpinnerSize;
}

export const SpinnerPage: React.FC<SpinnerPageProps> = ({ spinnerSize, ...props }) => (
    <Page {...props}>
        <PageContent height="full" flex="col" className="items-center justify-center">
            <Spinner size={spinnerSize || "2xl"} />
        </PageContent>
    </Page>
);
