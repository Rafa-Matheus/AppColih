import { withIronSessionApiRoute } from 'iron-session/next'
import Schedule from '../../../../model/Schedule'

export default withIronSessionApiRoute(
    async (req, res) => {
        if (req.method == "POST") {
            var schedules = new Schedule()
            res.json({ success: true, items: await schedules.getWhere("usuario", req.session.userId) })
        }
        else
            res.status(404).end()
    },
    process.env.sessionConfig)