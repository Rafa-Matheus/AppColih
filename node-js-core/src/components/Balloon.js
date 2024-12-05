import styled from "styled-components"
import root, { freezeText } from "./StaticStyles"

export default (props) => {
    const Balloon = styled.div({
        background: props.color ?? "#ffec36",
        padding: root.spacing,
        borderRadius: root.borderRadius,
        fontSize: "16pt",
        fontWeight: 500,
        fontStyle: "italic",
        textAlign: "center",
        opacity: ".8",
        ...freezeText
    })

    return <Balloon>{props.children}</Balloon>
}