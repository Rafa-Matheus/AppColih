export default function CardItem(props) {
    return <div style={{ 
            width: "100%",
            background: "white",
            padding: "20px",
            borderRadius: "20px"
        }}>
        {props.children && props.children}
     </div>
}