import styled from "styled-components"
import Panel from "./Panel"
import root from "./StaticStyles"

const Container = styled.div({
    padding: "10px",
    height: "100%"
})

const Text = styled.div({
    position: "absolute",
    left: "20px",
    top: "20px",
    right: "70px",
    width: "fit-content !important",
    fontSize: "20pt",
    fontWeight: "700",
    textAlign: "left"
})

const Desc = styled.div({
    position: "absolute",
    left: "20px",
    top: "90px",
    color: "slategrey",
    width: "fit-content !important",
    fontSize: "12pt",
    fontWeight: "500",
    textAlign: "left"
})

const Icon = styled.div({
    width: "100%",
    fontSize: "10pt",
    "svg": {
        position: "absolute",
        right: "20px",
        top: "20px",
        fontSize: "32pt"
    }
})

const Action = styled.div({
    cursor: "pointer",
    position: "absolute",
    right: "20px",
    bottom: "60px",
    width: "fit-content !important",
    fontSize: "26pt",
    fontWeight: "500"
})

export default (props) => {
    var height = "200px"
    if (props.height)
        height = props.height

    var backgroundNotSupport = root.primaryColor
    var background = `linear-gradient(90deg, ${root.primaryColor} 0%, ${root.primaryColorLight} 100%)`
    
    switch(props.style) {
        case "danger":
            backgroundNotSupport = root.dangerColor
            background = `linear-gradient(90deg, ${root.dangerColor} 0%, ${root.dangerColorLight} 100%)`
            break
    }

    const Bottom = styled.div({
        position: "absolute",
        width: "100%",
        height: "50px",
        background: backgroundNotSupport,
        background: background,
        bottom: "0",
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
        textAlign: "center",
        lineHeight: "50px",
        color: "white",
        fontSize: "18pt",
        textTransform: "uppercase",
        fontWeight: "600",
        "@media (max-width: 768px)": {
            fontSize: "20pt"
        }
    })

    return <Panel height={height}>
        <Container>{props.children}</Container>
        <Text>{props.text}</Text>
        <Desc>{props.desc}</Desc>
        <Icon>{props.icon}</Icon>
        <Action onClick={props.onClick}>{props.action}</Action>
        {props.msg && <Bottom>{props.msg}</Bottom>}
    </Panel>
}