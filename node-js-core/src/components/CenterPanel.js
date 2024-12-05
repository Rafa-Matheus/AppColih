import styled from "styled-components"
import root, { boxShadow } from "./StaticStyles"

const CenterPanel = styled.div({
    width: "400px",
    height: "fit-content",
    padding: root.spacing,
    "@media (max-width: 768px)": {
        width: "100%"
    }
})

export default (props) => {
    // const useBorder = props.useBorder

    // if(useBorder)
    //     styles = {
    //         borderRadius: root.borderRadius, 
    //         border: `${root.strokeWidth} solid ${root.neutralColor}`, 
    //         ...styles,
    //         ...boxShadow
    //     }

    return <CenterPanel>{props.children}</CenterPanel>
}