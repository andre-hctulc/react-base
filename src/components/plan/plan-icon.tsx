import StarIcon from "@react-client/components/icons/collection/star";
import type { PropsOf } from "@react-client/util";
import clsx from "clsx";

export default function PlanIcon(props: PropsOf<typeof StarIcon>) {
    const classes = clsx("text-plan-star", props.className);
    return <StarIcon {...props} className={classes} />;
}
