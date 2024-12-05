import Model from 'db/Model'

export default class Report extends Model {

    constructor() {
        super("historico", ["id_usuario", "metadata", "criacao", "inicio", "fim", "observacoes"])
    }

    async filterItem(value, props) {
        return true
    }

    async mapItem(value, props) {
        return value
    }

    async getByCrm(crm) {
        return await this.dataBase
            .table(this.tableName)
            .select(["id", ...this.columns])
            .where("crm", crm)
            .orderByDesc("criacao")
            .get()
    }

}