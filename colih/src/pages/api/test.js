import { read } from "../../../components/controller/CSVReader"

export default async (req, res) => {
    res.json({ result: await read("./example.csv") })
}