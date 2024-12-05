import { Component } from 'react'

import Button from './Button'
import DialogOverlay from './DialogOverlay'
import FloatWindowFooter from './FloatWindowFooter'

import { IoCloseSharp } from 'react-icons/io5'
import styled from 'styled-components'
import root, { easeEffect } from './StaticStyles'

const Container = styled.div({
    position: "fixed",
    width: "90vw",
    height: "80vh",
    background: "white",
    boxShadow: `0 0 15px ${root.boxShadowColor}`,
    borderRadius: root.borderRadius,
    top: "50vh",
    left: "50vw",
    transform: "translate(-50%, -50%)",
    display: "grid",
    gridTemplateRows: `calc(30px + ${root.spacing}) 1fr`,
    padding: root.spacing,
    zIndex: 3,
    ...easeEffect,
    "@media (max-width: 768px)": {
        width: "100vw",
        height: "auto",
        top: "20vh",
        left: 0,
        bottom: 0,
        right: 0,
        transform: "none",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    }
})

const Header = styled.div({
    gridRow: 1,
    display: "grid"
})

const WindowTitle = styled.div({
    gridColumn: 1,
    fontSize: root.fontBigSize,
    fontWeight: "500"
})

const Controls = styled.div({
    gridColumn: 2,
    textAlign: "right",
    "svg": {
        fontSize: "24pt",
        cursor: "pointer"
    }
})

const Content = styled.div({
    gridRow: 2,
    paddingBottom: root.spacing,
    overflowY: "auto",
    overflowX: "hidden"
})

export default class FloatWindow extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return <React.Fragment>
            <DialogOverlay {...this.props} />
            <Container style={{ visibility: this.props.toggle ? "visible" : "hidden", opacity: this.props.toggle ? "1" : "0" }}>
                <Header>
                    <WindowTitle>{this.props.title}</WindowTitle>
                    <Controls>
                        <IoCloseSharp onClick={() => { this.dismiss() }} />
                    </Controls>
                </Header>
                <Content>{this.props.children}</Content>
                <FloatWindowFooter>
                    <Button style="light" onClick={() => { this.submit() }}>OK</Button>
                    <Button style="danger" onClick={() => { this.dismiss() }}>Cancelar</Button>
                </FloatWindowFooter>
            </Container>
        </React.Fragment>
    }

    submit() {
        if (this.props.onSubmit)
            this.props.onSubmit()
    }

    dismiss() {
        if (this.props.onDismiss)
            this.props.onDismiss()
    }

}