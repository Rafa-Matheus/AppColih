import styled from "styled-components"
import root from "./StaticStyles"

const TableWraper = styled.div({
    width: "100%",
    borderRadius: root.borderRadius,
    overflow: "hidden",
    "table": {
        width: "100%"
    },
    fontSize: "16pt",
    "@media (max-width: 1200px)": {
        overflowX: "auto",
        "table": {
            maxWidth: "100%",
            whiteSpace:"nowrap"
        }
    }
})

export default (props) => {
    return <TableWraper>
        <table cellspacing="0" cellpadding="0">{props.children}</table>
    </TableWraper>
}