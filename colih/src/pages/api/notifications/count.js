import Notification from '../../../../model/Notification'

const notifications = new Notification()

export default async (req, res) => {
    if (req.method == "POST")
        res.json({success: true, count: await notifications.getCount(req.body.user)})
    else
        res.status(404).end()
}