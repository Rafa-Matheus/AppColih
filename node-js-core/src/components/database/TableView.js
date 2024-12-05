/* #region  Modules */
import { plural, formatToCurrency } from '../../tools/TextUtil'
import React, { Component } from 'react'
import { FaPlus, FaTrash, FaPen, FaSearch, FaFilePdf } from 'react-icons/fa'
import { MdCheckCircle, MdCancel } from 'react-icons/md'
import { IoIosFunnel } from 'react-icons/io'
import { IoCloseSharp } from 'react-icons/io5'
import { BsTrash } from 'react-icons/bs'
import { GrTree } from 'react-icons/gr'
import { AiOutlineArrowDown } from 'react-icons/ai'
import PaginationView from './PaginationView'
import Button from '../Button'
import Switch from 'react-switch'
import Balloon from '../Balloon'
import FlexContainer from '../FlexContainer'
import Table from '../Table'
import { getApiJsonDataPost } from '../../tools/Util'
import TextInput from '../TextInput'
import SelectInput from '../SelectInput'
import TableHeader from '../TableHeader'
import TableRow from '../TableRow'
import TableCell from '../TableCell'
import Checkbox from '../Checkbox'
import TableBody from '../TableBody'
import Title from '../Title'
import LineSpacing from '../LineSpacing'
import FloatWindow from '../FloatWindow'
import QuestionDialog from '../QuestionDialog'
import PasswordInput from '../PasswordInput'
import Loader from '../Loader'
import CenterContainer from '../CenterContainer'
import JSONEditor from './JSONEditor'
import DateTimePicker from './DateTimePicker'
import NumericUpDown from '../NumericUpDown'
import { adjustTimezone } from '../../tools/DateTimeUtil'
import CurrencyInput from '../CurrencyInput'
import root from '../StaticStyles'

import { BiAddToQueue } from 'react-icons/bi'
/* #endregion */

export default class TableView extends Component {

    /* #region  Setup */
    constructor(props) {
        super(props)

        this.state = {
            alertBoxPassword: "",
            selectedItems: [],
            isQuestionDialogVisible: false,
            password: "",
            isSearchPanelVisible: false,
            isEditWindowVisible: false,
            isFilterWindowVisible: false,
            windowTitle: "",
            itemId: -1,
            page: null,
            filters: {},
            search: null,
            column: "*",
            fieldValues: {}
        }
    }

    componentDidMount() {
        this.loadTable()
    }

    componentDidUpdate(prevProps) {
        if (this.props.table != prevProps.table)
            this.loadTable()
    }
    /* #endregion */

