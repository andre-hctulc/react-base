interface NavMenuProps {
    children?: React.ReactNode;
}

export default function NavMenu(props: NavMenuProps) {
    return <nav>{props.children}</nav>;
}
