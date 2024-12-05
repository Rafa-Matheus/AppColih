import styled from "styled-components"
import root, { boxShadow, strongBoxShadow, easeEffect, freezeText } from './StaticStyles'

export default (props) => {
    const Panel = styled.div({
        background: "white",
        position: "relative",
        width: "100%",
        height: props.height,
        borderRadius: root.borderRadius,
        border: `${root.strokeWidth} solid ${root.neutralColor}`,
        ...boxShadow,
        ...easeEffect,
        ...freezeText,
        "&:hover": {
            ...strongBoxShadow
        }
    })

    return <Panel>{props.children}</Panel>
}