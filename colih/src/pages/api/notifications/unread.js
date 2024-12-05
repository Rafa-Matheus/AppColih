import Notification from '../../../../model/Notification'

export default async (req, res) => {
    if (req.method == "POST") {
        var notifications = new Notification()
        res.json({ success: true, items: await notifications.getUnread() })
    }
    else
        res.status(404).end()
}