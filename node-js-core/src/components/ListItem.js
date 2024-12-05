import styled from "styled-components"
import root, { easeEffect, freezeText } from "./StaticStyles"

const ListItem = styled.div({
    cursor: "pointer",
    width: "100%",
    height: "40px",
    textAlign: "left",
    lineHeight: "40px",
    paddingLeft: "10px",
    borderBottom: `${root.strokeWidth} solid ${root.neutralColor}`,
    "&:hover": {
        background: root.neutralColor
    },
    ...easeEffect,
    ...freezeText
})

export default (props) => {
    return <ListItem>{props.children}</ListItem>
}