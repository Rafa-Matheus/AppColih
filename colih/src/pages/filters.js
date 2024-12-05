/* #region  Modules */
import React, { Component } from 'react'

import { withRouter } from 'next/router'
import { GiPirateCoat } from 'react-icons/gi'
import { FaRegHandshake } from 'react-icons/fa'
import { BiMap } from 'react-icons/bi'
import { BsClipboardCheck } from 'react-icons/bs'

//import withUserCredentials from '../lib/withUserCredentials'
import TitleScreen from '../screens/TitleScreen'
import ListItem from '../components/ListItem'
import CardItem from '../components/CardItem'
import Button from 'components/Button'

import FloatWindow from 'components/FloatWindow'
import CheckItem from '../components/CheckItem'
import RadioItem from '../components/RadioItem'
import VerticalFlexContainer from '../components/VerticalFlexContainer'
import LineSpacing from 'components/LineSpacing'
import querystring from 'querystring'
/* #endregion */

export default withRouter(class extends Component {

    /* #region  Setup */
    constructor(props) {
        super(props)

        this.state = {
            especialidadeVisible: false,
            especialidadesNames: ["Neurologista", "Cardiologista", "Clínico Geral"],
            especialidadesValues: [],

            colaboradorVisible: false,
            colaboradorNames: ["Sim", "Não"],
            colaboradorValue: undefined,

            cidadeVisible: false,
            cidadesNames: ["São Carlos", "Araraquara"],
            cidadesValues: [],

            atendimentoVisible: false,
            atendimentosNames: ["Particular", "SUS"],
            atendimentosValues: []
        }

        this.state = {
            ...this.state,
            especialidadesValues: this.splitParamToValues("esp", "especialidadesNames"),
            colaboradorValue: this.getFilterValue("col"),
            cidadesValues: this.splitParamToValues("loc", "cidadesNames"),
            atendimentosValues: this.splitParamToValues("at", "atendimentosNames")
        }
    }
    /* #endregion */

    render() {
        return <React.Fragment>
            {this.createMultiOptionWindow("Especialidade", "especialidadeVisible", "especialidadesNames", "especialidadesValues", "esp")}
            {this.createSingleOptionWindow("Colaborador", "colaboradorVisible", "colaboradorNames", "colaboradorValue", "col")}
            {this.createMultiOptionWindow("Cidade", "cidadeVisible", "cidadesNames", "cidadesValues", "loc")}
            {this.createMultiOptionWindow("Atendimento", "atendimentoVisible", "atendimentosNames", "atendimentosValues", "at")}
            <TitleScreen title="Filtros" href={this.backLink()}>
                {Object.keys(this.props.router.query).length > 0 && <Button style="danger" onClick={() => { 
                    this.props.router.replace('/filters', undefined, { shallow: true })
                    //Voltar para a página de médicos
                 }}>Remover Filtros</Button>}
                <div style={{ 
                    display: "flex", 
                    flexWrap: "wrap", 
                    rowGap: "15px", 
                    marginTop: "20px" }}>
                    <CardItem>
                        <ListItem
                            icon={<GiPirateCoat/>} 
                            title="Especialidade" 
                            description={this.split(this.getFilterValue("esp"))}
                            action={() => { this.setState({ ...this.state, especialidadeVisible: !this.especialidadeVisible }) }}/>
                    </CardItem>
                    <CardItem>
                        <ListItem 
                            icon={<FaRegHandshake/>} 
                            title="Colaborador" 
                            description={this.getFilterValue("col") ?? "Não Especificado"}
                            action={() => { this.setState({ ...this.state, colaboradorVisible: !this.colaboradorVisible }) }}/>
                    </CardItem>
                    <CardItem>
                        <ListItem 
                            icon={<BiMap/>} 
                            title="Cidade" 
                            description={this.split(this.getFilterValue("loc"))}
                            action={() => { this.setState({ ...this.state, cidadeVisible: !this.cidadeVisible }) }}/>
                    </CardItem>
                    <CardItem>
                        <ListItem 
                            icon={<BsClipboardCheck/>} 
                            title="Atendimento"
                            description={this.split(this.getFilterValue("at"))}
                            action={() => { this.setState({ ...this.state, atendimentoVisible: !this.atendimentoVisible }) }}/>
                    </CardItem>
                </div>
            </TitleScreen>
        </React.Fragment>
    }

    backLink() {
        return `/list${Object.keys(this.props.router.query).length > 0 ? "?" : ""}${querystring.stringify(this.props.router.query)}`
    }

    createMultiOptionWindow(title, visibility, names, values, p) {
        return <FloatWindow 
                title={title}
                toggle={this.state[visibility]} 
                onDismiss={
                () => {
                    this.state[visibility] = false
                    this.setState(this.state)
                }}
                onSubmit={() => {
                    const query = {}
                    query[p] = this.state[names].filter((_, index) => {
                        return this.state[values].includes(index)
                    }).join("|")

                    var route = {}
                    route["query"] = { 
                        ...this.props.router.query,
                        ...query
                    }

                    for (const key in route["query"])
                        if(route.query[key] === "")
                            delete route.query[key]

                    this.props.router.replace(route)

                    this.state[visibility] = false
                    this.setState(this.state)
                }}>
                <VerticalFlexContainer gap="10px">
                    <LineSpacing height="10px"/>
                    {this.state[names].map((item, index) => {
                        return <CheckItem 
                            title={item}
                            isChecked={this.state[values].includes(index)} 
                            onClick={() => {
                                const entries = this.state[values]

                                if (!entries.includes(index))
                                    entries.push(index)
                                else
                                    entries.splice(entries.indexOf(index), 1)

                                this.state[values] = entries
                                this.setState(this.state)
                            }}/>
                    })}
                </VerticalFlexContainer>
            </FloatWindow>
    }

    createSingleOptionWindow(title, visibility, names, value, p) {
        return <FloatWindow 
                title={title}
                toggle={this.state[visibility]} 
                onDismiss={
                () => {
                    this.state[visibility] = false
                    this.setState(this.state)
                }}
                onSubmit={() => {
                    const query = {}
                    query[p] = this.state[value]

                    var route = {}
                    route["query"] = { 
                        ...this.props.router.query,
                        ...query
                    }

                    for (const key in route["query"])
                        if(route.query[key] === "")
                            delete route.query[key]

                    this.props.router.replace(route)

                    this.state[visibility] = false
                    this.setState(this.state)
                }}>
                <VerticalFlexContainer gap="10px">
                    <LineSpacing height="10px"/>
                    {this.state[names].map(item => {
                        return <RadioItem 
                            title={item}
                            isChecked={this.state[value] == item} 
                            onClick={() => {
                                this.state[value] = item
                                this.setState(this.state)
                            }}/>
                    })}
                </VerticalFlexContainer>
            </FloatWindow>
    }

    split(filter) {
        if(filter != undefined) {
            const p = filter.split("|")
            return p.join(", ")
        }

        return "Não Especificado"
    }

    splitParamToValues(filterName, values) {
        const value = this.getFilterValue(filterName)

        const result = []
        if(value != undefined) {
            var index = 0
            var items = value.split("|")
            while(index < items.length) {
                result.push(this.state[values].indexOf(items[index]))
                index++
            }
        }

        return result
    }

    getFilterValue(filter) 
    {
        return this.props.router.query[filter]
    }

})

//export const getServerSideProps = withUserCredentials()