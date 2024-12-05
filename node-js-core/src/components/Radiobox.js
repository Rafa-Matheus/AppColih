import styled from 'styled-components'
import root, { easeEffect, freezeText } from './StaticStyles'

const Container = styled.div({
    width: "100%",
    height: "30px",
    display: "grid",
    gridTemplateColumns: "30px 1fr",
    lineHeight: "30px",
    ...freezeText
})

export default function Radiobox(props) {
    const Radiobox = styled.div({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gridColumn: "1",
        cursor: "pointer",
        borderRadius: "100%",
        textAlign: "center",
        fontSize: root.fontBigSize,
        background: props.isChecked ? root.primaryColor : root.neutralColor,
        border: props.isChecked ? "none" : `${root.strokeWidth} solid ${root.neutralColor}`,
        ...easeEffect
    })

    const RadioboxSymbol = styled.div({
        position: "relative",
        width: "100%",
        height: "100%",
        background: "white",
        borderRadius: "100%",
        display: props.isChecked ? "block" : "none",
        width: "18px",
        height: "18px"
    })

    const RadioboxText = styled.div({
        paddingLeft: "10px",
        ...freezeText
    })

    return <Container
        onClick={() => {
            if (props.onClick)
                props.onClick()
        }}>
        <Radiobox>
            <RadioboxSymbol/>
        </Radiobox>
        {props.children && <RadioboxText>{props.children}</RadioboxText>}
    </Container>
}