/* #region  Modules */
import { getConnection } from './DBSetup'
import { ParameterizedQuery as PQ } from 'pg-promise'
//import { open } from 'sqlite'

import { isSet, debug } from './Manager'
import DBTable from './DBTable'
/* #endregion */

export default class Schema {

    /* #region  Setup */
    _connectionName

    constructor(connectionName = "default") {
        this._connectionName = connectionName
    }
    /* #endregion */

    /* #region  CREATE */
    async createTable(name, table, ifNotExists = false) {
        const dbTable = new DBTable(name)
        table(dbTable)

        var sqlColumns = []
        for (var column in dbTable.columns) {
            const sqlColumn = dbTable.columns[column]
            var args = []
            if (isSet(sqlColumn.precision))
                args.push(sqlColumn.precision)

            if (isSet(sqlColumn.scale))
                args.push(sqlColumn.scale)

            args = args.length > 0 ? `(${args.join(",")})` : ""
            sqlColumns.push(`${sqlColumn.name} ${sqlColumn.dataType}${args}${sqlColumn.isArray ? "[]" : ""}${isSet(sqlColumn.defaultValue) ? ` DEFAULT ${sqlColumn.defaultValue}` : ""}${sqlColumn.notNull ? " NOT NULL" : ""}`)
        }

        sqlColumns = sqlColumns.join(",")
        if (isSet(dbTable.primaryKey))
            sqlColumns += `,PRIMARY KEY (${dbTable.primaryKey})`

        return await this._execute(`CREATE TABLE ${ifNotExists ? "IF NOT EXISTS " : ""}${dbTable.name} (${sqlColumns})`)
    }
    /* #endregion */

    /* #region  DROP */
    async dropTable(name, ifExists = false) {
        return await this._execute(`DROP TABLE ${ifExists ? "IF EXISTS " : ""}${name}`)
    }
    /* #endregion */

    /* #region  Functions */
    async _execute(query) {
        const connection = await getConnection(this._connectionName)

        debug(query)

        switch (connection.driver) {
            case "pg":
                return connection.connection.any(new PQ({ text: query }))
            case "sqlite":
                // const sqliteConnection = await open(this._connection.connection)
                // return sqliteConnection.run(query)
                break
        }
    }
    /* #endregion */

}