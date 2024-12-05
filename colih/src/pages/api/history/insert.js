import Report from '../../../../model/Report'

const reports = new Report()

export default async (req, res) => {
    if (req.method == "POST")
        res.json(await reports.insert(req.body))
    else
        res.status(404).end()
}