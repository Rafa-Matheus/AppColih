export default function FloatingButton(props) {
    return <div style={{ 
                display: "flex",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20pt",
                position: "absolute",
                bottom: "170px",
                right: "20px", 
                width: "70px", 
                height: "70px", 
                borderRadius: "40px", 
                background: "#2E78E9",
                color: "white",
                boxShadow: "0 10px 10px rgba(0, 0, 0, .09)",
                zIndex: "0" }} onClick={props.onClick}>
        {props.children}
    </div>
}