    render() {
        const table = this.state.table

        if (table) {
            var columnsData = this.getColumns(table)
            var columns = columnsData.columns
            var columnNames = columnsData.columnNames

            var rows = []

            var rowIndex = 0, rowCount = table.data.length
            while (rowIndex < rowCount) {
                var allRow = []

                const itemId = table.data[rowIndex].id

                if (!table.hideEdit)
                    allRow.push(
                        <TableCell
                            key={allRow.length}
                            style={{
                                width: "40px",
                                paddingLeft: "5px"
                            }}>
                            <Checkbox
                                isChecked={this.state.selectedItems.includes(itemId)}
                                onClick={() => {
                                    const selectedItems = this.state.selectedItems

                                    if (!selectedItems.includes(itemId))
                                        selectedItems.push(itemId)
                                    else
                                        selectedItems.splice(selectedItems.indexOf(itemId), 1)

                                    this.setState({ ...this.state, selectedItems: selectedItems })
                                }} />
                        </TableCell>)

                var columnIndex = 0, columnCount = columnNames.length
                while (columnIndex < columnCount) {
                    const columnName = columnNames[columnIndex]

                    var rowColumn
                    var rowValue = table.data[rowIndex][columnName]
                    if (table.columns[columnName][1] instanceof Object) {
                        rowValue = table.columns[columnName][1][rowValue]
                        rowColumn = <TableCell
                            key={allRow.length}
                            style={{ fontStyle: "italic" }}>{rowValue}</TableCell>
                    }
                    else
                        rowColumn = this.getRowColumnByDataType(table.columns[columnName][1], allRow.length, rowValue)

                    allRow.push(rowColumn)

                    columnIndex++
                }

                if (!table.hideEdit)
                    allRow.push(
                        <TableCell
                            key={allRow.length}>
                            <Button
                                style="light"
                                onClick={() => {
                                    this.setState({ ...this.state, windowTitle: "Editar", itemId: itemId, isEditWindowVisible: true }, () => {
                                        this.loadValues(table)
                                    })
                                }}><FaPen /></Button>
                        </TableCell>)

                allRow = <TableRow
                    key={rowIndex}
                    style={{ backgroundColor: rowIndex % 2 == 0 ? "transparent" : "#eee" }}>
                    {allRow}
                </TableRow>

                rows.push(allRow)

                rowIndex++
            }

            return <React.Fragment>
                {this.state.message && <React.Fragment>
                    <Balloon>{this.state.message}</Balloon>
                    <LineSpacing height="15px" />
                </React.Fragment>}
                <FlexContainer>
                    {!table.hideEdit &&
                        <Button onClick={() => {
                            this.newItem(table)
                        }}><FaPlus /> Adicionar</Button>}
                    {table.data.length > 0 &&
                        <React.Fragment>
                            {!table.hideEdit &&
                                <Button
                                    style="danger"
                                    onClick={() => {
                                        this.askForPassword()
                                    }}><FaTrash /> Apagar</Button>}
                            <Button style="light"
                                onClick={() => {
                                    this.downloadPdf(table, columnsData)
                                }}><FaFilePdf /> PDF</Button>
                            {this.props.children}
                        </React.Fragment>}
                    <Button
                        style="light"
                        onClick={() => {
                            this.setState({
                                ...this.state,
                                windowTitle: "Filter",
                                isFilterWindowVisible: true,
                                isSearchPanelVisible: false
                            })
                        }}>
                        <IoIosFunnel /> Filtrar
                    </Button>
                    <Button
                        onClick={() => {
                            this.setState({
                                ...this.state,
                                isSearchPanelVisible: !this.state.isSearchPanelVisible
                            })
                        }}><FaSearch /> Pesquisar</Button>
                </FlexContainer>
                <div style={{ display: this.state.isSearchPanelVisible ? "" : "none" }}>
                    <LineSpacing size="15px" />
                    <FlexContainer>
                        <TextInput
                            placeholder="Pesquise aqui..."
                            value={this.state.search}
                            onChange={(event) => {
                                this.setState({
                                    ...this.state,
                                    search: event.target.value
                                })
                            }} />
                        <p style={{
                            padding: "10px",
                            fontSize: "16pt",
                            whiteSpace: "nowrap"
                        }}>pela coluna:</p>
                        <SelectInput
                            value={this.state.column}
                            onChange={(event) => {
                                this.setState({
                                    ...this.state,
                                    column: event.target.value
                                })
                            }}>
                            {this.getSearchColumnOptions(table.columns)}
                        </SelectInput>
                        <Button
                            style="light"
                            onClick={() => {
                                this.setState({
                                    ...this.state,
                                    page: null
                                }, () => {
                                    this.loadTable()
                                })
                            }}><FaSearch /></Button>
                        <Button
                            style="light"
                            onClick={() => {
                                this.setState({
                                    ...this.state,
                                    search: null,
                                    column: "*",
                                    page: null,
                                    isSearchPanelVisible: false
                                }, () => {
                                    this.loadTable()
                                })
                            }}><IoCloseSharp /></Button>
                    </FlexContainer>
                </div>
                {!this.props.hideTitle &&
                    <React.Fragment>
                        <LineSpacing />
                        <Title>{table.title}</Title>
                        <LineSpacing />
                    </React.Fragment>}
                {table.total_pages > 1 &&
                    <div style={{ width: "100%" }}>
                        <center>
                            <PaginationView
                                page={table.page}
                                totalPages={table.total_pages}
                                onChangePage={(page) => {
                                    this.setState({ ...this.state, page: page }, () => {
                                        this.loadTable()
                                    })
                                }} />
                            <LineSpacing height="10px" />
                        </center>
                    </div>}
                <Table>
                    <TableHeader>
                        <TableRow>{columns}</TableRow>
                    </TableHeader>
                    <TableBody>{rows.length > 0 && rows}</TableBody>
                </Table>
                {rows.length == 0 &&
                    <React.Fragment>
                        <LineSpacing />
                        <center>
                            <div>Empty</div>
                        </center>
                    </React.Fragment>}
                {table.total_pages > 1 &&
                    <React.Fragment>
                        <LineSpacing height="10px" />
                        <div style={{ fontSize: "14pt" }}>{`Quantidade: ${table.count}`}</div>
                    </React.Fragment>}
                <FloatWindow
                    toggle={this.state.isEditWindowVisible}
                    title={this.state.windowTitle}
                    onSubmit={() => {
                        this.submit()
                    }}
                    onDismiss={() => {
                        this.setState({ ...this.state, isEditWindowVisible: false })
                    }}>
                    {this.getFields(table)}
                </FloatWindow>
                <FloatWindow
                    toggle={this.state.isFilterWindowVisible}
                    title={this.state.windowTitle}
                    onSubmit={() => {
                        this.setState({
                            ...this.state,
                            search: null,
                            page: null
                        }, () => {
                            this.loadTable()
                        })
                    }}
                    onDismiss={() => {
                        this.setState({ ...this.state, isFilterWindowVisible: false })
                    }}>
                    {<React.Fragment>
                        {Object.keys(this.state.filters).length > 0 &&
                            <React.Fragment>
                                <Button
                                    style="light"
                                    onClick={() => {
                                        this.setState({
                                            ...this.state,
                                            filters: {},
                                            page: null
                                        }, () => {
                                            this.loadTable()
                                        })
                                    }}><BsTrash /> Apagar todos os filtros</Button>
                                <LineSpacing />
                            </React.Fragment>}
                        {this.getFilters(table)}
                    </React.Fragment>}
                </FloatWindow>
                <QuestionDialog
                    toggle={this.state.isQuestionDialogVisible}
                    onDismiss={() => { this.setState({ ...this.state, isAlertBoxVisible: false }) }}
                    title="Senha Necessária"
                    message={
                        <div>
                            {`${plural("item será removido", "itens serão removidos", "", this.state.selectedItems.length)}.`}
                            <LineSpacing />
                            <PasswordInput
                                placeholder="Senha..."
                                value={this.state.password}
                                onChange={(event) => {
                                    this.setState({ ...this.state, password: event.target.value })
                                }} />
                        </div>}>
                    <Button
                        onClick={() => {
                            this.delete()
                        }}>Apagar</Button>
                    <Button
                        style="danger"
                        onClick={() => {
                            this.setState({ ...this.state, isQuestionDialogVisible: false })
                        }}>Cancelar</Button>
                </QuestionDialog>
            </React.Fragment >
        }
        else
            return <CenterContainer><Loader /></CenterContainer>
    }

