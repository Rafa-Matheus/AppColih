import styled from "styled-components"
import FlexContainer from "./FlexContainer"

const FloatWindowFooter = styled.div({
    display: "grid",
    gridTemplateColumns: "1fr 1fr"
})

const Content = styled.div({
    gridColumn: 2
})

export default (props) => {
    return <FloatWindowFooter>
        <Content>
            <FlexContainer>{props.children}</FlexContainer>
        </Content>
    </FloatWindowFooter>
}