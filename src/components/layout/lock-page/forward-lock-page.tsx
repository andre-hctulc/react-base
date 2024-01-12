import ArrowRightIcon from "@react-client/components/icons/collection/arrow-right";
import LockPage from "./lock-page";
import Typography from "@react-client/components/text/typography";

export default function ForwardLockPage() {
    return (
        <LockPage icon={<ArrowRightIcon />} loading>
            <Typography disabled className="text-center" variant="caption">
                Du wirst jeden Moment weitergeleitet...
            </Typography>
        </LockPage>
    );
}
