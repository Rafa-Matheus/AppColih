import FlexContainer from "./FlexContainer"
import Dialog from "./Dialog"
import Title from "./Title"
import LineSpacing from "./LineSpacing"
import styled from 'styled-components'

const Content = styled.div({
    gridRow: 1,
    paddingBottom: "20px"
})

export default function QuestionDialog(props) {
    return <Dialog {...props}>
        <Content>
            <center>
                <Title size="medium">{props.title}</Title>
                <LineSpacing />
                <div>{props.message}</div>
            </center>
        </Content>
        <div style={{ gridRow: 2, position: "relative" }}>
            <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
                <FlexContainer>{props.children}</FlexContainer>
            </div>
        </div>
    </Dialog>
}