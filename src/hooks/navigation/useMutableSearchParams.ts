import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";

type MutableSearchParams = [ReadonlyURLSearchParams, (paramName: string, value: string | null | number | boolean) => void];

/** @return `[setParam, searchParams]` */
export default function useMutableSearchParams(): MutableSearchParams {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function setParam(paramName: string, newVlaue: string | null | number | boolean) {
        const newSearchParams = new URLSearchParams(Array.from(searchParams?.keys() || []).map(pName => [pName, searchParams?.get(pName) as string]));

        if (newVlaue === null) newSearchParams.delete(paramName);
        else newSearchParams.set(paramName, newVlaue + "");

        // searchString ist "", falls keine params vorhanden sind
        const searchString = newSearchParams.toString();

        router.push(`${pathname}${searchString && "?"}${searchString}`);
    }

    return [searchParams as ReadonlyURLSearchParams, setParam];
}
