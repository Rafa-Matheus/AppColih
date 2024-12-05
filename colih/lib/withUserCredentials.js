import { getIronSession } from "iron-session"
import User from '../model/User'

const users = new User()

export default () => (async ({ req, res }) => {
    //console.log(req)
    //console.log(res)

    var session = await getIronSession(req, res, process.env.sessionConfig)

    const id = session.userId

    //console.log(session)
    //console.log(process.env.NODE_ENV)

    if (!id) {
        console.log("ID não encontrado")

        return {
            redirect: {
                permanent: false,
                destination: '/sign-in'
            }
        }
    }

    const { _, item } = await users.getById(id)

    return { props: { user: item } }
})