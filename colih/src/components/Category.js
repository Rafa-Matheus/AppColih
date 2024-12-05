import LineSpacing from "components/LineSpacing"
import MainContainer from "components/MainContainer"
import CardItem from "./CardItem"
import VerticalFlexContainer from "./VerticalFlexContainer"

export default function Category(props) {
    return <MainContainer>
        <div style={{ 
            fontSize: "24pt", 
            fontWeight: "500" }}>{props.title}</div>
        <LineSpacing height="5px"/>
        <CardItem>
            <VerticalFlexContainer>{props.children}</VerticalFlexContainer>
        </CardItem>
    </MainContainer>
}