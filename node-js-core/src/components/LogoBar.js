import styled from "styled-components"
import root from "./StaticStyles"

const LogoBar = styled.div({
    width: "100%",
    height: "fit-content",
    padding: "15px",
    borderBottom: `${root.strokeWidth} solid ${root.neutralColor}`,
    textAlign: "center",
    "img": {
        width: "300px"
    }
})

export default (props) => {
    return <LogoBar>
        <img src={props.img} />
    </LogoBar>
}