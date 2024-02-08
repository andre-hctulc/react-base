interface DevTabProps {
    title: string;
    children?: React.ReactNode;
}

export default function DevTab(props: DevTabProps) {
    return <>{props.children}</>;
}
