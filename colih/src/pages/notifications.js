/* #region  Modules */
import React, { Component } from 'react'

import { withRouter } from 'next/router'
import { RiStethoscopeLine } from 'react-icons/ri'

import withUserCredentials from '../../lib/withUserCredentials'
import { getApiJsonDataPost } from 'tools/Util'
import SimpleFlexContainer from 'components/SimpleFlexContainer'
import TitleScreen from '../screens/TitleScreen'
import ListItem from '../components/ListItem'
import Button from 'components/Button'
import CardItem from '../components/CardItem'

import NotificationManager from '../components/controller/NotificationManager'
const nt = new NotificationManager()
/* #endregion */

export default withRouter(class extends Component {

    /* #region  Setup */
    constructor(props) {
        super(props)

        this.state = {
            items: []
        }
    }

    componentDidMount() {
        this.fetch()

        // setInterval(() => {
        //     this.checkNotifications()
        // }, 5000)
    }
    /* #endregion */

    render() {
        return <TitleScreen title="Notificações" href="/">
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                rowGap: "15px",
                marginTop: "20px"
            }}>
                {this.state.items.map(item => {
                    return <CardItem>
                        <ListItem
                            icon={<RiStethoscopeLine />}
                            title="Notificação"
                            description={item.titulo}>
                            <SimpleFlexContainer>
                                <Button>Ciente</Button>
                                <Button style="danger" onClick={() => this.send(item.id)}>Não Aceito</Button>
                            </SimpleFlexContainer>
                        </ListItem>
                    </CardItem>
                })}
            </div>
        </TitleScreen>
    }

    async fetch() {
        const json = await getApiJsonDataPost("/notifications/list")

        if (json.success)
            this.setState({ items: json.items })
        else
            alert("Erro ao listar as notificações")
    }

    async send(id) {
        return

        const json = await getApiJsonDataPost("/schedules/pass",
            {
                id: id
            })

        nt.sendNotification(1, this.state.title, { id: json.id })

        if (json.success)
            alert("Agendado!")
    }

    async checkNotifications() {
        var notificationIndex = 0
        while (notificationIndex < this.state.items.length) {
            const notification = this.state.items[notificationIndex]
            console.log(notification)

            const json = await getApiJsonDataPost("/schedules/check", { id: notification.id })
            if (json.success)
                console.log(`A notificação ${notification.id} EXPIROU!`)
            else
                console.log(`A notificação ${notification.id} está ok!`)

            notificationIndex++
        }
    }

})

export const getServerSideProps = withUserCredentials()