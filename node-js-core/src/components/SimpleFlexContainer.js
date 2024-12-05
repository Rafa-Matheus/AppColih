import styled from "styled-components"

const SimpleFlexContainer = styled.div({
    display: "flex",
    gap: "25px",
    alignItems: "center",
    "div": {
        width: "100%"
    }
})

export default (props) => {
    return <center>
        <SimpleFlexContainer>{props.children}</SimpleFlexContainer>
    </center>
}