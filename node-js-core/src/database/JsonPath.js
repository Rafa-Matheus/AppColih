export default class JsonPath {
    
    /* #region  Setup */
    _statment

    constructor(columnName) {
        this._statment = columnName
    }
    /* #endregion */

    /* #region  Returns a single value */
    index(position) {
        this._statment += `->>${position}`
        return this.get()
    }

    key(name) {
        this._statment += `->>'${name}'`
        return this.get()
    }

    path(...keys) {
        this._statment += `#>>{${keys.join(",")}}`
        return this.get()
    }
    /* #endregion */

    /* #region  Returns a array */
    arrayIndex(position) {
        this._statment += `->${position}`
        return this
    }

    arrayKey(name) {
        this._statment += `->'${name}'`
        return this
    }

    arrayPath(...keys) {
        this._statment += `#>{${keys.join(",")}}`
        return this
    }
    /* #endregion */

    /* #region  Functions */
    get() {
        return this._statment
    }
    /* #endregion */

}