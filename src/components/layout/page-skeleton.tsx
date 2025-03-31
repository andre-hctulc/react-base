import { Skeleton } from "../data-display/skeleton.js";
import { PageContent } from "./page-content.js";
import { Page, type PageProps } from "./page.js";

interface PageSkeletonProps extends Omit<PageProps, "children"> {
    body?: React.ReactNode;
}

export const PageSkeleton: React.FC<PageSkeletonProps> = ({ className, body, ...props }) => {
    return (
        <Page {...props}>
            <PageContent fullHeight>
                <div className="flex gap-3">
                    <Skeleton className="w-1/2 max-w-[300px]" shape="rounded_xl" height={43}></Skeleton>
                    <Skeleton className="ml-auto" size={43} shape="circle" />
                    <Skeleton size={43} shape="circle" />
                </div>
                {body ?? (
                    <>
                        <div className="flex mt-10 md:mt-14 gap-5 flex-wrap">
                            <Skeleton width={350} height={250} />
                            <div className="space-y-4">
                                <Skeleton width={350} height={43} />
                                <Skeleton width={100} height={30} />
                                <Skeleton width={200} height={30} />
                                <Skeleton width={120} height={30} />
                            </div>
                        </div>
                        <div className="mt-14 space-y-4">
                            <Skeleton className="w-3/4" height={100} />
                            <Skeleton className="w-full" height={100} />
                            <Skeleton className="w-1/2" height={100} />
                        </div>
                    </>
                )}
            </PageContent>
        </Page>
    );
};
