import React from "react";

export default function useCurrentSearchParams() {
    const [searchParams, setSearchParams] = React.useState(() => new URLSearchParams(window.location.search));

    React.useEffect(() => {
        const handleSearchParamsChange = () => {
            setSearchParams(new URLSearchParams(window.location.search));
        };

        window.addEventListener("popstate", handleSearchParamsChange);

        return () => {
            window.removeEventListener("popstate", handleSearchParamsChange);
        };
    }, []);

    return searchParams;
}
