/* #region  Modules */
import React, { Component } from 'react'
import LineSpacing from 'components/LineSpacing'

import { withRouter } from 'next/router'
import withUserCredentials from '../lib/withUserCredentials'
import Category from '../components/Category'
import ListItem from '../components/ListItem'
import TopBar from '../components/TopBar'
import NavBar from '../components/NavBar'
import BarChart from '../components/charts/BarChart'
import DoughnutChart from '../components/charts/DoughnutChart'
import PieChart from '../components/charts/PieChart'
import LineChart from '../components/charts/LineChart'
import Dialog from 'components/Dialog'
import NotificationManager from '../components/controller/NotificationManager'
import { RiStethoscopeLine } from 'react-icons/ri'
import { IoMdAlert } from 'react-icons/io'

const nt = new NotificationManager()
/* #endregion */

export default withRouter(class extends Component {

    /* #region  Setup */
    constructor(props) {
        super(props)
        
        this.state = {
            notificationPopupVisibility: false,
            notificationMessage: "",
            notifications: []
        }

        this.handleNotification = this.handleNotification.bind(this)
    }

    componentDidMount() {
        this.registerNotificationListener()
        this.getUnread()
    }
    /* #endregion */

    render() {
        return <React.Fragment>
            <TopBar
                user={this.props.user} 
                count={this.state.notifications.length}/>
            <Category title="Visão Geral">
                <BarChart
                    title=""
                    labels={["Rótulo 1", "Rótulo 2", "Rótulo 3", "Rótulo 4", "Rótulo 5", "Rótulo 6"]} 
                    data={[10, 100, 30, 20, 15, 60]}/>
            </Category>
            <LineSpacing/>
            <Category title="">
                <DoughnutChart
                    title=""
                    labels={["Rótulo 1", "Rótulo 2", "Rótulo 3", "Rótulo 4", "Rótulo 5", "Rótulo 6"]} 
                    data={[10, 100, 30, 20, 15, 60]}/>
            </Category>
            <LineSpacing/>
            <Category title="">
                <PieChart
                    title=""
                    labels={["Rótulo 1", "Rótulo 2", "Rótulo 3", "Rótulo 4", "Rótulo 5", "Rótulo 6"]} 
                    data={[10, 100, 30, 20, 15, 60]}/>
            </Category>
            <LineSpacing/>
            <Category title="">
                <LineChart
                    title=""
                    labels={["Rótulo 1", "Rótulo 2", "Rótulo 3", "Rótulo 4", "Rótulo 5", "Rótulo 6"]} 
                    data={[10, 100, 30, 20, 15, 60]}/>
            </Category>
            <LineSpacing height="100px"/>
            <NavBar/>
            <Dialog
                toggle={this.state.notificationPopupVisibility}>
                <h1>{this.state.notificationMessage}</h1>
            </Dialog>
        </React.Fragment>
    }

    getAccessLevel() {
        return parseInt(this.props.user.nivel)
    }

    async registerNotificationListener() {
        nt.subscribe(this.handleNotification)
    }

    async getUnread() {
        const unread = await nt.getUnread("")
        this.setState({ ...this.state, notifications: unread })
    }

    handleNotification(event) {
        const data = JSON.parse(event.data)

        if(data.event === "message") {
            const json = JSON.parse(data.message)
            if(json.user == this.props.user.id)
                this.setState({ ...this.state, 
                    notificationPopupVisibility: true, 
                    notificationCount: this.state.notificationCount + 1,
                    notificationMessage: json.message }, () => {
                        setTimeout(() => {
                            this.setState({ 
                                ...this.state, 
                                notificationPopupVisibility: false 
                            }, () => this.getUnread())
                        }, 5000)
                    })
                }
    }

})

export const getServerSideProps = withUserCredentials()