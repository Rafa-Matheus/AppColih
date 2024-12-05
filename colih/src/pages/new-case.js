/* #region  Modules */
import React, { Component } from 'react'

import { withRouter } from 'next/router'
import { getApiJsonDataPost } from "tools/Util"
import withUserCredentials from '../../lib/withUserCredentials'
import TitleScreen from '../screens/TitleScreen'
import CardItem from '../components/CardItem'
import TextInput from 'components/TextInput'
import MultilineInput from 'components/MultilineInput'
import LineSpacing from 'components/LineSpacing'
import Button from 'components/Button'
import ListItem from '../components/ListItem'

import NotificationManager from '../components/controller/NotificationManager'
import FloatWindow from 'components/FloatWindow'
import ProfileItem from '../components/ProfileItem'
const nt = new NotificationManager()
/* #endregion */

export default withRouter(class extends Component {

    /* #region  Setup */
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            items: [],
            timeType: -1,
            dateType: -1,
            date: new Date(),
            days: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            firstTime: new Date(),
            lastTime: new Date(),
            notes: "",
            selectItem: -1,
            showMembers: false,
            members: [{}, {}, {}, {}, {}, {}]
        }
    }

    componentDidMount() {
        //this.getDoctor()
        this.fetch()
    }
    /* #endregion */

    render() {
        return <React.Fragment>
            <FloatWindow
                title="Selecionar"
                toggle={this.state.showMembers}
                onDismiss={() => this.setState({ ...this.state, showMembers: false })}>
                <LineSpacing />
                {this.state.items
                    .filter(member => {
                        return !this.state.members.find(m => m.id === member.id)
                    })
                    .map(member => {
                        return <ProfileItem
                            img={member.img_src}
                            name={member.nome}
                            secondText={member.atendimento}
                            thirdText={
                                <React.Fragment>
                                    {member.especialidade}<br />
                                    <div style={{ color: "grey", cursor: "pointer" }} onClick={() => {
                                        this.props.router.push(`/schedule?doctor=${member.id}`)
                                    }}>Novo Agendamento</div>
                                </React.Fragment>}
                            onClick={async () => {
                                const members = this.state.members
                                const json = await getApiJsonDataPost("members/get", { id: member.id })

                                if (json.success)
                                    members[this.state.selectItem] = json.item

                                this.setState({ ...this.state, members: members, showMembers: false })
                                //this.props.router.push(`/medico/${doctor.id}`)
                            }} />
                    })}
            </FloatWindow>
            <TitleScreen title="Novo Caso" href="/">
                <CardItem>
                    <h2 style={{ fontSize: "18pt" }}>Título:</h2>
                    <TextInput value={this.state.title} onChange={(event) => {
                        this.setState({ ...this.state, title: event.target.value })
                    }} />
                    <h2 style={{ fontSize: "18pt" }}>Equipe A:</h2>
                    <ListItem
                        title={this.state.members[0].nome ? "" : "Selecionar Membro 1"}
                        description={this.state.members[0]?.nome}
                        icon={<img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={this.state.members[0].img_src} />}
                        action={() => {
                            this.setState({ ...this.state, selectItem: 0, showMembers: true })
                        }} />
                    <LineSpacing />
                    <ListItem
                        title={this.state.members[1].nome ? "" : "Selecionar Membro 2"}
                        description={this.state.members[1]?.nome}
                        icon={<img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={this.state.members[1].img_src} />}
                        action={() => {
                            this.setState({ ...this.state, selectItem: 1, showMembers: true })
                        }} />
                        <LineSpacing />
                    <ListItem
                        title={this.state.members[2].nome ? "" : "Selecionar Membro 3"}
                        description={this.state.members[2]?.nome}
                        icon={<img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={this.state.members[1].img_src} />}
                        action={() => {
                            this.setState({ ...this.state, selectItem: 1, showMembers: true })
                        }} />

                    <h2 style={{ fontSize: "18pt" }}>Equipe B:</h2>
                    <ListItem
                        title={this.state.members[3].nome ? "" : "Selecionar Membro 1"}
                        description={this.state.members[3]?.nome}
                        icon={<img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={this.state.members[2].img_src} />}
                        action={() => {
                            this.setState({ ...this.state, selectItem: 2, showMembers: true })
                        }} />
                    <LineSpacing />
                    <ListItem
                        title={this.state.members[4].nome ? "" : "Selecionar Membro 2"}
                        description={this.state.members[4]?.nome}
                        icon={<img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={this.state.members[3].img_src} />}
                        action={() => {
                            this.setState({ ...this.state, selectItem: 3, showMembers: true })
                        }} />
                        <LineSpacing />
                    <ListItem
                        title={this.state.members[5].nome ? "" : "Selecionar Membro 3"}
                        description={this.state.members[5]?.nome}
                        icon={<img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={this.state.members[3].img_src} />}
                        action={() => {
                            this.setState({ ...this.state, selectItem: 3, showMembers: true })
                        }} />

                    <h2 style={{ fontSize: "18pt" }}>Início e Fim:</h2>
                    <TextInput type="date" value={this.state.firstTime} onChange={(event) => {
                        this.setState({ ...this.state, firstTime: event.target.value })
                    }} />
                    <LineSpacing />
                    <TextInput type="date" value={this.state.lastTime} onChange={(event) => {
                        this.setState({ ...this.state, lastTime: event.target.value })
                    }} />

                    <h2 style={{ fontSize: "18pt" }}>Observações:</h2>
                    <MultilineInput value={this.state.notes} onChange={(event) => {
                        this.setState({ ...this.state, notes: event.target.value })
                    }} />
                    <LineSpacing />
                    <Button onClick={() => {
                        this.send()
                    }}>OK</Button>
                </CardItem>
            </TitleScreen>
        </React.Fragment>
    }

    async fetch() {
        const json = await getApiJsonDataPost("/members/list")

        if (json.success)
            this.setState({ items: json.items })
        else
            alert("Erro ao listar os membros")
    }

    async send() {
        const json = await getApiJsonDataPost("new-case",
            {
                criacao: new Date(),
                titulo: this.state.title,
                usuarios: JSON.stringify(this.state.members), 
                data_inicial: this.state.firstTime,
                data_final: this.state.lastTime,
                observacoes: this.state.notes
            })

        nt.send(this.props.user.id, this.state.title, json.id)

        if (json.success)
            alert("Agendado!")
    }

    // canSeeDetails() {
    //     return parseInt(this.props.user.access_level) != 4
    // }

})

export const getServerSideProps = withUserCredentials()