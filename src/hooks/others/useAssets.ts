import React from "react";

/**
 * Lädt Assets aus dem _public_ Ordner.
 * @param key Query key. Dieser gilt user-übergreifend.
 * @param path Pfad _public_ Ordner
 * @param options
 */
export default function useAsset<B extends boolean = false>(
    path: string | null,
    options?: { loadBuffer?: B; enabled?: boolean; requestInit?: RequestInit }
): { data: B extends true ? ArrayBuffer | undefined : string | undefined; error: Error | null; isLoading: boolean } {
    const [data, setData] = React.useState<any>();
    const [error, setError] = React.useState<Error | null>(null);

    React.useEffect(() => {
        if (!path) {
            setData(undefined);
            setError(null);
            return;
        }

        let interrupted = false;

        async function load() {
            if (!path) throw new Error("Path is null or undefined");

            try {
                let result: any;
                // TODO `cache`
                const response = await fetch(path, { cache: "force-cache", ...options?.requestInit });
                if (!response.ok) throw new Error("Response not ok");
                if (interrupted) return;
                if (options?.loadBuffer) result = await response.arrayBuffer();
                else result = await response.text();
                if (interrupted) return;
                setData(result);
                setError(null);
            } catch (err) {
                setError(err as Error);
                setData(undefined);
            }
        }

        load();

        return () => {
            interrupted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path]);

    return { data: data, isLoading: data === undefined && !error && !!path, error };
}
