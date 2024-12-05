import Button from 'components/Button'
import TitleScreen from '../screens/TitleScreen'
import { withRouter } from 'next/router'
import { Component } from 'react'
import { getApiJsonDataPost } from "tools/Util"
import CardItem from '../components/CardItem'

export default withRouter(class extends Component {

    /* #region  Setup */
    constructor(props) {
        super(props)

        this.parseCsv = this.parseCsv.bind(this)
        this.onChangeCsvInput = this.onChangeCsvInput.bind(this)
    }

    render() {
        return <TitleScreen title="Enviar CSV" href="/">
            <CardItem>
                <div style={{ fontSize: "16pt" }}>Faça o envio de um arquivo no formato CSV para atualizar rapidamente a lista de médicos no banco de dados.</div>
                <input style={{ display: "none" }} id="csv" type="file" onChange={this.onChangeCsvInput} />
                <Button onClick={() => {
                    document.getElementById("csv").click()
                }}>Procurar Arquivo</Button>
            </CardItem>
        </TitleScreen>
    }

    onChangeCsvInput() {
        const fileInput = document.getElementById('csv')

        if (fileInput.files && fileInput.files[0]) {
            var myFile = fileInput.files[0]
            var reader = new FileReader()

            reader.addEventListener('load', (e) => {
                let csvdata = e.target.result
                this.parseCsv(csvdata)
            })

            reader.readAsText(myFile)
        }
    }

    parseCsv(data) {
        let parsedata = []

        let newLinebrk = data.split("\n")
        for (let i = 0; i < newLinebrk.length; i++)
            parsedata.push(newLinebrk[i].split(","))

        this.submit(parsedata)
    }

    async submit(array) {
        const json = await getApiJsonDataPost("/doctors/submit",
            {
                data: array
            })

        if (json.success)
            alert("Banco de dados atualizado!")
    }

})