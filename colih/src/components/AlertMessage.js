import { Component } from "react"
import { BiErrorCircle } from "react-icons/bi"

export default class BlinkMessage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            hasError: false
        }
    }

    componentDidMount() {
        setInterval(() => {
            if (this.props.blink)
                this.setState({ ...this.state, hasError: true }, () => {
                    setTimeout(() => {
                        this.setState({ ...this.state, hasError: false })
                    }, 500)
                })
        }, 1000)
    }

    render() {
        if (!this.state.hasError)
            return this.props.message
        else
            return <div><BiErrorCircle />{` ${this.props.message} `}<BiErrorCircle /></div>
    }

}