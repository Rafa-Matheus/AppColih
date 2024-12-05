import DB from './DB'
import { isSet } from './Manager'

export default class Model {

    constructor(tableName, columns) {
        this.tableName = tableName
        this.columns = columns
        this.dataBase = new DB()
    }

    async getAll() {
        const data = await this.dataBase
            .table(this.tableName)
            .select(["id", ...this.columns])
            .get()

        return await this.filterAndMapAll(data)
    }

    async getWhere(column, value) {
        const data = await this.dataBase
            .table(this.tableName)
            .select(["id", ...this.columns])
            .where(column, value)
            .get()

        return await this.filterAndMapAll(data)
    }

    async getFirstWhere(column, value) {
        const data = await this.dataBase
            .table(this.tableName)
            .select(["id", ...this.columns])
            .where(column, value)
            .limit(1)
            .get()

        return await this.selectFirst(data)
    }

    async filterAndMapAll(data, props) {
        var result = []

        for (var i = 0; i < data.length; i++)
            if (await this.filterItem(data[i], props) === true)
                result.push(await this.mapItem(data[i], props))

        return result
    }

    async filterItem(value, props) {
        throw new Error('Filter function not implemented!')
    }

    async mapItem(value, props) {
        throw new Error('Map function not implemented!')
    }

    async getById(id) {
        const data = await this.dataBase
            .table(this.tableName)
            .select(["id", ...this.columns])
            .where("id", id)
            .limit(1)
            .get()

        return await this.selectFirst(data)
    }

    async insert(request) {
        try {
            const id = await this.dataBase
                .table(this.tableName)
                .insert(request)[0]

            return { success: true, id: id }
        } catch (error) {
            console.error(error)
        }

        return { success: false, id: -1 }
    }

    async update(id, request) {
        try {
            const updateRequest = isSet(request) ? { id: id, ...request } : id

            await this.dataBase
                .table(this.tableName)
                .update(updateRequest)

            return true
        } catch (error) {
            console.error(error)
        }

        return false
    }

    async delete(id) {
        try {
            await this.dataBase
                .table(this.tableName)
                .delete(id)

            return true
        } catch (error) {
            console.error(error)
        }

        return false
    }

    async selectFirst(data) {
        var firstItem
        var exists = false

        if (data.length > 0)
            if (data[0]) {
                firstItem = await this.mapItem(data[0])
                exists = true
            }

        return { exists: exists, item: firstItem }
    }

}