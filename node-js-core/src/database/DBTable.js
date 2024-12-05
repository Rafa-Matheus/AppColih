/* #region  Modules */
import { isSet } from './Manager'
/* #endregion */

export default class DBTable {

    /* #region  Setup */
    constructor(name) {
        this.name = name
        this.columns = []
        this.primaryKey = null
    }
    /* #endregion */

    /* #region  Columns */
    id(notNull = false) {
        this._addColumn("id", "serial", null, null, null, notNull)
        this.primaryKey = "id"
    }

    integer(name, defaultValue = null, notNull = null, isArray = false) {
        this._addColumn(name, "integer", null, null, defaultValue, notNull, isArray)
    }

    boolean(name, defaultValue = null, notNull = null, isArray = false) {
        this._addColumn(name, "boolean", null, null, defaultValue, notNull, isArray)
    }

    bigInt(name, defaultValue = null, notNull = null, isArray = false) {
        this._addColumn(name, "bigint", null, null, defaultValue, notNull, isArray)
    }

    numeric(name, precision = null, scale = null, defaultValue = null, notNull = null, isArray = false) {
        this._addColumn(name, "numeric", precision, scale, defaultValue, notNull, isArray)
    }

    characterVarying(name, length = null, defaultValue = null, notNull = null, isArray = false) {
        this._addColumn(name, "character varying", length, null, defaultValue, notNull, isArray)
    }

    timestamp(name, length = null, defaultValue = null, notNull = null, isArray = false) {
        this._addColumn(name, `timestamp${isSet(length) ? `(${length})` : ""}`, null, null, defaultValue, notNull, isArray)
    }

    timestampWithoutZone(name, length = null, defaultValue = null, notNull = null, isArray = false) {
        this._addColumn(name, `timestamp${isSet(length) ? `(${length})` : ""} without time zone`, null, null, defaultValue, notNull, isArray)
    }

    text(name, defaultValue = null, notNull = null, isArray = false) {
        this._addColumn(name, "text", null, null, defaultValue, notNull, isArray)
    }

    json(name, defaultValue = null, notNull = null, isArray = false) {
        this._addColumn(name, "json", null, null, defaultValue, notNull, isArray)
    }
    /* #endregion */

    /* #region  Functions */
    _addColumn = function (name, dataType, precision = null, scale = null, defaultValue = null, notNull = false, isArray = false) {
        this.columns.push({ name: name, dataType: dataType, precision: precision, scale: scale, defaultValue: defaultValue, notNull: notNull, isArray: isArray })
    }
    /* #endregion */

}