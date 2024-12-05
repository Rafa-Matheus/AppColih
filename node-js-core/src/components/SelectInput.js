import styled from "styled-components"
import root, { formInputAddonStyles, formInputStyles } from "./StaticStyles"

const SelectInput = styled.select({
    cursor: "pointer",
    paddingRight: root.borderRadius,
    borderRadius: root.borderRadius,
    WebkitAppearance: "none",
    MozAppearance: "none",
    appearance: "none",
    background: root.neutralColor,
    "option": {
        background: "white",
        color: "black"
    },
    ...formInputStyles,
    ...formInputAddonStyles
})

export default (props) => {
    return <SelectInput {...props}>{props.children}</SelectInput>
}