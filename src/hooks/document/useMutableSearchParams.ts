import useCurrentSearchParams from "./useCurrentSearchParams";
import useCurrentPathname from "./useCurrentPathname";

type MutableSearchParams = [Omit<URLSearchParams, "set" | "append">, (paramName: string, value: string | null | number | boolean) => void];

/**
 * @param router Use the _Next-Router_ when using **Next.js**
 * @return `[setParam, searchParams]`
 * */
export default function useMutableSearchParams(router?: { push: (href: string) => void }): MutableSearchParams {
    const pathname = useCurrentPathname();
    const searchParams = useCurrentSearchParams();

    function setParam(paramName: string, newVlaue: string | null | number | boolean) {
        const newSearchParams = new URLSearchParams(Array.from(searchParams?.keys() || []).map(pName => [pName, searchParams?.get(pName) as string]));

        if (newVlaue === null) newSearchParams.delete(paramName);
        else newSearchParams.set(paramName, newVlaue + "");

        // searchString is "" for empty searchParams
        const searchString = newSearchParams.toString();
        const href = `${pathname}${searchString && "?"}${searchString}`;

        if (router) router.push(href);
        else location.href = href;
    }

    return [searchParams, setParam];
}
