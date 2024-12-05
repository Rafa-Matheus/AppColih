import Doctor from '../../../../model/Doctor'

export default async (req, res) => {
    if (req.method == "POST") {
        var doctors = new Doctor()

        var { exists, item } = await doctors.getById(req.body.id)

        res.json({ success: exists, item: item })
    }
    else
        res.status(404).end()
}