    /* #region  Functions */
    newItem(table) {
        this.setState({ ...this.state, windowTitle: "Adicionar", itemId: -1, isEditWindowVisible: true }, () => {
            this.loadValues(table, () => {
                const values = this.state.fieldValues
                delete values.id
                this.setState({ ...this.state, fieldValues: values })
            })
        })
    }

    async submit() {
        var data = this.state.fieldValues
        var newData = {}
        if (data.id) {
            newData.id = data.id
            delete data.id
        }

        Object.keys(data).forEach(key => {
            newData[key] = data[key]
        })

        const json = await getApiJsonDataPost("table/get",
            {
                name: this.props.table,
                data: newData
            })

        if (json.success)
            this.loadTable()
    }

    async loadTable() {
        const json = await getApiJsonDataPost("table/get",
            {
                name: this.props.table,
                get: true,
                filters: this.state.filters,
                search: this.state.search,
                column: this.state.column,
                page: this.state.page
            })

        if (json.success)
            this.setState({
                ...this.state,
                isEditWindowVisible: false,
                isFilterWindowVisible: false,
                table: json.table
            }, () => {
                if (this.state.table.data.length == 0 && this.state.page != null)
                    this.setState({ ...this.state, page: null }, () => {
                        this.loadTable()
                    })
            })
        else
            this.setMessage("Falha ao carregar a tabela")
    }

    handlePasswordChange(event) {
        this.setState({ ...this.state, alertBoxPassword: event.target.value })
    }

    askForPassword() {
        if (this.state.selectedItems.length > 0)
            this.setState({ ...this.state, isQuestionDialogVisible: true, password: "" })
        else
            this.setMessage("Nada selecionado")
    }

    async delete() {
        const json = await getApiJsonDataPost("table/get",
            {
                name: this.props.table,
                delete: this.state.selectedItems,
                password: this.state.password
            })

        if (json.success)
            this.loadTable()
        else
            this.setMessage("Falha ao apagar")

        this.setState({ ...this.state, isQuestionDialogVisible: false })
    }

