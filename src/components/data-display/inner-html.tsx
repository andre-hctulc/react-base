export default function InnerHtml(props: { children: string; style?: React.CSSProperties }) {
    return <div style={props.style} dangerouslySetInnerHTML={{ __html: props.children }}/>;
}
