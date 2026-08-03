import { PageContent } from "./page-content.js";
import { Page, type PageProps } from "./page.js";
import { Spinner } from "@/ui/spinner.js";

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

export interface SpinnerPageProps extends Omit<PageProps, "children"> {
    spinnerSize?: SpinnerSize;
}

export const SpinnerPage: React.FC<SpinnerPageProps> = ({ spinnerSize, ...props }) => (
    <Page {...props}>
        <PageContent height="full" flex="col" className="items-center justify-center">
            <Spinner className={spinnerSizeMap[spinnerSize || "2xl"]} />
        </PageContent>
    </Page>
);
