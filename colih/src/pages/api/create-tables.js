/* #region  Modules */
import Schema from "db/Schema"
const schema = new Schema()
/* #endregion */

export default async function handler(_, res) {
    await schema.createTable("usuarios", table => {
        table.id()
        table.text("nivel", "5")
        table.text("situacao", "'pendente'") //pendente, ativo, bloqueado
        table.text("img_src")
        table.text("nome")
        table.text("email")
        table.text("senha")
        table.text("token")
    }, true)

    await schema.createTable("medicos", table => {
        table.id()
        table.text("especialidade")
        table.text("status", "'pendente'") //pendente, ativo, bloqueado
        table.text("img_src")
        table.text("nome")
        table.text("endereco")
        table.text("atendimento")
        table.json("telefones", "'[]'")
        table.text("email")
        table.boolean("colaborador")
        table.text("nivel_colaboracao", "'normal'")
    }, true)

    await schema.createTable("historico", table => {
        table.id()
        table.integer("id_usuario")
        table.text("crm")
        table.json("metadata", "'{}'")
        table.timestampWithoutZone("criacao", 6)
        table.timestampWithoutZone("inicio", 6)
        table.timestampWithoutZone("fim", 6)
        table.text("observacoes")
    }, true)

    await schema.createTable("notificacoes", table => {
        table.id()
        table.text("usuario")
        table.timestampWithoutZone("timestamp", 6)
        table.text("titulo")
        table.text("conteudo")
        table.integer("agendamento")
        table.text("status", "'not_readed'")
        table.text("nivel")
    }, true)

    await schema.createTable("agendamentos", table => {
        table.id()
        table.timestamp("criacao", 6)
        table.text("titulo")
        table.text("usuario")
        table.json("dias", "'[]'")
        table.timestamp("data", 6)
        table.timestamp("horario_inicial", 6)
        table.timestamp("horario_final", 6)
        table.text("observacoes")
    }, true)

    await schema.createTable("plantoes", table => {
        table.id()
        table.timestamp("criacao", 6)
        table.text("titulo")
        table.json("usuarios", "'[]'")
        table.timestamp("data_inicial", 6)
        table.timestamp("data_final", 6)
        table.text("observacoes")
    }, true)

    res.status(200).json({ success: true })
}