    downloadPdf(table, columnsData) {
        var columnNames = columnsData.columnNames

        const reportTable = {
            title: table.title,
            columns: [],
            types: [],
            rows: []
        }

        var columnIndex = 0, columnCount = columnNames.length
        while (columnIndex < columnCount) {
            const columnName = columnNames[columnIndex]
            reportTable.columns.push(table.columns[columnName][0])
            reportTable.types.push(table.columns[columnName][1])
            columnIndex++
        }

        var rowIndex = 0, rowsCount = table.data.length
        while (rowIndex < rowsCount) {
            reportTable.rows[rowIndex] = []

            columnIndex = 0
            while (columnIndex < columnCount) {
                const columnName = columnNames[columnIndex]
                reportTable.rows[rowIndex].push(table.data[rowIndex][columnName])
                columnIndex++
            }

            rowIndex++
        }

        console.log(JSON.stringify(reportTable))

        getApiJsonDataPost("pdf", { title: `${table.title} ${new Date().toLocaleDateString()}`, name: `pdf_${table.title.toLowerCase()}`, tables: [reportTable] })
            .then(res => {
                window.open(res.download_url)
            })
    }

    getFields(table) {
        var fields = []

        var columnNames = Object.keys(table.columns)
        var columnIndex = 0, columnCount = columnNames.length
        while (columnIndex < columnCount) {
            const columnName = columnNames[columnIndex]

            var field = table.columns[columnName][1]
            if (field == "id" || field == "password") {
                columnIndex++
                continue
            }

            if (field instanceof Object) {
                field = <SelectInput
                    value={this.state.fieldValues[columnName]}
                    onChange={(event) => {
                        this.changeValue(columnName, event.target.value)
                    }}>
                    {this.getFieldOptions(field)}
                </SelectInput>
            }
            else
                switch (field) {
                    case "date":
                        field = <DateTimePicker
                            value={this.state.fieldValues[columnName]}
                            onChange={(value) => {
                                this.changeValue(columnName, value)
                            }} />
                        break
                    case "boolean":
                        field = <div style={{ width: "100%" }}>
                            <center>
                                <Switch onChange={(value) => {
                                    this.changeValue(columnName, value)
                                }}
                                    checked={this.state.fieldValues[columnName] ?? false} />
                            </center>
                        </div>
                        break
                    case "money":
                        field = <CurrencyInput
                            value={parseFloat(this.state.fieldValues[columnName]) ?? 0}
                            onValueChange={(values, _) => {
                                this.changeValue(columnName, values.floatValue)
                            }} />
                        break
                    case "json":
                        console.log(JSON.stringify(this.state.fieldValues[columnName]))
                        field = <JSONEditor
                            data={JSON.stringify(this.state.fieldValues[columnName])}
                            onChange={data => {
                                this.changeValue(columnName, data)
                            }}
                        />
                        break
                    case "int":
                        field = <NumericUpDown
                            value={this.state.fieldValues[columnName] ?? 0}
                            onChange={(value) => {
                                this.changeValue(columnName, value)
                            }} />
                        break
                    //text
                    default:
                        field = <TextInput
                            value={this.state.fieldValues[columnName]}
                            onChange={(event) => {
                                this.changeValue(columnName, event.target.value)
                            }} />
                        break
                }

            var fieldProps = {}
            if (this.props.onMapFields)
                fieldProps = this.props.onMapFields(
                    this.state.table,
                    columnName,
                    fieldProps,
                    this.state.fieldValues)

            var styles = {}
            if (fieldProps.enabled == false) {
                styles.pointerEvents = "none"
                styles.opacity = ".3"
            }

            fields.push(<div style={{ ...styles }}>
                <FlexContainer key={columnIndex + 1}>
                    <div style={{
                        fontSize: "20pt",
                        textAlign: "left"
                    }}>{`${table.columns[columnName][0]}:`}</div>
                    <div>
                        {field}
                        {fieldProps.message && <React.Fragment>
                            <br />
                            <LineSpacing height="15px" />
                            <Balloon>{fieldProps.message}</Balloon>
                        </React.Fragment>}
                    </div>
                </FlexContainer>
                <LineSpacing size="15px" />
            </div>)

            columnIndex++
        }

        return fields
    }

