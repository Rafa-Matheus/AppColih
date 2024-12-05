export default function VerticalFlexContainer(props) {
    return <div style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        rowGap: props.gap ?? "20px" }}>
        {props.children}
    </div>
}