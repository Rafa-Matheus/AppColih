import User from '../../../../model/User'

export default async (req, res) => {
    if (req.method == "POST") {
        var users = new User()

        var { exists, item } = await users.getById(req.body.id)

        res.json({ success: exists, item: item })
    }
    else
        res.status(404).end()
}