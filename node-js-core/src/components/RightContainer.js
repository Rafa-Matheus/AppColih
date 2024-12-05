import styled from "styled-components"
import root from "./StaticStyles"

const RightContainer = styled.div({
    position: "absolute",
    left: "300px",
    top: "60px",
    bottom: 0,
    right: 0,
    paddingTop: root.spacing,
    paddingLeft: "60px",
    paddingRight: "60px",
    overflowX: "hidden",
    overflowY: "auto",
    "@media (max-width: 768px)": {
        left: 0,
        paddingLeft: "20px",
        paddingRight: "20px"
    }
})

export default (props) => {
    return <RightContainer>
        {props.children}
    </RightContainer>
}