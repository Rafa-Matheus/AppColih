import styled from "styled-components"
import root from "./StaticStyles"
import { BiArrowToLeft } from 'react-icons/bi'

export default (props) => {
    var width = "0"
    var zIndex = "0"
    var padding = "0"
    if (props.visible) {
        width = props.visible === true ? "300px" : "0"
        zIndex = props.visible === true ? "2" : "0"
        padding = props.visible === true ? "10px" : "0"
    }

    const LeftSideBar = styled.div({
        zIndex: zIndex,
        position: "absolute",
        background: root.primaryColor,
        left: 0,
        top: 0,
        bottom: 0,
        width: "300px",
        padding: "10px",
        "@media (max-width: 768px)": {
            padding: padding,
            width: width
        }
    })

    const Toggle = styled.div({
        cursor: "pointer",
        position: "absolute",
        marginTop: "5px",
        fontSize: "20pt",
        right: 0,
        color: "white",
        opacity: ".7",
        "@media (min-width: 768px)": {
            display: "none"
        }
    })

    return <LeftSideBar>
        <Toggle onClick={props.onToggle}><BiArrowToLeft/></Toggle>
        {props.children}
    </LeftSideBar>
}