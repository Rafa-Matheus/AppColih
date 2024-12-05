import styled from "styled-components"
import root from "./StaticStyles"

const TableRow = styled.tr({
    lineHeight: root.minimumSize,
    borderTop: `${root.strokeWidth} solid ${root.neutralColor}`
})

export default (props) => {
    return <TableRow {...props}>{props.children}</TableRow>
}