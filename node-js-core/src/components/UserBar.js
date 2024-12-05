import styled from "styled-components"
import root, { boxShadow } from "./StaticStyles"
import { AiOutlineMenu } from 'react-icons/ai'

const UserBar = styled.div({
    position: "absolute",
    height: "60px",
    background: root.primaryColorLight,
    left: "300px",
    padding: "15px",
    top: 0,
    bottom: 0,
    right: 0,
    "@media (max-width: 768px)": {
        left: 0
    },
    ...boxShadow
})

const Toggle = styled.div({
    cursor: "pointer",
    display: "inline",
    fontSize: "20pt",
    color: "white",
    marginRight: "10px",
    "@media (max-width: 768px)": {
        left: 0
    },
    "@media (min-width: 768px)": {
        display: "none"
    }
})

export default (props) => {
    return <UserBar>
        <Toggle onClick={props.onToggle}><AiOutlineMenu /></Toggle>
        {props.children}
    </UserBar>
}