import styled from "styled-components"
import InputMask from "react-input-mask"
import root, { formInputAddonStyles, formInputStyles } from "./StaticStyles"

const TextInput = styled(InputMask)({
    paddingRight: root.borderRadius,
    borderRadius: root.borderRadius,
    resize: "none",
    ...formInputStyles,
    ...formInputAddonStyles
})

export default (props) => {
    return <TextInput {...props} />
}