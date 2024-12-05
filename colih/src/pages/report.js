/* #region  Modules */
import React, { Component } from 'react'

import { withRouter } from 'next/router'
import { getApiJsonDataPost } from "tools/Util"
//import withUserCredentials from '../lib/withUserCredentials'
import TitleScreen from '../screens/TitleScreen'
import CardItem from '../components/CardItem'
import RadioItem from '../components/RadioItem'
import TextInput from 'components/TextInput'
import MultilineInput from 'components/MultilineInput'
import LineSpacing from 'components/LineSpacing'
import Button from 'components/Button'
import ListItem from '../components/ListItem'
import FloatWindow from 'components/FloatWindow'
import ProfileItem from '../components/ProfileItem'
/* #endregion */

export default withRouter(class extends Component {

    /* #region  Setup */
    constructor(props) {
        super(props)

        this.state = {
            values: [0, 0, new Date()],
            notes: "",
            items: [],
            member: {},
            doctor: {},
        }
    }

    componentDidMount() {
        //this.getData()
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
                                const json = await getApiJsonDataPost("members/get", { id: member.id })

                                this.setState({ ...this.state, member: json.item, showMembers: false })
                                //this.props.router.push(`/medico/${doctor.id}`)
                            }} />
                    })}
            </FloatWindow>

            <FloatWindow
                title="Selecionar"
                toggle={this.state.showMembers}
                onDismiss={() => this.setState({ ...this.state, showMembers: false })}>
                <LineSpacing />
                {this.state.items
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
                                const json = await getApiJsonDataPost("members/get", { id: member.id })

                                this.setState({ ...this.state, member: json.item, showMembers: false })
                                //this.props.router.push(`/medico/${doctor.id}`)
                            }} />
                    })}
            </FloatWindow>

            <TitleScreen title="Novo Relatório" href="/">
                <CardItem>
                    <h2 style={{ fontSize: "18pt" }}>Membro:</h2>
                    <ListItem
                        title={this.state.member.nome ? "" : "Selecionar Membro"}
                        description={this.state.member.nome}
                        icon={<img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={this.state.member.img_src} />}
                        action={() => {
                            this.setState({ ...this.state, showMembers: true })
                        }} />

                    <h2 style={{ fontSize: "18pt" }}>Médico:</h2>
                    <ListItem
                        title={this.state.doctor.nome ? "" : "Selecionar Médico"}
                        description={this.state.doctor.nome}
                        icon={<img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={this.state.doctor.img_src} />}
                        action={() => {
                            this.props.router.push("/list")
                        }} />

                    <h2 style={{ fontSize: "18pt" }}>O médico se tornou nosso colaborador?</h2>
                    <RadioItem
                        isChecked={this.state.values[0] == 0}
                        title="Não"
                        onClick={() => {
                            this.state.values[0] = 0
                            this.setState(this.state)
                        }} />
                    <RadioItem
                        isChecked={this.state.values[0] == 1}
                        title="Sim"
                        onClick={() => {
                            this.state.values[0] = 1
                            this.setState(this.state)
                        }} />

                    <h2 style={{ fontSize: "18pt" }}>Você marcou uma revisita?</h2>
                    <RadioItem
                        isChecked={this.state.values[1] == 0}
                        title="Não"
                        onClick={() => {
                            this.state.values[1] = 0
                            this.setState(this.state)
                        }} />
                    <RadioItem
                        isChecked={this.state.values[1] == 1}
                        title="Sim"
                        onClick={() => {
                            this.state.values[1] = 1
                            this.setState(this.state)
                        }} />

                    {this.state.values[1] == 1 &&
                        <React.Fragment>
                            <h2 style={{ fontSize: "18pt" }}>Para quando?</h2>
                            <TextInput
                                type="date"
                                value={this.state.values[2]}
                                onChange={(event) => {
                                    this.state.values[2] = event.target.value
                                    this.setState(this.state)
                                }} />
                        </React.Fragment>}

                    <h2 style={{ fontSize: "18pt" }}>Observações:</h2>
                    <MultilineInput value={this.state.notes} onChange={(event) => {
                        this.setState({ ...this.state, notes: event.target.value })
                    }} />
                    <LineSpacing />
                    <Button onClick={() => {
                        this.send()
                    }}>Enviar</Button>
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

    // async getData() {
    //     const json = await getApiJsonDataPost("/members/get",
    //         {
    //             id: parseInt(this.props.router.query.member),
    //         })

    //     if (json.success)
    //         this.setState({ ...this.state, member: json.item }, () => {
    //             this.getDoctor()
    //         })
    // }

    async getDoctor() {
        const json = await getApiJsonDataPost("/doctors/get",
            {
                id: parseInt(this.props.router.query.doctor)
            })

        if (json.success)
            this.setState({ ...this.state, doctor: json.item })
    }

    async send() {
        const json = await getApiJsonDataPost("/history/insert",
            {
                id_usuario: parseInt(this.props.router.query.member),
                criacao: new Date(),
                metadata: JSON.stringify({
                    medico: this.state.doctor.id,
                    membro: this.state.member.id,
                    formulario: this.state.values
                }),
                observacoes: this.state.notes
            })

        if (json.success)
            alert("Enviado!")
    }

})

//export const getServerSideProps = withUserCredentials()