import root from './StaticStyles'

export default function ProfileItem(props) {
    return <div style={{ 
            display: "grid",
            gridTemplateColumns: "150px 1fr",
            width: "100%"
        }}>
        <img style={{ 
            cursor: "pointer",
            objectFit: "cover",
            borderRadius: "35px",
            gridColumn: "1"
        }} 
        width="150px" 
        height="150px" 
        src={props.img} onClick={props.onClick} />
        <div
            style={{ 
                gridColumn: "2", 
                marginLeft: "15px" }}>
                <div style={{
                    cursor: "pointer",
                    marginTop: "30px",
                    lineHeight: "30px", 
                    fontSize: "24pt", 
                    color: "#434957" }} onClick={props.onClick}>{props.name}</div>
                <div style={{
                    lineHeight: "30px", 
                    fontSize: "18pt",
                    color: "#AFB2B9" }}>{props.secondText}</div>
                <div style={{
                    lineHeight: "30px", 
                    fontSize: "18pt", 
                    color: root.primaryColor }}>{props.thirdText}</div>
            </div>
     </div>
}