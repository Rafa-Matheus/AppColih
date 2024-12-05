import Model from 'db/Model'
import bcrypt from 'bcrypt'
import { sendEmail } from '../lib/mailer'
import { activationTemplate, resetPasswordTemplate, setPasswordTemplate } from '../lib/templates'
import { generateToken } from 'tools/TextUtil'

const saltRounds = 10

export default class User extends Model {

    constructor() {
        super("usuarios", ["img_src", "situacao", "nivel", "nome", "email", "senha", "token"])
    }

    async create(credentials) {
        const user = await this.getFirstWhere("email", credentials.email)
        if (!user.exists) {
            const token = generateToken("0123456789", 6)
            credentials.token = token

            credentials.senha = await new Promise(resolve => {
                bcrypt.hash(credentials.senha, saltRounds, async (_, hash) => {
                    resolve(hash)
                })
            })

            sendEmail(
                "Código de Ativação - COLIH",
                credentials.email,
                activationTemplate(credentials.name, token))

            return { success: await this.insert(credentials), msg: 1 } //Internal error
        } else if (user.item.status == "bloqueado")
            return { success: false, msg: 1 }

        return { success: false, msg: 0 } //Already exists
    }

    async sendPasswordEmail(email) {
        const user = await this.getFirstWhere("email", email)
        if (user.exists) {
            const token = this.generateBigToken()
            await this.update(user.item.id, { token: token })

            sendEmail(
                "Definir Senha - COLIH",
                email,
                setPasswordTemplate(`${process.env.url}/new-password?email=${email}&t=${token}`)
            )
        }
    }

    async auth(req, session) {
        const user = await this.selectFirst(await
            this.dataBase.table(this.tableName)
                .select("id", "senha")
                .where("situacao", "ativo")
                .where("email", req.body.email)
                .limit(1)
                .get())

        if (user.exists) {
            const result = await this.comparePasswords(req.body.password, user.item.senha)
            if (result === true) {
                session.userId = user.item.id
                await session.save()
            }

            return { success: result, msg: 1 } //Senha incorreta
        }

        return { success: false, msg: 2 } //O email não existe ou não está ativo
    }

    async comparePasswords(a, b) {
        return await bcrypt.compare(a, b)
    }

    async resetPassword(credentials) {
        const user = await this.selectFirst(await
            this.dataBase.table(this.tableName)
                .select("senha")
                .where("situacao", "ativo")
                .where("email", credentials.email)
                .limit(1)
                .get())

        if (user.exists) {
            const token = generateToken("0123456789", 6)

            sendEmail(
                "Código de Verificação - COLIH",
                credentials.email,
                resetPasswordTemplate(token))

            return await this.update({ email: credentials.email, token: token })
        }

        return false
    }

    async newPassword(credentials) {
        const user = await this.getFirstWhere("email", credentials.email)
        if (user.exists) {
            const isSameToken = user.item.token === credentials.token
            if (isSameToken == true) {
                const password = await new Promise(resolve => {
                    bcrypt.hash(credentials.password, saltRounds, async (_, hash) => {
                        resolve(hash)
                    })
                })

                await this.update(user.item.id, { situacao: "ativo", token: "", senha: password })
            }

            return { success: isSameToken }
        }

        return { success: false }
    }

    async checkCode(credentials) {
        const user = await this.getFirstWhere("email", credentials.email)
        if (user.exists) {
            const token = credentials.token.replace(/\s+/g, "")
            const isSameToken = user.item.token === token
            const resetToken = this.generateBigToken()
            if (isSameToken == true)
                await this.update(user.item.id, { situacao: "ativo", token: credentials.reset ? resetToken : "" })

            return { success: isSameToken, token: resetToken }
        }

        return { success: false }
    }

    async filterAll(filters) {
        //const keys = Object.keys(filters)
        
        var query = this.dataBase.table(this.tableName).select(["id", ...this.columns])
    
        // if(keys.includes("esp"))
        //     query = query.whereIn("especialidade", filters["esp"].split("|"))

        // if(keys.includes("at"))
        //     query = query.where(query => {
        //         filters["at"].split("|").forEach(at => {
        //             query = query.like("atendimento", at, "OR")
        //         })
        //     })

        // if(keys.includes("loc"))
        //     query = query.where(query => {
        //         filters["loc"].split("|").forEach(cidade => {
        //             query = query.like("endereco", cidade, "OR")
        //         })
        //     })

        // if(keys.includes("col"))
        //     query = query.where("colaborador", filters["col"] == "Sim")

        return await query.get()
    }

    async search(value) {
        return await this.dataBase.table(this.tableName)
            .select(["id", ...this.columns])
            // .where(query => {
            //     query.like("especialidade", value)
            //     query.like("status", value, "OR")
            //     query.like("nome", value, "OR")
            //     query.like("endereco", value, "OR")
            //     query.like("atendimento", value, "OR")
            //     query.like("telefone", value, "OR")
            //     query.like("email", value, "OR")
            // })
            .get()
    }

    generateBigToken() {
        return generateToken("aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789", 32)
    }

    async filterItem(value, props) {
        return true
    }

    async mapItem(value, props) {
        return value
    }

}