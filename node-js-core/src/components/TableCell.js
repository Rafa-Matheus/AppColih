import styled from "styled-components"
import root, { easeEffect } from "./StaticStyles"

const TableCell = styled.td({
    textAlign: "center",
    ...easeEffect,
    ":first-of-type": {
        textAlign: "left",
        paddingLeft: "30px"
    },
    ":hover": {
        background: root.primaryColorLight,
        color: "white"
    }
})

export default (props) => {
    return <TableCell {...props}>{props.children}</TableCell>
}