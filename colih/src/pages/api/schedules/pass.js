import { withIronSessionApiRoute } from 'iron-session/next'
import Schedule from '../../../../model/Schedule'

export default withIronSessionApiRoute(
    async (req, res) => {
        if (req.method == "POST") {
            var schedules = new Schedule()
            await schedules.passToAnotherUser(req.body.id)
            res.json({ success: true })
        }
        else
            res.status(404).end()
    },
    process.env.sessionConfig)