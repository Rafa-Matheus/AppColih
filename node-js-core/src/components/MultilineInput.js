import styled from "styled-components"
import root, { formInputAddonStyles, formInputStyles } from "./StaticStyles"

const MultilineInput = styled.textarea({
    paddingRight: root.borderRadius,
    borderRadius: root.borderRadius,
    resize: "none",
    ...formInputStyles,
    ...formInputAddonStyles,
    lineHeight: "30px"
})

export default (props) => {
    return <MultilineInput
        style={{ height: props.height ?? "100px" }}
        {...props} />
}