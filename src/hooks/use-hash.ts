"use client";

import { useEffect, useState } from "react";

export function useHash(): string {
    const [hash, setHash] = useState<string>(() => {
        if (typeof window !== "undefined") {
            return window.location.hash;
        }
        return "";
    });

    useEffect(() => {
        const updateHash = () => {
            setHash(window.location.hash);
        };

        window.addEventListener("hashchange", updateHash);

        return () => {
            window.removeEventListener("hashchange", updateHash);
        };
    }, []);

    return hash;
}