    getFilters(table) {
        var filters = []

        var columnNames = Object.keys(table.columns)
        var columnIndex = 0, columnCount = columnNames.length
        while (columnIndex < columnCount) {
            const columnName = columnNames[columnIndex]

            var field = table.columns[columnName][1]

            if (field instanceof Object) {
                field = <SelectInput
                    value={this.state.filters[columnName] ? this.state.filters[columnName][0] : ""}
                    onChange={(event) => {
                        this.changeFilterValue(columnName, [event.target.value])
                    }}>
                    {this.getFieldOptions(field)}
                </SelectInput>
            }
            else
                switch (field) {
                    case "date":
                        field = <React.Fragment>
                            <DateTimePicker
                                value={this.state.filters[columnName] ? this.state.filters[columnName][0] : ""}
                                onChange={(value) => {
                                    const secondValue = this.state.filters[columnName] ? this.state.filters[columnName][1] : ""
                                    this.changeFilterValue(columnName, [value, secondValue])
                                }} />
                            <h3>Up To</h3>
                            <DateTimePicker
                                value={this.state.filters[columnName] ? this.state.filters[columnName][1] : ""}
                                onChange={(value) => {
                                    const firstValue = this.state.filters[columnName] ? this.state.filters[columnName][0] : ""
                                    this.changeFilterValue(columnName, [firstValue, value])
                                }} />
                        </React.Fragment>
                        break
                    case "boolean":
                        field = <div style={{ width: "100%" }}>
                            <center>
                                <Switch
                                    onChange={(value) => {
                                        this.changeFilterValue(columnName, [value])
                                    }}
                                    checked={this.state.filters[columnName] ? this.state.filters[columnName][0] : false} />
                            </center>
                        </div>
                        break
                    case "money":
                        field = <React.Fragment>
                            <CurrencyInput
                                value={this.state.filters[columnName] ? parseFloat(this.state.filters[columnName][0]) : 0}
                                onValueChange={(values, _) => {
                                    const secondValue = this.state.filters[columnName] ? this.state.filters[columnName][1] : ""
                                    this.changeFilterValue(columnName, [values.floatValue, secondValue])
                                }} />
                            <h3><AiOutlineArrowDown /></h3>
                            <CurrencyInput
                                value={this.state.filters[columnName] ? parseFloat(this.state.filters[columnName][1]) : 0}
                                onValueChange={(values, _) => {
                                    const firstValue = this.state.filters[columnName] ? this.state.filters[columnName][0] : ""
                                    this.changeFilterValue(columnName, [firstValue, values.floatValue])
                                }} />
                        </React.Fragment>
                        break
                    case "int":
                        field = <React.Fragment>
                            <NumericUpDown
                                value={this.state.filters[columnName] ? this.state.filters[columnName][0] : 0}
                                onChange={(value) => {
                                    const secondValue = this.state.filters[columnName] ? this.state.filters[columnName][1] : 0
                                    this.changeFilterValue(columnName, [value, secondValue])
                                }} />
                            <h3><AiOutlineArrowDown /></h3>
                            <NumericUpDown
                                value={this.state.filters[columnName] ? this.state.filters[columnName][1] : 0}
                                onChange={(value) => {
                                    const firstValue = this.state.filters[columnName] ? this.state.filters[columnName][0] : 0
                                    this.changeFilterValue(columnName, [firstValue, value])
                                }} />
                        </React.Fragment>
                        break
                    default:
                        columnIndex++
                        continue
                }

            filters.push(<React.Fragment>
                <div
                    style={{ padding: "20px", borderRadius: root.borderRadius, backgroundColor: filters.length % 2 == 0 ? "transparent" : "#eee" }}>
                    <FlexContainer key={columnIndex + 1}>
                        <div style={{ fontSize: "20pt", textAlign: "left" }}>{`${table.columns[columnName][0]}:`}</div>
                        <div>{field}</div>
                    </FlexContainer>
                </div>
                <LineSpacing size="15px" />
            </React.Fragment>)

            columnIndex++
        }

        return filters
    }

    loadValues(table, callback) {
        const values = this.state.fieldValues

        const columnNames = Object.keys(table.columns)
        var i = 0, count = columnNames.length
        while (i < count) {
            const columnName = columnNames[i]

            var currentValue = this.getFieldValue(columnName, table.data)
            const defaultValue = table.columns[columnName]

            if (currentValue) {
                if (table.columns[columnName][1] == "date")
                    currentValue = adjustTimezone(new Date(currentValue)).toISOString()

                values[columnName] = currentValue
            }
            else if (defaultValue[2])
                values[columnName] = defaultValue[2]
            else {
                if (table.columns[columnName][1] instanceof Object)
                    values[columnName] = Object.keys(table.columns[columnName][1])[0]
                else {
                    switch (table.columns[columnName][1]) {
                        case "date":
                            values[columnName] = new Date().toISOString()
                            break
                        case "int":
                        case "money":
                            values[columnName] = 0
                            break
                        case "boolean":
                            values[columnName] = false
                            break
                        default:
                            values[columnName] = ""
                            break
                    }
                }
            }

            i++
        }

        this.setState({ ...this.state, fieldValues: values }, callback)
    }

