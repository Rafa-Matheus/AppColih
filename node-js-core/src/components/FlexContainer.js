import styled from "styled-components"

const FlexContainer = styled.div({
    display: "flex",
    gap: "25px",
    alignItems: "center",
    "div": {
        width: "100%"
    },
    "@media (max-width: 1200px)": {
        display: "block",
        "&>div + div": {
            marginTop: "25px"
        }
    }
})

export default (props) => {
    return <center>
        <FlexContainer>{props.children}</FlexContainer>
    </center>
}