import { Component } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'
import styled from 'styled-components'
import root, { easeEffect, freezeText } from './StaticStyles'

const Container = styled.div({
    display: "grid",
    gridTemplateColumns: "60px 1fr 60px",
    height: root.minimumSize,
    width: "fit-content",
    ...freezeText
})

const SideButton = {
    position: "relative",
    background: root.neutralColor,
    color: root.textColor,
    textAlign: "center",
    fontSize: "20pt",
    cursor: "pointer",
    ...easeEffect,
    "&:hover": {
        background: root.primaryColor,
        color: "white"
    },
    "svg": {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
}

const LeftButton = styled.div({
    borderTopLeftRadius: root.borderRadius,
    borderBottomLeftRadius: root.borderRadius,
    ...SideButton
})

const RightButton = styled.div({
    borderTopRightRadius: root.borderRadius,
    borderBottomRightRadius: root.borderRadius,
    ...SideButton
})

const NumericInput = styled.input({
    minWidth: "60px",
    textAlign: "center",
    border: `${root.strokeWidth} solid ${root.neutralColor}`,
    fontSize: root.fontMediumSize,
    "&:focus": {
        outline: "0"
    }
})

export default class NumericUpDown extends Component {

    constructor(props) {
        super(props)

        var initialValue = props.value ? parseInt(props.value) : 0
        const minValue = this.getMinValue()
        if (initialValue < minValue) {
            initialValue = minValue

            this.setNumber(initialValue)
        }

        this.state = {
            value: initialValue
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value != this.props.value)
            this.setNumber(this.props.value)
    }

    getMinValue() {
        return this.props.minvalue ? parseInt(this.props.minvalue) : 0
    }

    render() {
        return <Container>
            <LeftButton
                onClick={() => {
                    const newValue = parseInt(this.state.value) - 1
                    if (newValue >= this.getMinValue())
                        this.setNumber(newValue)
                }}><FiMinus /></LeftButton>
            <NumericInput type="number" value={this.state.value} readOnly />
            <RightButton
                onClick={() => {
                    const newValue = parseInt(this.state.value) + 1
                    const maxValue = parseInt(this.props.maxvalue)

                    if (maxValue >= 0) {
                        if (newValue <= maxValue)
                            this.setNumber(newValue)
                    }
                    else
                        this.setNumber(newValue)
                }}><FiPlus /></RightButton>
        </Container>
    }

    setNumber(value) {
        if (!value)
            value = this.getMinValue()

        this.setState({ value: value }, () => {
            if (this.props.onChange)
                this.props.onChange(value)
        })
    }

}