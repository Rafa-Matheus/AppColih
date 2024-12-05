/* #region  Modules */
import React, { Component } from 'react'

import { withRouter } from 'next/router'
//import withUserCredentials from '../lib/withUserCredentials'
import Notification from '../../model/Notification'
import TitleScreen from '../../screens/TitleScreen'
import Title from 'components/Title'
import CardItem from '../../components/CardItem'
import NotificationManager from '../../components/controller/NotificationManager'

const nt = new NotificationManager()
/* #endregion */

export default withRouter(class extends Component {

    /* #region  Setup */
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.setReaded()
    }
    /* #endregion */

    render() {
        return <TitleScreen title="Detalhes" href="/">
            <Title>{this.props.notification.titulo}</Title>
            <CardItem>
                {this.props.notification.conteudo}
            </CardItem>
        </TitleScreen>
    }

    async setReaded() {
        await nt.setReaded(this.props.router.query.id)
    }

    // canSeeDetails() {
    //     return parseInt(this.props.user.access_level) != 4
    // }

})

//export const getServerSideProps = withUserCredentials()


/* #region  Propriedades estáticas */
export const getStaticPaths = async () => {
    const allItems = await notifications.getAll()
    const paths = allItems.map(value => {
        return { params: { id: value.id.toString() } }
    })

    return {
        paths,
        fallback: true
    }
}

const notifications = new Notification()
export const getStaticProps = async (context) => {
    const { id } = context.params

    const { exists, item } = await notifications.getById(id)

    delete item.timestamp

    if (exists)
        return {
            props: {
                notification: item
            }
        }
    else
        return { props: {} }
}
/* #endregion */