    getFieldValue(columnName, data) {
        const index = data.findIndex(item => {
            return item.id == this.state.itemId
        })

        if (data && index != -1)
            return data[index][columnName]

        return null
    }

    getFieldOptions(field) {
        var options = []
        var fieldKeys = Object.keys(field)
        var optionIndex = 0, optionsCount = fieldKeys.length

        while (optionIndex < optionsCount) {
            options.push(<option key={optionIndex} value={fieldKeys[optionIndex]}>{field[fieldKeys[optionIndex]]}</option>)
            optionIndex++
        }

        return options
    }

    changeValue(columnName, value) {
        const values = this.state.fieldValues
        values[columnName] = value
        this.setState({ ...this.state, fieldValues: values })
    }

    changeFilterValue(columnName, value) {
        const filters = this.state.filters
        filters[columnName] = value
        this.setState({ ...this.state, filters: filters })
    }

    getColumns(table) {
        var columns = []

        //Checkbox column
        if (!table.hideEdit)
            columns.push(<TableCell key={columns.length}></TableCell>)

        var columnNames = Object.keys(table.columns)
        var columnIndex = 0, columnCount = columnNames.length
        while (columnIndex < columnCount) {
            const columnName = columnNames[columnIndex]

            if (columnName == "password") {
                columnIndex++
                continue
            }

            if (columnName == "id")
                columns.push(<TableCell
                    key={columns.length}>{table.columns[columnName][0]}</TableCell>)
            else {
                switch (table.columns[columnNames[columnIndex]][1]) {
                    case "boolean":
                        columns.push(<TableCell
                            key={columns.length}>
                            {table.columns[columnName][0]}
                        </TableCell>)
                        break
                    default:
                        columns.push(<TableCell
                            key={columns.length}>
                            {table.columns[columnName][0]}
                        </TableCell>)
                        break
                }
            }

            columnIndex++
        }

        if (!table.hideEdit)
            columns.push(<TableCell key={columns.length}></TableCell>)

        return { columns, columnNames }
    }

    getRowColumnByDataType(dataType, index, rowValue) {
        switch (dataType) {
            case "id":
                return <TableCell
                    key={index}>{rowValue}</TableCell>
            case "text":
                return <TableCell
                    key={index}>
                    {rowValue ? `"${rowValue}"` : ""}</TableCell>
            case "date":
                return <TableCell
                    key={index}
                    style={{ color: "darkgreen" }}>
                    {adjustTimezone(new Date(rowValue)).toLocaleString()}</TableCell>
            case "boolean":
                return <TableCell
                    key={index}
                    style={{ fontSize: "26pt" }}>
                    {rowValue ? <MdCheckCircle style={{ color: "green" }} /> : <MdCancel style={{ color: "red" }} />}</TableCell>
            case "money":
                return <TableCell key={index}>{formatToCurrency(rowValue)}</TableCell>
            case "password":
                return null
            case "json":
                return <TableCell key={index}><GrTree /></TableCell>
            default:
                return <TableCell key={index}>{rowValue ? rowValue : ""}</TableCell>
        }
    }

    getSearchColumnOptions(columns) {
        var options = []
        var columnKeys = Object.keys(columns)
        var optionIndex = 0, optionsCount = columnKeys.length

        options.push(<option key={0} style={{ color: "green" }} value="*">(Qualquer)</option>)
        while (optionIndex < optionsCount) {
            const columnType = columns[columnKeys[optionIndex]][1]
            if (columnType == "password") {
                optionIndex++
                continue
            }

            options.push(<option key={options.length} value={columnKeys[optionIndex]}>{columns[columnKeys[optionIndex]][0]}</option>)
            optionIndex++
        }

        return options
    }

    setMessage(value) {
        this.setState({ ...this.state, message: value }, () => {
            setTimeout(() => {
                this.setState({ ...this.state, message: "" })
            }, 5000)
        })
    }
    /* #endregion */

}