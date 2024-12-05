import Schedule from '../../../model/Schedule'
import { adjustTimezone, addDays } from 'tools/DateTimeUtil'

const schedules = new Schedule()

export default async (req, res) => {
    if (req.method == "POST") {
        req.body.data = adjustTimezone(new Date(req.body.data))
        req.body.data = addDays(req.body.data, 1)
        req.body.horario_inicial = adjustTimezone(new Date(`01/01/1970 ${req.body.horario_inicial}`))
        req.body.horario_final = adjustTimezone(new Date(`01/01/1970 ${req.body.horario_final}`))
        
        res.json(await schedules.insert(req.body))
    }
    else
        res.status(404).end()
}