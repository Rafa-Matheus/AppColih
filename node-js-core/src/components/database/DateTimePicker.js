/* #region  Modules */
import { Component } from 'react'
import { getDateString, setDateByString, getTimeString, setTimeByString } from '../../tools/DateTimeUtil'
import root from '../StaticStyles'
import TextInput from '../TextInput'
/* #endregion */

export default class DateTimePicker extends Component {

    /* #region  Setup */
    constructor(props) {
        super(props)

        this.state = {
            dateTime: props.value ? new Date(props.value) : new Date()
        }

        this.onDateChange = this.onDateChange.bind(this)
        this.onTimeChange = this.onTimeChange.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value != this.props.value)
            this.setState({
                dateTime: this.props.value ? new Date(this.props.value) : new Date()
            })
    }
    /* #endregion */

    render() {
        return <div style={{
            display: "grid",
            gridTemplateColumns: `1fr ${root.spacing} 1fr` }}>
            <TextInput
                type="date"
                onChange={this.onDateChange}
                style={{ gridColumn: 1 }}
                value={getDateString(this.state.dateTime)} />
            <TextInput
                type="time"
                onChange={this.onTimeChange}
                style={{ gridColumn: 3 }}
                value={getTimeString(this.state.dateTime)} />
        </div>
    }

    /* #region  Functions */
    onDateChange(event) {
        if (event.target.value) {
            var dateTime = this.state.dateTime

            dateTime = setDateByString(dateTime, event.target.value)
            this.setState({ ...this.state, dateTime: dateTime }, () => {
                this.handleOnChange()
            })
        }
    }

    onTimeChange(event) {
        if (event.target.value) {
            var dateTime = this.state.dateTime

            dateTime = setTimeByString(dateTime, event.target.value)
            this.setState({ ...this.state, dateTime: dateTime }, () => {
                this.handleOnChange()
            })
        }
    }

    handleOnChange() {
        if (this.props.onChange)
            this.props.onChange(this.state.dateTime)
    }
    /* #endregion */

}