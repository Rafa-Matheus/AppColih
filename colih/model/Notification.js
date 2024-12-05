import Model from 'db/Model'

export default class Notification extends Model {

    constructor() {
        super("notificacoes", ["usuario", "timestamp", "titulo", "conteudo", "agendamento", "status", "nivel"])
    }

    async getCount(user) {
        return await this.dataBase
            .table(this.tableName)
            .select("id")
            //.where("usuario", user)
            .count()
    }

    async getUnread() {
        return await this.dataBase
            .table(this.tableName)
            .select(["id", ...this.columns])
            //.where("usuario", user)
            .where("status", "not_readed")
            .orderByDesc("timestamp")
            .get()
    }

    async getNotifications() {
        return await this.dataBase
            .table(this.tableName)
            .select(["id", ...this.columns])
            .orderByDesc("timestamp")
            .get()
    }

    async setReaded(id) {
        return await this.dataBase
            .table(this.tableName)
            .update({ id: id, status: "readed" })
    }

    async filterItem(value, props) {
        return true
    }

    async mapItem(value, props) {
        return value
    }

}