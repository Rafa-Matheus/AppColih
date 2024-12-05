import { withIronSessionApiRoute } from 'iron-session/next'
import Schedule from '../../../../model/Schedule'

export default withIronSessionApiRoute(
    async (req, res) => {
        if (req.method == "POST") {
            var schedules = new Schedule()
            res.json({ success: await schedules.checkExpireDate(req.body.id) })
        }
        else
            res.status(404).end()
    },
    process.env.sessionConfig)