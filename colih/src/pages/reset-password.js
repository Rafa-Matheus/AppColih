/* #region  Modules */
import Button from 'components/Button'
import LineSpacing from 'components/LineSpacing'
import Title from 'components/Title'
import TextInput from 'components/TextInput'
import FormScreen from '../screens/FormScreen'
import Balloon from 'components/Balloon'

import { getApiJsonDataPost } from 'tools/Util'
import { withRouter } from 'next/router'
import { Component } from 'react'
import React from 'react'
/* #endregion */

export default withRouter(class ResetPassword extends Component {

    /* #region  Setup */
    constructor(props) {
        super(props)

        this.state = {
            credentials: {}
        }
    }
    /* #endregion */

    render() {
        return <FormScreen>
            <Title size="medium">Reset Your Password</Title>
            <LineSpacing />
            {this.state.message && <React.Fragment>
                <Balloon color="#fc8686">{this.state.message}</Balloon>
                <LineSpacing height="15px" />
            </React.Fragment>}
            <TextInput
                placeholder="E-mail"
                value={this.state.credentials.email}
                onChange={(event) => {
                    this.state.credentials.email = event.target.value
                    this.setState(this.state)
                }} />
            <LineSpacing height="15px" />
            <Button onClick={() => {
                this.reset()
            }}>Send Verification Code</Button>
        </FormScreen>
    }

    /* #region  Functions */
    async reset() {
        const json = await getApiJsonDataPost("/account/reset", this.state.credentials)
        if (json.success)
            this.props.router.push(`/check-code?email=${this.state.credentials.email}&reset=true`)
        else
            this.setMessage("Invalid email")
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