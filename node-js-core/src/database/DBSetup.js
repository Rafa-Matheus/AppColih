import path from 'path'
import Manager, { setShowQueries, debug, readJson } from './Manager'
setShowQueries(process.env.NODE_ENV == "development")

const manager = new Manager()

export async function getConnection(connectionName) {
    const json = await readJson(path.resolve("./db.json"))
    const connection = json[connectionName]
    debug(`Making connection to '${connectionName}' with '${connection.driver}' driver`)
    return manager.getConnection(connection.params, connection.driver, connectionName)
}