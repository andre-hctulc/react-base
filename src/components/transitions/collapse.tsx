import { Transition } from "@headlessui/react";
import type { PropsOf } from "../../types/index.js";

interface CollapseVProps extends PropsOf<typeof Transition> {}

export const CollapseVScreen: React.FC<CollapseVProps> = props => {
    return (
        <Transition
            enter={"transition-all duration-300 ease-out"}
            enterFrom="max-h-0"
            enterTo="max-h-screen"
            leave={"transition-all duration-300 ease-in"}
            leaveFrom="max-h-screen"
            leaveTo="max-h-0"
            {...props}
        >
            {props.children}
        </Transition>
    );
};

export const CollapseV500: React.FC<CollapseVProps> = props => {
    return (
        <Transition
            enter={"transition-all duration-300 ease-out"}
            enterFrom="max-h-0"
            enterTo="max-h-[500px]"
            leave={"transition-all duration-300 ease-in"}
            leaveFrom="max-h-screen"
            leaveTo="max-h-[500px]"
            {...props}
        >
            {props.children}
        </Transition>
    );
};

export const CollapseV750: React.FC<CollapseVProps> = props => {
    return (
        <Transition
            enter={"transition-all duration-300 ease-out"}
            enterFrom="max-h-0"
            enterTo="max-h-[750px]"
            leave={"transition-all duration-300 ease-in"}
            leaveFrom="max-h-[750px]"
            leaveTo="max-h-0"
            {...props}
        >
            {props.children}
        </Transition>
    );
};

export const CollapseV300: React.FC<CollapseVProps> = props => {
    return (
        <Transition
            enter={"transition-all duration-300 ease-out"}
            enterFrom="max-h-0"
            enterTo="max-h-[300px]"
            leave={"transition-all duration-300 ease-in"}
            leaveFrom="max-h-[300px]"
            leaveTo="max-h-0"
            {...props}
        >
            {props.children}
        </Transition>
    );
};

export const CollapseV100: React.FC<CollapseVProps> = props => {
    return (
        <Transition
            enter={"transition-all duration-300 ease-out"}
            enterFrom="max-h-0"
            enterTo="max-h-[100px]"
            leave={"transition-all duration-300 ease-in"}
            leaveFrom="max-h-[100px]"
            leaveTo="max-h-0"
            {...props}
        >
            {props.children}
        </Transition>
    );
};

export const CollapseV1000: React.FC<CollapseVProps> = props => {
    return (
        <Transition
            enter={"transition-all duration-500 ease-out"}
            enterFrom="max-h-0"
            enterTo="max-h-[1000px]"
            leave={"transition-all duration-500 ease-in"}
            leaveFrom="max-h-[1000px]"
            leaveTo="max-h-0"
            {...props}
        >
            {props.children}
        </Transition>
    );
};

export const CollapseV2000: React.FC<CollapseVProps> = props => {
    return (
        <Transition
            enter={"transition-all duration-700 ease-out"}
            enterFrom="max-h-0"
            enterTo="max-h-[2000px]"
            leave={"transition-all duration-700 ease-in"}
            leaveFrom="max-h-[2000px]"
            leaveTo="max-h-0"
            {...props}
        >
            {props.children}
        </Transition>
    );
};

export interface CollapseHProps extends PropsOf<typeof Transition> {}

export const CollapseHScreen: React.FC<CollapseHProps> = props => {
    return (
        <Transition
            enter={"transition-all duration-300 ease-out"}
            enterFrom="max-w-0"
            enterTo="max-w-screen"
            leave={"transition-all duration-300 ease-in"}
            leaveFrom="max-w-screen"
            leaveTo="max-w-0"
            {...props}
        >
            {props.children}
        </Transition>
    );
};

export const CollapseH500: React.FC<CollapseHProps> = props => {
    return (
        <Transition
            enter={"transition-all duration-300 ease-out"}
            enterFrom="max-w-0"
            enterTo="max-w-[500px]"
            leave={"transition-all duration-300 ease-in"}
            leaveFrom="max-w-[500px]"
            leaveTo="max-w-0"
            {...props}
        >
            {props.children}
        </Transition>
    );
};

export const CollapseH750: React.FC<CollapseHProps> = props => {
    return (
        <Transition
            enter={"transition-all duration-300 ease-out"}
            enterFrom="max-w-0"
            enterTo="max-w-[750px]"
            leave={"transition-all duration-300 ease-in"}
            leaveFrom="max-w-[750px]"
            leaveTo="max-w-0"
            {...props}
        >
            {props.children}
        </Transition>
    );
};

export const CollapseH300: React.FC<CollapseHProps> = props => {
    return (
        <Transition
            enter={"transition-all duration-300 ease-out"}
            enterFrom="max-w-0"
            enterTo="max-w-[300px]"
            leave={"transition-all duration-300 ease-in"}
            leaveFrom="max-w-[300px]"
            leaveTo="max-w-0"
            {...props}
        >
            {props.children}
        </Transition>
    );
};

export const CollapseH100: React.FC<CollapseHProps> = props => {
    return (
        <Transition
            enter={"transition-all duration-300 ease-out"}
            enterFrom="max-w-0"
            enterTo="max-w-[100px]"
            leave={"transition-all duration-300 ease-in"}
            leaveFrom="max-w-[100px]"
            leaveTo="max-w-0"
            {...props}
        >
            {props.children}
        </Transition>
    );
};

export const CollapseH1000: React.FC<CollapseHProps> = props => {
    return (
        <Transition
            enter={"transition-all duration-500 ease-out"}
            enterFrom="max-w-0"
            enterTo="max-w-[1000px]"
            leave={"transition-all duration-500 ease-in"}
            leaveFrom="max-w-[1000px]"
            leaveTo="max-w-0"
            {...props}
        >
            {props.children}
        </Transition>
    );
};

export const CollapseH2000: React.FC<CollapseHProps> = props => {
    return (
        <Transition
            enter={"transition-all duration-700 ease-out"}
            enterFrom="max-w-0"
            enterTo="max-w-[2000px]"
            leave={"transition-all duration-700 ease-in"}
            leaveFrom="max-w-[2000px]"
            leaveTo="max-w-0"
            {...props}
        >
            {props.children}
        </Transition>
    );
};
