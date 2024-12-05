export default (props) => {
    return <div
        style={
            {
                display: "inline-block",
                marginBottom: "-5px",
                background: props.color,
                width: "20px",
                height: "20px",
                borderRadius: "20px"
            }
        } />
}