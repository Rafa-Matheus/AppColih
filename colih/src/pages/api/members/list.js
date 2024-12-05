import User from '../../../../model/User'

export default async (req, res) => {
    if (req.method == "POST") {
        var users = new User()
        res.json({
            success: true, items: await users.filterAll(req.body.filters)
        })
    }
    else
        res.status(404).end()
}