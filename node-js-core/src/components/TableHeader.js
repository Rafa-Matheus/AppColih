import styled from "styled-components"
import root from "./StaticStyles"

const TableHeader = styled.thead({
    background: root.primaryColor,
    color: "white",
    fontWeight: "600"
})

export default (props) => {
    return <TableHeader>{props.children}</TableHeader>
}