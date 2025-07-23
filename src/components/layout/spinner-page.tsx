import type { PropsOf } from "../../types/index.js";
import { Spinner } from "../data-display/spinner.js";
import { PageContent } from "./page-content.js";
import { Page } from "./page.js";

export interface SpinnerPageProps extends Omit<PropsOf<typeof Page>, "children"> {
    spinnerSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}

export const SpinnerPage: React.FC<SpinnerPageProps> = ({ className, spinnerSize, ...props }) => {
    return (
        <Page {...props}>
            <PageContent fullHeight flex="col" className="items-center justify-center">
                <Spinner size={spinnerSize || "2xl"} />
            </PageContent>
        </Page>
    );
};
