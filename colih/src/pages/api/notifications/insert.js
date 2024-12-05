import Notification from '../../../../model/Notification'

const notifications = new Notification()

export default async (req, res) => {
    if (req.method == "POST")
        res.json(await notifications.insert(req.body))
    else
        res.status(404).end()
}