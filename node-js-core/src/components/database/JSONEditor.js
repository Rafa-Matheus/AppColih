import { Component } from "react"
import Button from '../Button'
import TextInput from '../TextInput'
import FlexContainer from '../FlexContainer'
import LineSpacing from '../LineSpacing'
import { BsFillTrashFill } from 'react-icons/bs'

export default class JSONEditor extends Component {

    constructor(props) {
        super(props)

        this.state = {
            items: []
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data != this.props.data)
            this.setData(this.props.data)
    }

    setData(data) {
        const items = []

        const json = JSON.parse(data ?? "{}")
        Object.keys(json).forEach(item => {
            items.push({ key: item, value: json[item] })
        })

        if(!this.loaded) {
            this.setState({ ...this.state, items: items })
            this.loaded = true
        }
    }

    render() {
        return <React.Fragment>
            <Button onClick={() => {
                this.state.items.push({ key: "", value: "" })
                this.setState(this.state)
            }}>Adicionar Chave</Button>
            {this.getItems()}
        </React.Fragment>
    }

    getItems() {
        return this.state.items.map((item, index) => {
            return <React.Fragment>
                <LineSpacing/>
                <FlexContainer>
                    <TextInput
                        placeholder="Chave"
                        defaultValue={item.key}
                        onChange={e => {
                            item.key = e.target.value
                            this.setState(this.state, () => { this.setValue() })
                        }} />
                    <TextInput
                        placeholder="Valor"
                        defaultValue={item.value}
                        onChange={e => {
                            item.value = e.target.value
                            this.setState(this.state, () => { this.setValue() })
                        }} />
                    <Button 
                        style="danger" 
                        onClick={() => {
                            var items = this.state.items
                            items.splice(index, 1)
                            this.setState({ ...this.state, items: items }, () => { this.setValue() })
                        }}>
                        <BsFillTrashFill/>
                    </Button>
                </FlexContainer>
            </React.Fragment>
        })
    }

    setValue() {
        const json = {}

        var jsonIndex = 0
        while(jsonIndex < this.state.items.length)
        {
            const item = this.state.items[jsonIndex]
            json[item.key] = item.value
            jsonIndex++
        }

        this.props.onChange(JSON.stringify(json))
    }

}