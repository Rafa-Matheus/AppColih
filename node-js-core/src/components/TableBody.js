import styled from "styled-components"
import root from "./StaticStyles"

const TableBody = styled.tbody({
    lineHeight: root.minimumSize,
    borderTop: `${root.strokeWidth} solid ${root.neutralColor}`
})

export default (props) => {
    return <TableBody>{props.children}</TableBody>
}