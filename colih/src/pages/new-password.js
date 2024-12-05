/* #region  Modules */
import Button from 'components/Button'
import LineSpacing from 'components/LineSpacing'
import Title from 'components/Title'
import PasswordInput from 'components/PasswordInput'
import FormScreen from '../screens/FormScreen'
import Balloon from 'components/Balloon'

import { withRouter } from 'next/router'
import { Component } from 'react'
import { getApiJsonDataPost } from 'tools/Util'
import React from 'react'
/* #endregion */

export default withRouter(class extends Component {

    /* #region  Setup */
    constructor(props) {
        super(props)

        this.state = {
            password: "",
            confirmPassword: ""
        }
    }
    /* #endregion */

    render() {
        return <FormScreen>
            <Title size="medium">Set New Password</Title>
            <LineSpacing />
            {this.state.message && <React.Fragment>
                <Balloon color="#fc8686">{this.state.message}</Balloon>
                <LineSpacing height="15px" />
            </React.Fragment>}
            <PasswordInput
                placeholder="Password"
                value={this.state.password}
                onChange={(event) => {
                    this.state.password = event.target.value
                    this.setState({ ...this.state })
                }}
            />
            <LineSpacing height="15px" />
            <PasswordInput
                placeholder="Confirm password"
                value={this.state.confirmPassword}
                onChange={(event) => {
                    this.state.confirmPassword = event.target.value
                    this.setState({ ...this.state })
                }}
            />
            <LineSpacing height="15px" />
            <Button onClick={() => { this.send() }}>Submit</Button>
        </FormScreen>
    }

    /* #region  Functions */
    async send() {
        if (this.state.password === this.state.confirmPassword) {
            const json = await getApiJsonDataPost("/account/new-password",
                {
                    email: this.props.router.query.email,
                    password: this.state.password,
                    token: this.props.router.query.t
                })

            if (json.success)
                this.props.router.push("/")
            else
                this.setMessage("Fail on set new password")
        } else
            this.setMessage("Password mismatch")
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