/* #region  Modules */
import React, { Component } from 'react'
import LineSpacing from 'components/LineSpacing'

import { BsPencilFill } from 'react-icons/bs'
import { FaStethoscope } from 'react-icons/fa'

import { withRouter } from 'next/router'
//import withUserCredentials from '../../../lib/withUserCredentials'
import Category from '../../components/Category'
import ListItem from '../../components/ListItem'
import Button from 'components/Button'
import NavBar from '../../components/NavBar'
import { IoMdSend, IoMdCall } from 'react-icons/io'
import { MdGpsFixed, MdEmail } from 'react-icons/md'
import { FiClipboard } from 'react-icons/fi'
import { BiMap } from 'react-icons/bi'
import { MdOutlineHistory } from 'react-icons/md'

import Doctor from '../../../model/Doctor'
import Emergency from '../../../model/Emergency'
import TitleDescription from '../../components/TitleDescription'
/* #endregion */

export default withRouter(class extends Component {

    /* #region  Setup */
    constructor(props) {
        super(props)
    }
    /* #endregion */

    render() {
        return <React.Fragment>
            {this.props.doctor.id && <React.Fragment>
                <center>
                    <div style={{ position: "relative", width: "200px" }}>
                        <div style={{
                            cursor: "pointer",
                            position: "absolute",
                            right: "0",
                            bottom: "15px",
                            width: "50px",
                            height: "50px",
                            background: "#2E78E9",
                            paddingTop: "3px",
                            fontSize: "20pt",
                            borderRadius: "25px",
                            color: "white",
                            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                        }}><BsPencilFill /></div>
                        <img style={{ marginTop: "20px", borderRadius: "100px", objectFit: "cover" }} width="200px" height="200px" src={this.props.doctor.img_src} />
                    </div>
                    <div style={{ fontSize: "32pt", lineHeight: "10px", marginTop: "30px", marginBottom: "30px" }}>{this.props.doctor.nome}</div>
                    <div style={{ marginTop: "20px", width: "220px" }}>
                        {
                            this.props.doctor.colaborador ?
                                <Button>Colaborador</Button> :
                                <Button style="danger">Não Colaborador</Button>
                        }
                        <br />
                        <Button style="light" onClick={() => {
                            this.props.router.push(`/schedule?doctor=${this.props.doctor.id}`)
                        }}>Novo Agendamento</Button>
                    </div>
                </center>
                <Category title="Informações Profissionais">
                    <ListItem
                        icon={<FaStethoscope />}
                        title="Especialidade (s)"
                        description={this.props.doctor.especialidade} />
                    <ListItem
                        icon={<FiClipboard />}
                        title="Atendimento"
                        description={this.props.doctor.atendimento} />
                    <ListItem
                        icon={<IoMdCall />}
                        action={() => { alert("Popup de números") }}
                        customContent={
                            <React.Fragment>
                                {Object.keys(this.props.doctor.telefones).map(telefone => {
                                    return <TitleDescription title={telefone} description={this.props.doctor.telefones[telefone]} />
                                })}
                            </React.Fragment>
                        } />
                    <ListItem
                        icon={<MdEmail />}
                        title="Email"
                        description={this.props.doctor.email}
                        action={() => { alert("Enviar email") }}
                        actionIcon={<IoMdSend />} />
                    <ListItem
                        icon={<BiMap />}
                        title="Endereço"
                        description={this.props.doctor.endereco}
                        action={() => { alert("Rota") }}
                        actionIcon={<MdGpsFixed />} />
                </Category>
                {this.props.history.length > 0 &&
                    <Category title="Histórico">
                        {this.props.history.map(h => {
                            return <ListItem
                                key={h.id}
                                icon={<MdOutlineHistory />}
                                title="Em aberto"
                                description={h.observacoes} />
                        })}
                    </Category>}
                <LineSpacing height="100px" />
                <NavBar />
            </React.Fragment>}
        </React.Fragment>
    }

    // canSeeDetails() {
    //     return parseInt(this.props.user.access_level) != 4
    // }

})

//export const getServerSideProps = withUserCredentials()


/* #region  Propriedades estáticas */
export const getStaticPaths = async () => {
    const allItems = await doctors.getAll()
    const paths = allItems.map(value => {
        return { params: { id: value.id.toString() } }
    })

    return {
        paths,
        fallback: true
    }
}

const doctors = new Doctor()
const histories = new Emergency()
export const getStaticProps = async (context) => {
    const { id } = context.params

    const { exists, item } = await doctors.getById(id)
    const history = await histories.getByCrm(item.crm)

    if (exists)
        return {
            props: {
                doctor: item,
                history: history
            }
        }
    else
        return { props: {} }
}
/* #endregion */