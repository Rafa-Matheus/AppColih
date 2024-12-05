export default function TitleDescription(props) {
    return <div style={{ 
            display: "flex",
            minWidth: "0",
            flexDirection: "column",
            justifyContent: "center" }}>
        <div style={{
            width: "100%",
            lineHeight: "20px",
            fontSize: "16pt", 
            color: "#AFB2B9",
            verticalAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis" }}>{props.title}</div>
        <div style={{
            width: "100%",
            lineHeight: "25px", 
            fontSize: "18pt", 
            color: "#434957",
            whiteSpace: "nowrap",      
            overflow: "hidden",
            textOverflow: "ellipsis" }}>{props.description}</div>
    </div>
}