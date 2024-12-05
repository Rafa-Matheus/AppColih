import styled from "styled-components"
import root, { freezeText } from "./StaticStyles"

export default (props) => {
    const size = () => {
        if (props.size) {
            switch (props.size) {
                case "small":
                    return root.fontSmallSize
                case "medium":
                    return root.fontMediumSize
                case "big":
                    return root.fontBigSize
            }
        }

        return root.fontBigSize
    }

    const Title = styled.div({
        fontSize: size(),
        fontWeight: "800",
        ...freezeText
    })

    return <Title>{props.children}</Title>
}