/* #region  Modules */
import React, { Component } from 'react'

import { withRouter } from 'next/router'
import { getApiJsonDataPost } from "tools/Util"
import withUserCredentials from '../../lib/withUserCredentials'
import TitleScreen from '../screens/TitleScreen'
import CardItem from '../components/CardItem'
import RadioItem from '../components/RadioItem'
import TextInput from 'components/TextInput'
import MultilineInput from 'components/MultilineInput'
import LineSpacing from 'components/LineSpacing'
import Button from 'components/Button'
import HoldButton from 'components/HoldButton'
import ListItem from '../components/ListItem'

import NotificationManager from '../components/controller/NotificationManager'
const nt = new NotificationManager()
/* #endregion */

export default withRouter(class extends Component {

    /* #region  Setup */
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            timeType: -1,
            dateType: -1,
            date: new Date(),
            days: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            firstTime: new Date(),
            lastTime: new Date(),
            notes: "",
            doctor: {}
        }
    }

    componentDidMount() {
        this.getDoctor()
    }
    /* #endregion */

    render() {
        return <TitleScreen title="Novo Agendamento" href="/">
            <CardItem>
                <h2 style={{ fontSize: "18pt" }}>Título:</h2>
                <TextInput value={this.state.title} onChange={(event) => {
                    this.setState({ ...this.state, title: event.target.value })
                }}/>

                <LineSpacing/>
                <h2 style={{ fontSize: "18pt" }}>Médico:</h2>
                <ListItem
                    title={this.state.doctor.nome ? "" : "Selecionar Médico"}
                    description={this.state.doctor.nome}
                    icon={<img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={this.state.doctor.img_src}/>}
                    action={() => {
                        this.props.router.push("/list")
                    }} />

                <h2 style={{ fontSize: "18pt" }}>Data:</h2>
                <RadioItem 
                    isChecked={this.state.dateType == 0} 
                    title="Específica"
                    onClick={() => { this.setState({ ...this.state, dateType: 0 }) }}/>
                <RadioItem 
                    isChecked={this.state.dateType == 1} 
                    title="Não Específica"
                    onClick={() => { this.setState({ ...this.state, dateType: 1 }) }}/>

                {this.state.dateType == 0 && 
                    <TextInput 
                        type="date" 
                        value={this.state.date}
                        onChange={(event) => {
                            this.setState({ ...this.state, date: event.target.value })
                        }}/>}
                {this.state.dateType == 1 && 
                <React.Fragment>
                        {[
                            "Segunda (Manhã)",
                            "Segunda (Tarde)",
    
                            "Terça (Manhã)",
                            "Terça (Tarde)",
    
                            "Quarta (Manhã)",
                            "Quarta (Tarde)",
    
                            "Quinta (Manhã)",
                            "Quinta (Tarde)",
    
                            "Sexta (Manhã)",
                            "Sexta (Tarde)",
    
                            "Sábado (Manhã)",
                            "Sábado (Tarde)",
    
                            "Domingo (Manhã)",
                            "Domingo (Tarde)"
                        ].map((item, index) => {
                            const i = index
                            return <HoldButton 
                                isChecked={this.state.days[i] == 1} 
                                onClick={() => {
                                    this.state.days[i] = this.state.days[i] == 1 ? 0 : 1
                                    this.setState(this.state)
                            }}>{item}</HoldButton>
                        })}
                </React.Fragment>}
                
                <h2 style={{ fontSize: "18pt" }}>Horário:</h2>
                <RadioItem 
                    isChecked={this.state.timeType == 0} 
                    title="Específico"
                    onClick={() => { this.setState({ ...this.state, timeType: 0 }) }}/>
                <RadioItem 
                    isChecked={this.state.timeType == 1} 
                    title="Não Específico"
                    onClick={() => { this.setState({ ...this.state, timeType: 1 }) }}/>

                {this.state.timeType == 0 && 
                <TextInput type="time" value={this.state.firstTime} onChange={(event) => {
                    this.setState({ ...this.state, firstTime: event.target.value })
                }} />}
                {this.state.timeType == 1 && 
                <React.Fragment>
                    <h2 style={{ 
                        fontSize: "18pt" }}>Entre</h2>
                    <TextInput type="time" value={this.state.firstTime} onChange={(event) => {
                        this.setState({ ...this.state, firstTime: event.target.value })
                    }}/>
                    <h2 style={{ 
                        fontSize: "18pt" }}>até</h2>
                    <TextInput type="time" value={this.state.lastTime} onChange={(event) => {
                        this.setState({ ...this.state, lastTime: event.target.value })
                    }}/>
                </React.Fragment>}
                <h2 style={{ fontSize: "18pt" }}>Observações:</h2>
                <MultilineInput value={this.state.notes} onChange={(event) => {
                    this.setState({ ...this.state, notes: event.target.value })
                }}/>
                <LineSpacing/>
                <Button onClick={() => {
                    this.send()
                }}>Agendar</Button>
            </CardItem>
        </TitleScreen>
    }

    async getDoctor() {
        const json = await getApiJsonDataPost("/doctors/get", 
        {
            id: parseInt(this.props.router.query.doctor)
        })

        //console.log(json)

        if(json.success)
            this.setState({ ...this.state, doctor: json.item })
    }

    async send(){
        const json = await getApiJsonDataPost("/schedule", 
        { 
            usuario: 1,
            criacao: new Date(),
            titulo: this.state.title,
            dias: JSON.stringify(this.state.days),
            data: this.state.date,
            horario_inicial: this.state.firstTime,
            horario_final: this.state.lastTime,
            observacoes: this.state.notes
        })

        nt.send(this.props.user.id, this.state.title, json.id)

        if(json.success)
            alert("Agendado!")
    }

    // canSeeDetails() {
    //     return parseInt(this.props.user.access_level) != 4
    // }

})

export const getServerSideProps = withUserCredentials()