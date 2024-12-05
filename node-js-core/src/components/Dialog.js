import styled from 'styled-components'
import DialogOverlay from './DialogOverlay'
import root, { easeEffect } from './StaticStyles'

const Dialog = styled.div({
    display: "grid",
    minHeight: "10vh",
    gridTemplateRows: "1fr 1fr",
    background: "white",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    boxShadow: "0 0 40px rgba(0, 0, 0, 0.1)",
    paddingTop: root.borderRadius,
    paddingRight: root.spacing,
    paddingBottom: root.borderRadius,
    paddingLeft: root.spacing,
    zIndex: 3,
    ...easeEffect,
    "@media (min-width: 768px)": {
        width: "50vw",
        minHeight: "400px",
        boxShadow: `0 0 15px ${root.boxShadowColor}`,
        borderRadius: root.borderRadius,
        top: "50vh",
        right: "auto",
        left: "50vw",
        transform: "translate(-50%, -50%)",
        padding: root.spacing
    }
})

export default (props) => {
    return <React.Fragment>
        <DialogOverlay {...props} />
        <Dialog style={{ opacity: props.toggle ? "1" : "0", visibility: props.toggle ? "visible" : "hidden" }}>
            {props.children}
        </Dialog>
    </React.Fragment>
}