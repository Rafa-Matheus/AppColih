import Doctor from '../../../../model/Doctor'

export default async (req, res) => {
    if (req.method == "POST") {
        var doctors = new Doctor()
        res.json({ success: true, items: await doctors.parse(req.body.data) })
    }
    else
        res.status(404).end()
}