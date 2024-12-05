import User from '../../../../model/User'

const users = new User()

export default async (req, res) => {
    if (req.method == "POST")
        res.json(await users.newPassword(req.body))
    else
        res.status(404).end()
}