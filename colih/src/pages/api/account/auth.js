import { getIronSession } from 'iron-session'
import User from '../../../../model/User'

const users = new User()

export default async (req, res) => {
    var session = await getIronSession(req, res, process.env.sessionConfig)

    if (req.method == "POST")
        res.json(await users.auth(req, session))
    else
        res.status(404).end()
}