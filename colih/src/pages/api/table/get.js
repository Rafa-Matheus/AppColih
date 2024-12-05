import Admin from 'db/Admin'
import { getIronSession } from 'iron-session'
import User from '../../../../model/User'

const users = new User()

const admin = new Admin()

const Levels = {
    ParkPlus_Administrator: 0,
    ParkPlus_Employee: 1,
    ParkPlus_Technician: 2,
    Building_Management: 3,
    Normal_User: 4
}

export default async (req, res) => {
    if (req.method == "POST") {
        var session = getIronSession(req, res, process.env.sessionConfig)
        const userId = session.userId

        if (!userId) {
            res.status(404).end()
            return
        }

        const { _, item: user } = await users.getById(userId)
        const accessLevel = parseInt(user.access_level)

        const result = await admin.fetchTable(req,
            //Authenticate table
            async (table) => {
                switch (req.body.name) {
                    case "users":
                        //Avoid user to delete itself
                        if (req.body.delete)
                            if (req.body.delete.includes(userId))
                                return false

                        if (accessLevel != Levels.ParkPlus_Administrator) {
                            delete table.columns.access_level

                            if (accessLevel != Levels.ParkPlus_Administrator &&
                                accessLevel != Levels.ParkPlus_Technician)
                                delete table.columns.garage_id
                        }

                        return accessLevel == Levels.ParkPlus_Administrator
                            || accessLevel == Levels.ParkPlus_Technician
                            || accessLevel == Levels.Building_Management
                    case "history":
                        if (accessLevel == Levels.Normal_User) {
                            delete table.columns.user_id
                            delete table.columns.vehicle_id
                        }
                        break
                }

                return true
            },
            //Filter which items will appear
            async (_, query) => {
                switch (req.body.name) {
                    case "users":
                        switch (accessLevel) {
                            case Levels.ParkPlus_Technician:
                                return query.where("access_level", Levels.Normal_User)
                            case Levels.Building_Management:
                                return query.where("access_level", Levels.Normal_User)
                                    .where("garage_id", user.garage_id)
                        }
                        break
                    case "history":
                        if (accessLevel == Levels.Normal_User)
                            return query.where("user_id", userId)
                        break
                }

                return query
            },
            //Maps items that will be inserted/updated
            async (_, data) => {
                if (req.body.name == "users") {
                    if (accessLevel == Levels.Building_Management)
                        data.garage_id = user.garage_id
                }
            },
            //Check password for deletion
            async (_) => {
                return await users.comparePasswords(req.body.password, user.password)
            })

        //Send password email to the new user
        if (result.success)
            if (req.body.name == "users" &&
                req.body.data &&
                !req.body.data.id)
                users.sendPasswordEmail(req.body.data.email)

        res.json(result)
    }
    else
        res.status(404).end()
}