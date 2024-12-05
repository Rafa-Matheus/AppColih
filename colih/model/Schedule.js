import Model from 'db/Model'

import NotificationManager from '../src/components/controller/NotificationManager'
import dayjs from 'dayjs'

export default class Schedule extends Model {

    constructor() {
        super("agendamentos", ["criacao", "titulo", "usuario", "dias", "data", "horario_inicial", "horario_final", "observacoes"])
    }

    async checkExpireDate(id) {
        const schedule = await this.getById(id)

        //console.log(schedule)

        await this.dataBase
            .table("notificacoes")
            .update({ agendamento: id, status: "readed" })

        // console.log("CRIACAO")
        // console.log(schedule.item.criacao)
        // console.log("ATUAL")
        // console.log(dayjs())

        // console.log(dayjs(schedule.item.criacao)
        // .diff())

        return dayjs(schedule.item.criacao)
            .diff()
            >
            12 * 60 * 60 * 1000
    }

    async passToAnotherUser(id) {
        const schedule = await this.getById(id)

        await this.dataBase.table(this.tableName)
            .update({ id: id, usuario: parseInt(schedule.item.usuario) + 1 })

        const nt = new NotificationManager()
        nt.sendNotification(parseInt(schedule.item.usuario) + 1, schedule.item.titulo)
    }

    async filterItem(value, props) {
        return true
    }

    async mapItem(value, props) {
        return value
    }

}