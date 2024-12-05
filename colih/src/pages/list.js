/* #region  Modules */
import React, { Component } from 'react'
import Link from 'next/link'

import { withRouter } from 'next/router'

//import withUserCredentials from '../lib/withUserCredentials'
import Button from 'components/Button'
import ProfileItem from '../components/ProfileItem'
import { MdFilterAlt } from 'react-icons/md'
import { BsSearch } from 'react-icons/bs'
import TitleScreen from '../screens/TitleScreen'
import VerticalFlexContainer from '../components/VerticalFlexContainer'
import HScroll from 'components/HScroll'
import HoldButton from 'components/HoldButton'
import FloatingButton from '../components/FloatingButton'
import { getApiJsonDataPost } from 'tools/Util'
import { plural } from 'tools/TextUtil'
import querystring from 'querystring'
import LineSpacing from 'components/LineSpacing'
import { IoCloseOutline } from 'react-icons/io5'
import FloatWindow from 'components/FloatWindow'
import TextInput from 'components/TextInput'
import MainContainer from 'components/MainContainer'
/* #endregion */

export default withRouter(class extends Component {

    /* #region  Setup */
    constructor(props) {
        super(props)

        this.state = {
            searchVisibility: false,
            searchValue: "",
            items: []
        }
    }

    componentDidMount() {
        this.fetch()
    }
    /* #endregion */

    render() {
        return <React.Fragment>
            <FloatWindow
                title="Pesquisar"
                toggle={this.state.searchVisibility}
                onDismiss={() => this.setState({ ...this.state, searchVisibility: false })}
                onSubmit={() => {
                    this.search()
                }}>
                <LineSpacing />
                <TextInput
                    value={this.state.searchValue}
                    onChange={(event) => {
                        this.setState({ ...this.state, searchValue: event.target.value })
                    }} />
            </FloatWindow>
            <TitleScreen title="Médicos" href="/" background="white">
                <div style={{ marginTop: "20px" }}>
                    <Link href={this.filtersLink()}>
                        <Button style="light"><MdFilterAlt style={{ marginRight: "5px" }} /> Filtrar</Button>
                    </Link>
                    <LineSpacing size="5px" />
                    <HScroll>
                        {this.getHoldButtons()}
                    </HScroll>
                </div>
                <VerticalFlexContainer gap="30px">
                    {
                        this.state.items &&
                        this.state.items.length > 0 &&
                        <React.Fragment>
                            <div style={{
                                fontSize: "18pt",
                                height: "30px",
                                marginTop: "10px"
                            }}>{plural(
                                "médico ativo",
                                "médicos ativos",
                                "Nenhum médico ativo",
                                this.state.items.length)}</div>
                            {this.state.items.map(doctor => {
                                return <ProfileItem
                                    img={doctor.img_src}
                                    name={doctor.nome}
                                    secondText={doctor.atendimento}
                                    thirdText={
                                        <React.Fragment>
                                            {doctor.especialidade}<br />
                                            <div style={{ color: "grey", cursor: "pointer" }} onClick={() => {
                                                this.props.router.push(`/schedule?doctor=${doctor.id}`)
                                            }}>Novo Agendamento</div>
                                        </React.Fragment>}
                                    onClick={() => {
                                        this.props.router.push(`/medico/${doctor.id}`)
                                    }} />
                            })}
                        </React.Fragment>
                    }
                </VerticalFlexContainer>
            </TitleScreen>
            <MainContainer>
                <FloatingButton onClick={() => { this.setState({ ...this.state, searchVisibility: true }) }}><BsSearch /></FloatingButton>
            </MainContainer>
        </React.Fragment>
    }

    getHoldButtons() {
        const result = []

        const filters = ["esp", "col", "loc", "at"]
        var filterIndex = 0
        while (filterIndex < filters.length) {
            const i = filterIndex
            const values = this.props.router.query[filters[i]]
            if (values) {
                var paramIndex = 0
                const params = values.split("|")
                while (paramIndex < params.length) {
                    const pi = paramIndex
                    result.push(<HoldButton onClick={() => {
                        var newParams = params
                        newParams.splice(pi, 1)

                        const query = {}
                        query[filters[i]] = newParams.join("|")

                        var route = {}
                        route["query"] = {
                            ...this.props.router.query,
                            ...query
                        }

                        for (const key in route["query"])
                            if (route.query[key] === "")
                                delete route.query[key]

                        this.props.router.push(route)

                        setTimeout(() => {
                            this.fetch()
                        }, 500)
                    }}>{params[paramIndex]}<IoCloseOutline style={{ marginLeft: "5px" }} /></HoldButton>)
                    paramIndex++
                }
            }

            filterIndex++
        }

        return result
    }

    filtersLink() {
        return `/filters${Object.keys(this.props.router.query).length > 0 ? "?" : ""}${querystring.stringify(this.props.router.query)}`
    }

    async fetch() {
        const json = await getApiJsonDataPost("/doctors/list", { filters: this.props.router.query })

        if (json.success)
            this.setState({ items: json.items })
        else
            alert("Erro ao listar os médicos")
    }

    async search() {
        const json = await getApiJsonDataPost("/doctors/search", { search: this.state.searchValue })

        if (json.success) {
            console.log(json.items)
            this.setState({ items: json.items, searchVisibility: false })
        }
        else
            alert("Erro ao listar os médicos")
    }

    // canSeeDetails() {
    //     return parseInt(this.props.user.access_level) != 4
    // }

})

//export const getServerSideProps = withUserCredentials()