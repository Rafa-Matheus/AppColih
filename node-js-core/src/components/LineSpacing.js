import styled from "styled-components"
import root from "./StaticStyles"

export default (props) => {
    const spacing = () => {
        if (props.height)
            return props.height

        return root.spacing
    }

    const LineSpacing = styled.div({
        width: "100%",
        height: spacing()
    })

    return <LineSpacing />
}