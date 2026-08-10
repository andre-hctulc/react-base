import { createContext } from "react";

interface TransitionContextValue {
    show: boolean;
}

export const TransitionContext = createContext<TransitionContextValue | null>(null);
