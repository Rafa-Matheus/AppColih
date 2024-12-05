import { withIronSessionApiRoute } from 'iron-session/next'
import User from '../../../../model/User'

export default withIronSessionApiRoute(
    async (req, res) => {
        if (req.method == "POST") {
            var users = new User()
            res.json({ success: true, tems: await users.search(req.body.search) 
            })
        }
        else
            res.status(404).end()
    },
    process.env.sessionConfig)