import styled from "styled-components"
import root from "./StaticStyles"

const Footer = styled.div({
    width: "100%",
    height: "fit-content",
    padding: "15px",
    borderTop: `${root.strokeWidth} solid ${root.neutralColor}`,
    textAlign: "center"
})

export default (props) => {
    return <Footer>{props.children}</Footer>
}