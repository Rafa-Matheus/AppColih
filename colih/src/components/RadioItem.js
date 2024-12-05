import RadioBox from 'components/Radiobox'

export default function RadioItem(props) {
    return <div style={{ 
        display: "grid", 
        gridTemplateColumns: "40px 1fr", 
        height: "40px",
        width: "100%" }}>
        <div style={{ 
            display: "flex",
            alignItems: "center",
            gridColumn: "1" }}><RadioBox isChecked={props.isChecked} onClick={props.onClick}/></div>
        <div style={{ 
            display: "flex", 
            gridColumn: "2", 
            fontSize: "20pt",
            lineHeight: "40px"
         }}>{props.title}</div>
    </div>
}