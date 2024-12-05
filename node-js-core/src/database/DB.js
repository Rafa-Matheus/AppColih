/* #region  Modules */
import { getConnection } from './DBSetup'
import { ParameterizedQuery as PQ } from 'pg-promise'
//import { open } from 'sqlite'

import { isSet, debug } from './Manager'
import JsonPath from './JsonPath'
/* #endregion */

export default class DB {

    /* #region  Setup */
    _connectionName
    _sqlQuery
    _values

    constructor(connectionName = "default") {
        this._connectionName = connectionName
        this._clearSqlQueryAndValues()
    }
    /* #endregion */

    /* #region  TABLE */
    table(name) {
        const db = new DB(this._connectionName)
        db.tableName = name
        db._sqlQuery = ""
        //db.values = []
        return db
    }
    /* #endregion */

    /* #region  INSERT */
    async insert(request) {
        const columns = Object.keys(request)
        const columnsValues = columns.join(",")
        var columnsParams = []
        columns.forEach((_, index) => {
            columnsParams.push(this._getParamValue(index + 1))
        })
        columnsParams = columnsParams.join(",")

        this._sqlQuery = `INSERT INTO ${this.tableName} (${columnsValues}) VALUES (${columnsParams}) RETURNING id`

        return await this._execute(request)
    }
    /* #endregion */

    /* #region  SELECT */
    _prefix = function () {
        const sqlPrefix = this._sqlQuery.includes("SELECT") ? "" : `SELECT * FROM ${this.tableName}`
        this._sqlQuery = `${sqlPrefix}${this._sqlQuery}`
    }

    select(...columns) {
        if (columns.length > 0)
            columns = Array.isArray(columns) ? columns.join(",") : columns
        else
            columns = "*"

        this._sqlQuery = `SELECT ${columns} FROM ${this.tableName}`

        return this
    }

    distinct(...columns) {
        if (columns.length > 0)
            columns = Array.isArray(columns) ? columns.join(",") : columns
        else
            columns = "*"

        this._sqlQuery = `SELECT DISTINCT ${columns} FROM ${this.tableName}`

        return this
    }

    distinctOn(firstColumn, alias, ...otherColumns) {
        this._sqlQuery = `SELECT DISTINCT ON (${firstColumn}) ${alias},${otherColumns.join(",")} FROM ${this.tableName}`

        return this
    }
    /* #endregion */

    /* #region  WHERE */
    where(column, value, operator = null) {
        if (typeof column === 'function') {
            const db = new DB()
            db.isCombine = true

            var combineOperator = isSet(value) ? value : "AND"
            if (!this._sqlQuery.includes("WHERE ("))
                combineOperator = "WHERE"

            value = isSet(value) ? value : "AND"

            if(this._sqlQuery.includes("WHERE"))
                combineOperator = value

            db.combineOperator = combineOperator

            const count = this._values.length
            for (var valueIndex = 0; valueIndex < count; valueIndex++)
                db._values.push(0)

            column(db)

            for (var valueIndex = count; valueIndex < db._values.length; valueIndex++)
                this._values.push(db._values[valueIndex])

            this._sqlQuery += `${db._sqlQuery})`
        } else {
            const sqlOperator = isSet(operator) ? value : "="
            const sqlValue = isSet(operator) ? operator : value

            this._statment()
            this._values.push(sqlValue)
            this._sqlQuery += ` ${column} ${sqlOperator} ${this._getParamValue()} `
        }

        return this
    }

    orWhere(column, value, operator = null) {
        const sqlOperator = isSet(operator) ? value : "="
        const sqlValue = isSet(operator) ? operator : value

        this._statment("OR")
        this._values.push(sqlValue)
        this._sqlQuery += ` ${column} ${sqlOperator} ${this._getParamValue()} `

        return this
    }

