import { Spinner } from "flowbite-react/components/Spinner";
import { PageContent } from "./page-content.js";
import { Page, type PageProps } from "./page.js";

export interface SpinnerPageProps extends Omit<PageProps, "children"> {
    spinnerSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}

export const SpinnerPage: React.FC<SpinnerPageProps> = ({ className, spinnerSize, ...props }) => {
    return (
        <Page {...props}>
            <PageContent height="full" flex="col" className="items-center justify-center">
                <Spinner size={spinnerSize || "2xl"} />
            </PageContent>
        </Page>
    );
};
