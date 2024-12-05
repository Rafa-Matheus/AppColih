/* #region  Modules */
import Button from 'components/Button'
import LineSpacing from 'components/LineSpacing'
import Title from 'components/Title'
import TextInput from 'components/TextInput'
import PasswordInput from 'components/PasswordInput'
import FormScreen from '../screens/FormScreen'
import Dialog from 'components/Dialog'
import FlexContainer from 'components/FlexContainer'

import Link from 'next/link'
import { withRouter } from 'next/router'
import Image from 'next/image'
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
            cookiePopup: false
        }
    }

    componentDidMount() {
        if(localStorage.getItem("cookieAccepted") != "yes") {
            setTimeout(() => {
                this.setState({ ...this.state, cookiePopup: true })
            }, 2000)
        }
    }
    /* #endregion */

    render() {
        return <FormScreen>
            <Dialog toggle={this.state.cookiePopup}>
                <h1>Aceitar Cookies</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <FlexContainer>
                    <Button style="light" onClick={() => {
                        localStorage.setItem("cookieAccepted", "yes")
                        this.setState({...this.state, cookiePopup: false})
                    }}>Aceitar</Button>
                    <Button onClick={() => {
                        this.setState({...this.state, cookiePopup: false})
                    }}>Recusar</Button>
                </FlexContainer>
            </Dialog>
            <Image width="95" height="100" src="/assets/colih.png"/>
            <Title size="medium">Bem Vindo!</Title>
            <p style={{
                lineHeight: "26px", 
                fontSize: "18pt", 
                color: "#AFB2B9"
            }}>Por favor, insira suas credenciais<br/>para iniciar a sessão no aplicativo.</p>
            {/* <LineSpacing />
            {this.state.message && <React.Fragment>
                <Balloon color="#fc8686">{this.state.message}</Balloon>
                <LineSpacing height="15px" />
            </React.Fragment>} */}
            <TextInput
                placeholder="E-mail"
                value={this.state.credentials.email}
                onChange={(event) => {
                    this.state.credentials.email = event.target.value
                    this.setState({ ...this.state })
                }} />
            <LineSpacing height="15px" />
            <PasswordInput
                placeholder="Senha"
                value={this.state.credentials.password}
                onChange={(event) => {
                    this.state.credentials.password = event.target.value
                    this.setState({ ...this.state })
                }} />
            <LineSpacing height="15px" />
            <Button onClick={() => {
                this.auth()
            }}>Entrar</Button>
            <LineSpacing height="15px" />
            <Button 
                style="light"
                onClick={() =>
                    this.props.router.push("/sign-up")
                }>Criar Conta</Button>
            <LineSpacing height="15px" />
            <Link href="/reset-password">Recuperar senha</Link>
        </FormScreen>
    }

    /* #region  Functions */
    async auth() {
        const json = await getApiJsonDataPost("/account/auth", this.state.credentials)
        
        alert(JSON.stringify(json))
        if (json.success) {
            alert("SUCCESS")
            this.props.router.push("/")
        }
        else {
            var message = "Wrong email/password"
            if (json.msg == 2)
                message = "This account not exists or is not activated"

            this.setMessage(message)
        }
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