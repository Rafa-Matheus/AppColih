import { withIronSessionApiRoute } from 'iron-session/next'
import Doctor from '../../../../model/Doctor'

export default withIronSessionApiRoute(
    async (req, res) => {
        if (req.method == "POST") {
            var doctors = new Doctor()
            res.json({ success: true, items: await doctors.search(req.body.search) })
        }
        else
            res.status(404).end()
    },
    process.env.sessionConfig)