import styled from 'styled-components'
import root, { freezeText, easeEffect } from './StaticStyles'

export default (props) => {
    const HoldButton = styled.div({
        background: props.isChecked ? root.primaryColor : "#EBEEFD",
        color: props.isChecked ? "white" : root.textColor,
        display: "inline-block",
        paddingLeft: "10px",
        paddingRight: "10px",
        marginRight: root.gridSpacing,
        marginBottom: root.gridSpacing,
        borderRadius: root.borderRadius,
        cursor: "pointer",
        transitionDuration: root.ease,
        fontSize: root.fontMediumSize,
        ...easeEffect,
        ...freezeText
    })

    return <HoldButton onClick={props.onClick}><div style={{ 
            display: "flex",
            width: "100%",         
            alignItems: "center",
            justifyContent: "center" }}>{props.children}</div></HoldButton>
}