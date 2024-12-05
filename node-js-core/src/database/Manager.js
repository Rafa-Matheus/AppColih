/* #region  Modules */
const fs = require('fs')

const pgp = require('pg-promise')({
    noWarnings: true
})
//import sqlite3 from 'sqlite3'
/* #endregion */

export default class Manager {

    /* #region  Get some connection */
    getConnection(params, driver = "pg") {
        let connection
        switch (driver) {
            case "pg":
                connection = pgp(`postgres://${params.user}:${params.password}@${params.host}:${params.port}/${params.database}`)
                break
            case "sqlite":
                //connection = { filename: params.filename, driver: sqlite3.Database }
                break
        }

        return { driver: driver, connection: connection }
    }
    /* #endregion */

}

/* #region  Exported functions */
var showQueries = false
export function setShowQueries(value) {
    showQueries = value
}

export function isSet(param) {
    return param !== undefined && param !== null
}

export function debug(query) {
    if (showQueries)
        console.log(query)
}

export function readJson(file) {
    return new Promise((resolve, _) => {
        if (fs.existsSync(file))
            fs.readFile(file, 'utf8', (error, jsonString) => {
                if (error) {
                    console.error(error.message)
                    resolve(undefined)
                    return
                }

                try {
                    resolve(JSON.parse(jsonString))
                } catch (error) {
                    console.error(error.message)
                    resolve(undefined)
                }
            })
        else
            resolve(undefined)
    })
}
/* #endregion */