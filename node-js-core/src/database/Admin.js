import DB from './DB'
import { readJson } from './Manager'

export default class Admin {

    async fetchTable(req, auth, get, set, del) {
        const tableName = req.body.name
        const dataBase = new DB()

        const table = await readJson(`./model/tables/${tableName}.json`)
        if (table) {
            if (await auth(table)) {
                /* #region  INSERT/UPDATE */
                if (req.body.data) {
                    await set(table, req.body.data)

                    var query
                    if (req.body.data.id)
                        query = await dataBase.table(tableName).update(req.body.data)
                    else
                        query = await dataBase.table(tableName).insert(req.body.data)

                    return { success: true }
                }
                /* #endregion */

                /* #region  Before UPDATE */
                else if (req.body.id) {
                    table.data = await dataBase.table(tableName).where("id", req.body.id).limit(1).get()

                    return { success: true, table: table }
                }
                /* #endregion */

                /* #region  GET */
                else if (req.body.get) {
                    const page = req.body.page ? Math.max(parseInt(req.body.page), 1) : 1
                    table.page = page
                    const columnNames = Object.keys(table.columns)

                    //Only items that shows in JSON
                    const select = []
                    var columnIndex = 0, columnsCount = columnNames.length
                    while (columnIndex < columnsCount) {
                        select.push(columnNames[columnIndex])
                        columnIndex++
                    }

                    //var query = dataBase.table(tableName).distinct(select)
                    var query = dataBase.table(tableName).select(select)

                    //Search engine
                    if (req.body.search) {
                        var search = req.body.search.toLowerCase()
                        if (req.body.column) {
                            if (req.body.column == "*") {
                                columnIndex = 0
                                while (columnIndex < columnsCount) {
                                    const columnName = columnNames[columnIndex]

                                    if (table.columns[columnName][1] == "boolean")
                                        query = query.like(`LOWER(${columnName}::text)`, search, "OR")
                                    else
                                        this.addColumnToQuery(table.columns[columnName][1], columnName, search, query)

                                    columnIndex++
                                }
                            }
                            else
                                this.addColumnToQuery(table.columns[req.body.column][1], req.body.column, search, query)
                        }
                    }
                    //Filters
                    else if (req.body.filters) {
                        const filters = Object.keys(req.body.filters)
                        var filterIndex = 0, filtersCount = filters.length
                        while (filterIndex < filtersCount) {
                            const filterName = filters[filterIndex]
                            const filter = req.body.filters[filterName]

                            const fieldType = table.columns[filterName][1]
                            if (fieldType instanceof Object)
                                query = query.where(filterName, filter[0])
                            else {
                                switch (fieldType) {
                                    case "boolean":
                                        query = query.where(filterName, filter[0])
                                        break
                                    case "date":
                                    case "money":
                                    case "int":
                                        //Start and end
                                        query = query.between(
                                            filterName,
                                            filter[0],
                                            filter[1])
                                        break
                                }
                            }

                            filterIndex++
                        }
                    }

                    query = await get(table, query)

                    const limit = 5

                    const count = await query.clone().count()
                    query = query.orderByAsc("id").limit(limit).offset((page - 1) * limit)

                    table.data = await query.get()

                    table.count = count
                    table.total_pages = Math.ceil(count / limit)

                    return { success: true, table: table }
                }
                /* #endregion */

                /* #region  DELETE */
                else if (req.body.delete) {
                    if (await del(table)) {
                        await dataBase.table(tableName).whereIn("id", req.body.delete).delete()

                        return { success: true }
                    }
                }
                /* #endregion */
            }

            return { success: false }
        }
    }

    /* #region  Other functions */
    addColumnToQuery(dataType, columnName, search, query) {
        switch (dataType) {
            case "boolean":
                search = search.includes('y') ? "true" : "false"
            default:
                query = query.like(`LOWER(${columnName}::text)`, search, "OR")
                break
        }
    }
    /* #endregion */

}