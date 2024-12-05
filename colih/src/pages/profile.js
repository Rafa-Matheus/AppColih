/* #region  Modules */
import React, { Component } from 'react'
import LineSpacing from 'components/LineSpacing'

import { BsPencilFill } from 'react-icons/bs'

import { withRouter } from 'next/router'
import withUserCredentials from '../../lib/withUserCredentials'
import Category from '../components/Category'
import ListItem from '../components/ListItem'
import NavBar from '../components/NavBar'
/* #endregion */

export default withRouter(class extends Component {

    /* #region  Setup */
    constructor(props) {
        super(props)
    }
    /* #endregion */

    render() {
        return <React.Fragment>
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
                            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}><BsPencilFill/></div>
                        <img style={{ marginTop: "20px", borderRadius: "100px", objectFit: "cover", background: "grey" }} width="200px" height="200px" src={this.props.user.img_src}/>
                    </div>
                    <div style={{ 
                        fontSize: "32pt", 
                        lineHeight: "10px", 
                        marginTop: "30px", 
                        marginBottom: "30px" }}>{this.props.user.nome.split(" ")[0]}</div>
                </center>
            <Category title="Informações Básicas">
                <ListItem/>
                <ListItem/>
                <ListItem/>
            </Category>
            <Category title="Outras Informações">
                <ListItem/>
                <ListItem/>
                <ListItem/>
            </Category>
            <LineSpacing height="100px"/>
            <NavBar/>
        </React.Fragment>
    }

    // canSeeDetails() {
    //     return parseInt(this.props.user.access_level) != 4
    // }

})

export const getServerSideProps = withUserCredentials()