import styled from 'styled-components'
import root from './StaticStyles'

const HScroll = styled.div({
    overflowX: "auto",
    height: "fit-content",
    whiteSpace: "nowrap",
    marginLeft: `calc(-1 * ${root.spacing})`,
    marginRight: `calc(-1 * ${root.spacing}) !important`,
    paddingRight: root.spacing,
    paddingLeft: root.spacing,
    "div": {
        marginRight: root.spacing
    }
})

export default (props) => {
    return <HScroll>{props.children}</HScroll>
}