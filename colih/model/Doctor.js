import Model from 'db/Model'

export default class User extends Model {

    constructor() {
        super("medicos", ["crm", "especialidade", "img_src", "status", "nome", "endereco", "atendimento", "telefones", "email", "colaborador", "nivel_colaboracao"])
    }

    async filterAll(filters) {
        const keys = Object.keys(filters)

        var query = this.dataBase.table(this.tableName).select(["id", ...this.columns])

        if (keys.includes("esp"))
            query = query.whereIn("especialidade", filters["esp"].split("|"))

        if (keys.includes("at"))
            query = query.where(query => {
                filters["at"].split("|").forEach(at => {
                    query = query.like("atendimento", at, "OR")
                })
            })

        if (keys.includes("loc"))
            query = query.where(query => {
                filters["loc"].split("|").forEach(cidade => {
                    query = query.like("endereco", cidade, "OR")
                })
            })

        if (keys.includes("col"))
            query = query.where("colaborador", filters["col"] == "Sim")

        return await query.get()
    }

    async search(value) {
        return await this.dataBase.table(this.tableName)
            .select(["id", ...this.columns])
            .where(query => {
                query.like("especialidade", value)
                query.like("status", value, "OR")
                query.like("nome", value, "OR")
                query.like("endereco", value, "OR")
                query.like("atendimento", value, "OR")
                query.like("telefone", value, "OR")
                query.like("email", value, "OR")
            })
            .get()
    }

    async parse(array) {
        var index = 1
        while (index < array.length) {
            await this.parseRow(array[index])
            index++
        }
    }

    async parseRow(row) {
        var crm = row[7]

        var table = this.dataBase.table(this.tableName).where("crm", crm).limit(1)
        var item = await table.getFirst()

        table = this.dataBase.table(this.tableName)

        var telefones = {}
        if (item != null)
            telefones = item.telefones

        var novos_telefones = row[2].split('|')

        var index = 0
        while (index < novos_telefones.length) {
            var telefone = novos_telefones[index].split(' ')
            telefones[telefone[0] ?? "principal"] = telefone[1] ?? novos_telefones[index]
            index++
        }

        if (item != null)
            await table.update({
                crm: crm,
                status: "ativo",
                especialidade: row[1],
                nome: row[0],
                telefones: JSON.stringify(telefones),
                atendimento: row[3],
                colaborador: row[4] === "sim",
                email: row[5],
                endereco: row[6]
            })
        else
            await table.insert({
                crm: crm,
                status: "ativo",
                especialidade: row[1],
                nome: row[0],
                telefones: JSON.stringify(telefones),
                atendimento: row[3],
                colaborador: row[4] === "sim",
                email: row[5],
                endereco: row[6]
            })
    }

    async filterItem(value, props) {
        return true
    }

    async mapItem(value, props) {
        return value
    }

}