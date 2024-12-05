/* #region  Modules */
import Button from 'components/Button'
import LineSpacing from 'components/LineSpacing'
import Title from 'components/Title'
import TextInput from 'components/TextInput'
import FormScreen from '../screens/FormScreen'
import Balloon from 'components/Balloon'

import { withRouter } from 'next/router'
import { Component } from 'react'
import { getApiJsonDataPost } from 'tools/Util'
import React from 'react'
/* #endregion */

export default withRouter(class SignUp extends Component {

    /* #region  Setup */
    constructor(props) {
        super(props)

        this.state = {
            token: ""
        }
    }
    /* #endregion */

    render() {
        return <FormScreen>
            <Title size="medium">Check Your E-mail</Title>
            <LineSpacing height="15px" />
            {this.state.message ?
                <Balloon color="#fc8686">{this.state.message}</Balloon> :
                <div>We sent an e-mail to your inbox with the verification code, please check your spam as well.</div>}
            <LineSpacing height="15px" />
            <TextInput
                placeholder="6 digit code"
                mask="9 9 9 9 9 9"
                value={this.state.token}
                onChange={(event) => {
                    this.setState({ token: event.target.value })
                }} />
            <LineSpacing height="15px" />
            <Button
                onClick={() => {
                    this.sendToken()
                }}>Check Code</Button>
        </FormScreen>
    }

    /* #region  Functions */
    async sendToken() {
        const json = await getApiJsonDataPost("/account/check-code",
            {
                email: this.props.router.query.email,
                token: this.state.token,
                reset: this.props.router.query.reset
            })

        if (json.success) {
            if (this.props.router.query.reset)
                this.props.router.push(`/new-password?email=${this.props.router.query.email}&t=${json.token}`)
            else
                this.props.router.push("/sign-in")
        }
        else
            this.setMessage("Invalid code")
    }

    setMessage(value) {
        this.setState({ ...this.state, message: value }, () => {
            setTimeout(() => {
                this.setState({ ...this.state, message: "" })
            }, 5000)
        })
    }
    /* #endregion */

})