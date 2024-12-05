import Model from 'db/Model'

import NotificationManager from '../src/components/controller/NotificationManager'
import dayjs from 'dayjs'

export default class Case extends Model {

    constructor() {
        super("plantoes", ["criacao", "titulo", "usuarios", "data_inicial", "data_final", "observacoes"])
    }

    async filterItem(value, props) {
        return true
    }

    async mapItem(value, props) {
        return value
    }

}