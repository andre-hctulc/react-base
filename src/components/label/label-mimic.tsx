"use client";

import { type FC } from "react";
import { Label, labelTheme, type LabelProps, type LabelTheme } from "flowbite-react";
import { useResolveT } from "../../hooks/index.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        labelMimic: LabelMimicTheme;
    }

    interface FlowbiteProps {
        labelMimic: Partial<WithoutThemingProps<LabelMimicProps>>;
    }
}

const labelMimicTheme = {
    // Make labelTheme compatible with useResolveT. See https://flowbite-react.com/docs/components/forms for original label theme
    ...labelTheme.root,
    disabled: {
        on: "opacity-50",
        off: "",
    },

    defaultVariants: {},
};

export interface LabelMimicTheme extends LabelTheme {}

export interface LabelMimicProps extends LabelProps {}

/**
 *
 * A {@link Label} as *span*.
 */
export const LabelMimic: FC<LabelMimicProps> = (props) => {
    const { className, restProps, children } = useResolveT("label", labelMimicTheme, props);

    return (
        <span className={className} {...restProps}>
            {children}
        </span>
    );
};
