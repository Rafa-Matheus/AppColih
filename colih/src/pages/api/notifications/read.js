import { withIronSessionApiRoute } from 'iron-session/next'
import Notification from '../../../../model/Notification'

export default withIronSessionApiRoute(
    async (req, res) => {
        if (req.method == "POST") {
            var notifications = new Notification()
            res.json({ success: await notifications.setReaded(req.body.id) })
        }
        else
            res.status(404).end()
    },
    process.env.sessionConfig)