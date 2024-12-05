/* #region  Modules */
import React, { Component } from 'react'

import { withRouter } from 'next/router'

//import withUserCredentials from '../lib/withUserCredentials'
import FloatingButton from '../components/FloatingButton'
import LineSpacing from 'components/LineSpacing'
import FloatWindow from 'components/FloatWindow'
import TextInput from 'components/TextInput'
import MainContainer from 'components/MainContainer'
import NotificationManager from '../components/controller/NotificationManager'
/* #endregion */

const nt = new NotificationManager()

export default withRouter(class extends Component {

    /* #region  Setup */
    constructor(props) {
        super(props)

        this.state = {
            notyVisibility: false,
            message: "",
        }
    }
    /* #endregion */

    render() {
        return <React.Fragment>
            <FloatWindow 
                title="Enviar Notificação"
                toggle={this.state.notyVisibility} 
                onDismiss={() => this.setState({ ...this.state, notyVisibility: false })}
                onSubmit={() => {
                    this.send()
                }}>
                <LineSpacing/>
                <TextInput 
                    value={this.state.message} 
                    onChange={(event) => {
                        this.setState({ ...this.state, message: event.target.value })
                }}/>
            </FloatWindow>
            <MainContainer>
                <h1>Teste de Notificações</h1>
                <h3>Clique no botão logo abaixo para começar</h3>
            </MainContainer>
            <FloatingButton onClick={() => { this.setState({ ...this.state, notyVisibility: true }) }}></FloatingButton>
        </React.Fragment>
    }

    async send() {
        await nt.send(this.state.message)
    }

    // canSeeDetails() {
    //     return parseInt(this.props.user.access_level) != 4
    // }

})

//export const getServerSideProps = withUserCredentials()