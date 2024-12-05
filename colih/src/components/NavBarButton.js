export default function NavBarButton(props){
    return <div style={{ cursor: "pointer", display: "grid", gridTemplateRows: "50px 1fr" }}>
        <div style={{ 
            gridRow: "1", 
            fontSize: "28pt" }}>{props.icon}</div>
        <div style={{ 
            gridRow: "2",
            fontSize: "12pt",
            marginBottom: "25px" }}>{props.text}</div>
    </div>
}