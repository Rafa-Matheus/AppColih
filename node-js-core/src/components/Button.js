import styled from 'styled-components'
import root, { strongBoxShadow, easeEffect, freezeText } from './StaticStyles'

export default (props) => {
    const DefaultStyle = {
        color: "white",
        background: root.primaryColor
        // ,
        // border: `${root.strokeWidth} solid ${root.neutralColor}`
    }

    const LightStyle = {
        color: root.textColor,
        background: "#EBEEFD",
        // border: `${root.strokeWidth} solid ${root.neutralColor}`,
        "&:hover": {
            color: "white",
            background: root.textColor,
            ...strongBoxShadow
        }
    }

    const DangerStyle = {
        color: "white",
        background: root.dangerColor,
        // border: `${root.strokeWidth} solid ${root.neutralColor}`,
        "&:hover": {
            background: root.dangerColorLight,
            ...strongBoxShadow
        },
        "&:active": {
            background: root.dangerColorDark
        }
    }

    const style = () => {
        switch (props.style) {
            case "light":
                return LightStyle
            case "danger":
                return DangerStyle
            default:
                return DefaultStyle
        }
    }

    const Button = styled.div({
        cursor: "pointer",
        borderRadius: root.borderRadius,
        height: root.height,
        fontSize: root.fontMediumSize,
        lineHeight: "55px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
            background: root.primaryColorLight,
            ...strongBoxShadow
        },
        "&:active": {
            background: root.primaryColorDark
        },
        "svg": {
            fontSize: "16pt"
        },
        ...style(),
        ...freezeText,
        ...easeEffect
    })

    return <Button onClick={props.onClick}>{props.children}</Button>
}