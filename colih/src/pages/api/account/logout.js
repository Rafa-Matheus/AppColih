import { withIronSessionApiRoute } from 'iron-session/next'
import redirect from 'micro-redirect'

export default withIronSessionApiRoute(async (req, res) => {
    if (req.method == "GET") {
        req.session.destroy()
        redirect(res, 302, "/")
    }
    else
        res.status(404).end()
}, process.env.sessionConfig)