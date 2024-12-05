/* #region  Modules */
import React, { Component } from 'react'
import styles from "../styles/DashboardScreen.module.css"

import LeftSideBar from 'components/LeftSideBar'
import UserBar from 'components/UserBar'
import Panel from 'components/Panel'
import RightContainer from 'components/RightContainer'
import Image from 'next/image'

import { AiOutlineHome, AiOutlineHistory, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'
import { RiUserSettingsLine } from 'react-icons/ri'
import Link from 'next/link'
/* #endregion */

export default class MainScreen extends Component {

    /* #region  Setup */
    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            isUserBalloonVisible: false
        }

        this.myRef = React.createRef()
    }

    // componentDidMount() {
    //     const handleClickOutside = (e) => {
    //         if(!this.myRef.current.contains(e.target))
    //             this.setState({ ...this.state, isUserBalloonVisible: false })
    //     }

    //     document.addEventListener("click", handleClickOutside, true)
    // }
    /* #endregion */

    render() {
        return (
            <React.Fragment>
                <LeftSideBar visible={this.state.visible} onToggle={() => {
                    this.setState({ ...this.state, visible: !this.state.visible })
                }}>
                    <center>
                        <Link href="/">
                            <Image src="/assets/white_parkplus.png"
                                width={200}
                                height={-1} />
                        </Link>
                    </center>
                    <div className={styles.list}>
                        <ul>
                            <li><Link href="/"><AiOutlineHome /> Home</Link></li>
                            <li><Link href="#"><FiSettings /> Settings</Link></li>
                            <li><Link href="/manage/history"><AiOutlineHistory /> History</Link></li>
                            {this.canManageUsers() && <li><Link href="/manage/users"><RiUserSettingsLine /> Manage Users</Link></li>}
                        </ul>
                    </div>
                </LeftSideBar>
                <UserBar onToggle={() => {
                    this.setState({ ...this.state, visible: !this.state.visible })
                }}>
                    <Link href="#" className={styles.search}>
                        <AiOutlineSearch />
                    </Link>
                    <div className={styles.name}>{this.props.user.name}</div>
                    <div className={styles.user} onClick={() => {
                        this.setState({ ...this.state, isUserBalloonVisible: !this.state.isUserBalloonVisible })
                    }}>
                        <AiOutlineUser />
                    </div>
                </UserBar>
                <div style={{
                    position: "absolute",
                    right: "10px",
                    top: "50px",
                    width: "300px",
                    height: "100px",
                    zIndex: 1,
                    visibility: this.state.isUserBalloonVisible ? "visible" : "hidden"
                }} ref={this.myRef} >
                    <Panel>
                        <div style={{ margin: "10px" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "50px 1fr 20px" }}>
                                <div style={{ gridColumn: 1, display: "flex", alignItems: "center", justifyContent: "center" }} >
                                    <img style={{
                                        background: "black",
                                        borderRadius: "50px",
                                        width: "50px",
                                        height: "50px",
                                        objectFit: "cover"
                                    }} src="./assets/user.jpg" />
                                </div>
                                <div style={{ gridColumn: 2, paddingLeft: "10px" }}>
                                    <strong>{this.props.user.name}</strong><br />
                                    <i>{this.getUserLevelName()}</i><br />
                                    <Link href="/api/account/logout">Logout</Link><br />
                                </div>
                                <div style={{
                                    cursor: "pointer",
                                    gridColumn: 3,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "grey",
                                    fontSize: "20pt"
                                }}>
                                    <FiSettings />
                                </div>
                            </div>
                        </div>
                    </Panel>
                </div>
                <RightContainer>{this.props.children}</RightContainer>
            </React.Fragment>
        )
    }

    canManageUsers() {
        const accessLevel = parseInt(this.props.user.access_level)
        return accessLevel == 0
            || accessLevel == 2
            || accessLevel == 3
    }

    getUserLevelName() {
        const accessLevel = parseInt(this.props.user.access_level)
        switch (accessLevel) {
            case 0:
                return "Administrator"
            case 1:
                return "Technician"
            case 2:
                return "Employee"
            case 3:
                return "Building Management"
            case 4:
                return "User"
        }
    }

}