    whereIn(column, ...values) {
        const sqlColumn = values instanceof Object ? column : "id"
        const sqlValues = values instanceof Object ? values : column

        this._statment()

        var valueNumbers = column
        if (sqlValues instanceof Object) {
            valueNumbers = []
            var index = 0, valuesCount = sqlValues[0].length
            while (index < valuesCount) {
                this._values.push(sqlValues[0][index])
                valueNumbers.push(this._getParamValue())
                index++
            }

            valueNumbers = valueNumbers.join(",")
        }

        this._sqlQuery += ` ${sqlColumn} IN (${valueNumbers}) `

        return this
    }

    whereNotIn(column, ...values) {
        const sqlColumn = values instanceof Object ? column : "id"
        const sqlValues = values instanceof Object ? values : column

        this._statment()

        var valueNumbers = column
        if (sqlValues instanceof Object) {
            valueNumbers = []
            var index = 0, valuesCount = sqlValues[0].length
            while (index < valuesCount) {
                this._values.push(sqlValues[0][index])
                valueNumbers.push(this._getParamValue())
                index++
            }

            valueNumbers = valueNumbers.join(",")
        }

        this._sqlQuery += ` ${sqlColumn} NOT IN (${valueNumbers}) `

        return this
    }
    /* #endregion */

    /* #region  IS NULL */
    isNull(column, operator = null) {
        this._statment(operator)
        this._sqlQuery += ` ${column} IS NULL `
        return this
    }

    isNotNull(column, operator = null) {
        this._statment(operator)
        this._sqlQuery += ` ${column} IS NOT NULL `
        return this
    }
    /* #endregion */

    /* #region  LIKE */
    like(column, value, operator = null) {
        this._statment(operator)
        this._values.push(`%${value}%`)
        this._sqlQuery += ` ${column} LIKE ${this._getParamValue()} `

        return this
    }

    startLike(column, value, operator = null) {
        this._statment(operator)
        this._values.push(`${value}%`)
        this._sqlQuery += ` ${column} LIKE ${this._getParamValue()} `

        return this
    }

    endLike(column, value, operator = null) {
        this._statment(operator)
        this._values.push(`%${value}`)
        this._sqlQuery += ` ${column} LIKE ${this._getParamValue()} `

        return this
    }
    /* #endregion */

    /* #region  BETWEEN */
    between(column, start, end) {
        this._statment()
        this._values.push(start)
        this._values.push(end)
        this._sqlQuery += ` ${column} BETWEEN ${this._getParamValue(this._values.length - 1)} AND ${this._getParamValue()} `

        return this
    }
    /* #endregion */

    /* #region  UPDATE */
    async update(request, column = null, value = null, operator = null) {
        const fields = Object.keys(request)

        var params = ""

        this._prefix()

        if (this._sqlQuery.includes("WHERE")) {
            params = this._joinFields(params, fields)

            const statment = `UPDATE ${this.tableName} SET ${params}`

            this._sqlQuery = this._sqlQuery.includes("SELECT *") ? this._sqlQuery.replace(`SELECT * FROM ${this.tableName}`, statment) : ""
        } else if (isSet(column)) {
            const sqlOperator = isSet(operator) ? value : "="
            const sqlValue = isSet(operator) ? operator : value

            this._values.push(sqlValue)

            params = this._joinFields(params, fields)

            this._sqlQuery = `UPDATE ${this.tableName} SET ${params} WHERE ${column} ${sqlOperator} ${this._getParamValue()}`
        } else {
            if (fields.length > 1) {
                params = this._joinFields(params, fields, 1)

                this._sqlQuery = `UPDATE ${this.tableName} SET ${params} WHERE ${fields[0]}=$1`
            } else {
                console.warn("Warning: Update method must have at least 2 items, one of which contains a primary key")
                return
            }
        }

        return await this._execute(request)
    }
    /* #endregion */

    /* #region  DELETE */
    async delete(value = null, operator = null, column = null) {
        if (isSet(value)) {
            this._values.push(value)
            const valueParam = this._getParamValue()
            const sqlValue = isSet(column) ? column : (isSet(operator) ? operator : valueParam)
            const sqlOperator = isSet(column) ? operator : "="
            const sqlColumn = isSet(column) || isSet(operator) ? valueParam : "id"

            this._sqlQuery = `DELETE FROM ${this.tableName} WHERE ${sqlColumn} ${sqlOperator} ${sqlValue} `
        }
        else {
            this._prefix()

            this._sqlQuery = this._sqlQuery.includes("SELECT *") ? this._sqlQuery.replace("SELECT *", "DELETE") : ""
        }

        return await this._execute()
    }
    /* #endregion */

