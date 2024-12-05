import { FiCheck } from 'react-icons/fi'
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

export default function Checkbox(props) {
    const Checkbox = styled.div({
        gridColumn: "1",
        cursor: "pointer",
        borderRadius: "5px",
        textAlign: "center",
        fontSize: root.fontBigSize,
        background: props.isChecked ? root.primaryColor : root.neutralColor,
        border: props.isChecked ? "none" : `${root.strokeWidth} solid ${root.neutralColor}`,
        ...easeEffect
    })

    const CheckboxSymbol = styled.div({
        position: "relative",
        width: "100%",
        height: "100%",
        color: "white",
        fontSize: "20pt",
        display: props.isChecked ? "block" : "none",
        "svg": {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        }
    })

    const CheckboxText = styled.div({
        paddingLeft: "10px",
        ...freezeText
    })

    return <Container
        onClick={() => {
            if (props.onClick)
                props.onClick()
        }}>
        <Checkbox>
            <CheckboxSymbol><FiCheck /></CheckboxSymbol>
        </Checkbox>
        {props.children && <CheckboxText>{props.children}</CheckboxText>}
    </Container>
}