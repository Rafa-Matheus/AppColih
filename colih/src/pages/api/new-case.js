import Case from '../../../model/Case'
import { adjustTimezone } from 'tools/DateTimeUtil'

const cases  = new Case()

export default async (req, res) => {
    if (req.method == "POST") {
        req.body.data_inicial = adjustTimezone(new Date(req.body.data_inicial))
        req.body.data_final = adjustTimezone(new Date(req.body.data_final))
        
        res.json(await cases.insert(req.body))
    }
    else
        res.status(404).end()
}