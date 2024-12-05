import styled from "styled-components"
import { easeEffect } from "./StaticStyles"

const DialogOverlay = styled.div({
    position: "fixed",
    background: "rgba(0, 0, 0, 0.1)",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    ...easeEffect,
    zIndex: 3
})

export default (props) => {
    return <DialogOverlay
        style={{ visibility: props.toggle ? "visible" : "hidden", opacity: props.toggle ? "1" : "0" }}
        onClick={() => { if (props.onDismiss) props.onDismiss() }} />
}