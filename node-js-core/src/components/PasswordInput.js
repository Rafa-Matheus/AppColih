import { Component } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi"
import styled from 'styled-components'
import StaticStyles, { formInputAddonStyles, formInputLeftStyles, formInputStyles } from './StaticStyles'

const AddonContainer = styled.div({
    display: "grid",
    gridTemplateColumns: `1fr ${StaticStyles.minimumSize}`,
    width: "100%"
})

const AddonInput = styled.input({
    ...formInputStyles,
    ...formInputLeftStyles,
    ...formInputAddonStyles
})

const AddonIcon = styled.div({
    gridColumn: "2",
    border: `${StaticStyles.strokeWidth} solid ${StaticStyles.neutralColor}`,
    borderLeft: "none",
    borderTopRightRadius: StaticStyles.borderRadius,
    borderBottomRightRadius: StaticStyles.borderRadius,
    textAlign: "center",
    paddingTop: "4px",
    fontSize: StaticStyles.fontMediumSize,
    cursor: "pointer",
    padding: "0",
    "*": {
        height: "100%"
    }
})

export default class PasswordInput extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isPasswordShown: false
        }
    }

    render() {
        return <AddonContainer>
            <AddonInput type={this.state.isPasswordShown ? "text" : "password"} {...this.props} />
            <AddonIcon
                //Mouse
                onMouseDown={() => { this.togglePasswordVisiblity(true) }}
                onMouseUp={() => { this.togglePasswordVisiblity(false) }}
                onMouseLeave={() => { this.togglePasswordVisiblity(false) }}
                //Touch
                onTouchStart={() => { this.togglePasswordVisiblity(true) }}
                onTouchEnd={() => { this.togglePasswordVisiblity(false) }}
                onTouchCancel={() => { this.togglePasswordVisiblity(false) }}>{this.state.isPasswordShown ? <FiEye /> : <FiEyeOff />}</AddonIcon>
        </AddonContainer>
    }

    togglePasswordVisiblity(visible) {
        this.setState({ ...this.state, isPasswordShown: visible })
    }

}