    /* #region  ORDER BY */
    orderByAsc(column) {
        const sqlColumn = isSet(column) ? column : "id"

        this._sqlQuery += ` ORDER BY ${sqlColumn} ASC`

        return this
    }

    orderByDesc(column) {
        const sqlColumn = isSet(column) ? column : "id"

        this._sqlQuery += ` ORDER BY ${sqlColumn} DESC`

        return this
    }
    /* #endregion */

    /* #region  LIMIT */
    limit(limit) {
        const sqlLimit = isSet(limit) ? limit : "NULL"

        this._sqlQuery += ` LIMIT ${sqlLimit}`

        return this
    }
    /* #endregion */

    /* #region  OFFSET */
    offset(offset) {
        const sqlOffset = isSet(offset) ? offset : 0

        this._sqlQuery += ` OFFSET ${sqlOffset}`

        return this
    }
    /* #endregion */

    /* #region  Other functions */
    _statment(operator) {
        operator = isSet(operator) ? operator : "AND"

        if (this.isCombine) {
            const statment = ` ${this.combineOperator} (`
            this._sqlQuery += this._sqlQuery.includes(statment) ? operator : statment
        }
        else
            this._sqlQuery += this._sqlQuery.includes("WHERE") ? operator : " WHERE"
    }

    async count(column = null) {
        column = isSet(column) ? column : "id"

        this._prefix()
        this._sqlQuery = this._sqlQuery.replace(/SELECT (\w+|_|,)+/g, `SELECT COUNT(${column}) AS total`)

        const count = await this.get()
        return parseInt(count[0].total)
    }

    raw(statment) {
        this._sqlQuery += ` ${statment} `
        return this
    }

    json(column) {
        return new JsonPath(column)
    }

    async get() {
        this._prefix()

        return await this._execute()
    }

    async _execute(request) {
        var sqlValues = this._values

        if (isSet(request)) {
            const values = Object.values(request)
            if (values.length > 0) {
                var valueIndex = 0, valuesCount = values.length
                while (valueIndex < valuesCount) {
                    sqlValues.push(values[valueIndex])
                    valueIndex++
                }
            }
        }

        const connection = await getConnection(this._connectionName)

        var query
        switch (connection.driver) {
            case "pg":
                query = new PQ({
                    text: this._sqlQuery,
                    values: sqlValues
                })

                debug(query)

                this._clearSqlQueryAndValues()

                return connection.connection.any(query)
            case "sqlite":
                // query = this._sqlQuery

                // debug([
                //     this._sqlQuery,
                //     ...sqlValues
                // ])

                // this._clearSqlQueryAndValues()

                // const sqliteConnection = await open(connection.connection)
                // return sqliteConnection.run(query, sqlValues)
                break
        }
    }

    _joinFields(paramsValue, fields, start) {
        const startIndex = isSet(start) ? start : 0
        var fieldIndex = startIndex, fieldLength = fields.length
        while (fieldIndex < fieldLength) {
            const field = fields[fieldIndex]
            paramsValue += `${field}=${this._getParamValue(this._values.length + fieldIndex + 1)},`
            fieldIndex++
        }

        if (paramsValue.length > 0)
            return paramsValue.substring(0, paramsValue.length - 1)
        else
            return ""
    }

    _getParamValue(index = -1) {
        if (index == -1)
            index = this._values.length

        // switch (this._connection.driver) {
        //     case "pg":
                return `$${index}`
        //     case "sqlite":
        //         return '?'
        // }
    }

    clone() {
        const db = new DB(this._connectionName)
        db.tableName = this.tableName
        db._sqlQuery = this._sqlQuery
        db._values = this._values
        return db
    }

    _clearSqlQueryAndValues() {
        this._sqlQuery = ""
        this._values = []
    }
    /* #endregion */

}