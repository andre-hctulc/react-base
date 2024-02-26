import React from "react";

const useCurrentPathname = () => {
    const [pathname, setPathname] = React.useState(window.location.pathname);

    React.useEffect(() => {
        const handlePathnameChange = () => {
            setPathname(window.location.pathname);
        };

        window.addEventListener("popstate", handlePathnameChange);

        return () => {
            window.removeEventListener("popstate", handlePathnameChange);
        };
    }, []);

    return pathname;
};

export default useCurrentPathname;
