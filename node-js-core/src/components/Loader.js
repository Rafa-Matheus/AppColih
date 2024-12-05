import styled from "styled-components"
import StaticStyles from "./StaticStyles"

const Loader = styled.div({
    animation: "rotating 1s linear infinite",
    border: `6px solid ${StaticStyles.neutralColor}`,
    borderRadius: "50%",
    borderTopColor: StaticStyles.primaryColor,
    height: "50px",
    width: "50px",
    "@keyframes rotating": {
        to: {
            transform: "rotate(1turn)"
        }
    }
})

export default (props) => {
    return <Loader {...props} />
}