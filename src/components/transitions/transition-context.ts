import { createContext } from "react";

interface TransitionContextType {
    show: boolean;
}

export const TransitionContext = createContext<TransitionContextType | null>(null);
