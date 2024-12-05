import styled from "styled-components"
import StaticStyles from "./StaticStyles"

const MainContainer = styled.div({
    position: "relative",
    paddingRight: StaticStyles.spacing,
    paddingLeft: StaticStyles.spacing,
    marginRight: "auto",
    marginLeft: "auto",
    "@media (min-width: 768px)": {
        width: "750px"
    },
    "@media (min-width: 992px)": {
        width: "970px"
    },
    "@media (min-width: 1200px)": {
        width: "1170px"
    }
})

export default (props) => {
    return <MainContainer>{props.children}</MainContainer>
}