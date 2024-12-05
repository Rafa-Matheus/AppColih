const { createServer } = require("https")
const { parse } = require("url")
const next = require("next")
const fs = require("fs")
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev });
const handle = app.getRequestHandler()
const httpsOptions = {
    key: fs.readFileSync("./cert/localhost-key.pem"),
    cert: fs.readFileSync("./cert/localhost.pem"),
}

app.prepare().then(() => {
    try {
        createServer(httpsOptions, (req, res) => {
            const parsedUrl = parse(req.url, true)
            handle(req, res, parsedUrl)
        }).listen(3000, (err) => {
            if (err) throw err
            console.log("> Servidor iniciado em https://localhost:3000")
        })
    } catch (e) {
        console.log(e)
    }
})