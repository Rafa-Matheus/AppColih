/* #region  Modules */
import Button from 'components/Button'
import LineSpacing from 'components/LineSpacing'
import Title from 'components/Title'
import TextInput from 'components/TextInput'
import FormScreen from '../screens/FormScreen'
import PasswordInput from 'components/PasswordInput'
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
            credentials: {},
            confirmarSenha: ""
        }
    }
    /* #endregion */

    render() {
        return <FormScreen>
            <Title>Criar Conta</Title>
            <LineSpacing />
            {this.state.message && <React.Fragment>
                <Balloon color="#fc8686">{this.state.message}</Balloon>
                <LineSpacing height="15px" />
            </React.Fragment>}
            <TextInput
                placeholder="Nome"
                value={this.state.credentials.nome}
                onChange={(event) => {
                    this.state.credentials.nome = event.target.value
                    this.setState({ ...this.state })
                }} />
            <LineSpacing height="15px" />
            <TextInput
                placeholder="Seu e-mail"
                value={this.state.credentials.email}
                onChange={(event) => {
                    this.state.credentials.email = event.target.value
                    this.setState({ ...this.state })
                }} />
            <LineSpacing height="15px" />
            <PasswordInput
                placeholder="Senha"
                value={this.state.credentials.senha}
                onChange={(event) => {
                    this.state.credentials.senha = event.target.value
                    this.setState({ ...this.state })
                }} />
            <LineSpacing height="15px" />
            <PasswordInput
                placeholder="Confirmar senha"
                value={this.state.confirmarSenha}
                onChange={(event) => {
                    this.state.confirmarSenha = event.target.value
                    this.setState({ ...this.state })
                }} />
            <LineSpacing height="15px" />
            <Button onClick={() => {
                this.createAccount()
            }}>Enviar</Button>
        </FormScreen>
    }

    /* #region  Functions */
    async createAccount() {
        if (this.state.credentials.senha === this.state.confirmarSenha) {
            const json = await getApiJsonDataPost("/account/create", this.state.credentials)
            if (json.success)
                this.props.router.push(`/check-code?email=${this.state.credentials.email}`)
            else {
                switch (json.msg) {
                    case 0:
                        this.setMessage("This email already exists")
                        break
                    case 1:
                        this.setMessage("Fail on create account")
                        break
                }
            }
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