import styled from "styled-components"
import root, { freezeText, easeEffect } from "./StaticStyles"

const ActionButton = styled.div({
    background: "#EBEEFD",
    paddingTop: "20px",
    paddingLeft: "15px",
    paddingBottom: "20px",
    paddingRight: "15px",
    display: "inline-block",
    lineHeight: "20px",
    minHeight: root.minimumSize,
    //width: "fit-content",
    width: "100px",
    borderRadius: root.borderRadius,
    textAlign: "center",
    fontSize: "14pt",
    cursor: "pointer",
    overflow: "hidden",
    fontStyle: "normal",
    "svg": {
        fontSize: "28pt"
    },
    ...freezeText,
    ...easeEffect
})

export default (props) => {
    return <ActionButton
        onClick={props.onClick}>{props.icon}<br/>{props.children}</ActionButton>
}