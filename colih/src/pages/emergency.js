/* #region  Modules */
import React, { Component } from 'react'

import { withRouter } from 'next/router'
import { getApiJsonDataPost } from "tools/Util"
import TitleScreen from '../screens/TitleScreen'
import CardItem from '../components/CardItem'
import RadioItem from '../components/RadioItem'
import TextInput from 'components/TextInput'
import MultilineInput from 'components/MultilineInput'
import LineSpacing from 'components/LineSpacing'
import Button from 'components/Button'
import ListItem from '../components/ListItem'
import NumericUpDown from 'components/NumericUpDown'
import SelectInput from 'components/SelectInput'
/* #endregion */

export default withRouter(class extends Component {

    /* #region  Setup */
    constructor(props) {
        super(props)

        this.state = {
            values: [
                "", //Nome do paciente
                18, //Idade
                "", //Congregação
                "", //Endereço
                "", //Quarto
                "", //Quem entrou em contato
                "", //Relacionamento
                "", //Situação espiritual
                "emergencia"],
            notes: "",
            member: {}
        }
    }

    componentDidMount() {
        this.getData()
    }
    /* #endregion */

    render() {
        return <TitleScreen title="Nova Emergência" href="/">
            <CardItem>
                <h2 style={{ fontSize: "18pt" }}>Membro:</h2>
                <ListItem
                    title={this.state.member.nome ? "" : "Selecionar Membro"}
                    description={this.state.member.nome}
                    icon={<img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={this.state.member.img_src} />}
                    action={() => {
                        this.props.router.push("/ranking")
                    }} />

                <h2 style={{ fontSize: "18pt" }}>Nome do Paciente:</h2>
                <TextInput value={this.state.values[0]} onChange={e => {
                    this.state.values[0] = e.target.value;
                    this.setState(this.state)
                }}></TextInput>

                <h2 style={{ fontSize: "18pt" }}>Idade do Paciente:</h2>
                <NumericUpDown value={this.state.values[1]} onChange={e => {
                    this.state.values[1] = e
                    this.setState(this.state)
                }}></NumericUpDown>

                <h2 style={{ fontSize: "18pt" }}>Congregação:</h2>
                <TextInput value={this.state.values[2]} onChange={e => {
                    this.state.values[2] = e.target.value
                    this.setState(this.state)
                }}></TextInput>

                <h2 style={{ fontSize: "18pt" }}>Endereço do Atendimento:</h2>
                <TextInput value={this.state.values[3]} onChange={e => {
                    this.state.values[3] = e.target.value
                    this.setState(this.state)
                }}></TextInput>

                <h2 style={{ fontSize: "18pt" }}>Quarto:</h2>
                <TextInput value={this.state.values[4]} onChange={e => {
                    this.state.values[4] = e.target.value
                    this.setState(this.state)
                }}></TextInput>

                <h2 style={{ fontSize: "18pt" }}>Nome de Quem Entrou em Contato:</h2>
                <TextInput value={this.state.values[5]} onChange={e => {
                    this.state.values[5] = e.target.value
                    this.setState(this.state)
                }}></TextInput>

                <h2 style={{ fontSize: "18pt" }}>Grau de Relacionameto com o Paciente:</h2>
                <SelectInput value={this.state.values[6]} onChange={e => {
                    this.state.values[6] = e.target.value
                    this.setState(this.state)
                }}>
                    <option value="anciao">Ancião</option>
                    <option value="amigo">Amigo (a)</option>
                    <option value="irmao">Irmão (ã)</option>
                    <option value="dpa">Procurador (DPA)</option>
                    <option value="pais">Pai/Mãe</option>
                    <option value="conjuge">Cônjuge</option>
                </SelectInput>

                <h2 style={{ fontSize: "18pt" }}>Situação Espiritual:</h2>
                <SelectInput value={this.state.values[7]} onChange={e => {
                    this.state.values[7] = e.target.value
                    this.setState(this.state)
                }}>
                    <option value="batizado">Batizado (a)</option>
                    <option value="pub_n_batizado">Publicador (a) não batizado (a)</option>
                    <option value="filho">Filho (a) de batizado</option>
                    <option value="estudante">Estudante</option>
                    <option value="pub_ativo">Publicador ativo</option>
                    <option value="inativo">Inativo</option>
                </SelectInput>

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
    }

    async getData() {
        const json = await getApiJsonDataPost("/members/get",
            {
                id: parseInt(this.props.router.query.member),
            })

        if (json.success)
            this.setState({ ...this.state, member: json.item })
    }

    async send() {
        const json = await getApiJsonDataPost("/history/insert",
            {
                id_usuario: parseInt(this.props.router.query.member),
                criacao: new Date(),
                metadata: JSON.stringify({
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