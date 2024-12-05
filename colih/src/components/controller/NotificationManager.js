import { getApiJsonDataPost } from "tools/Util"

const topic = 'colih-app-push-testing-a86b752992c5b61de453dfcd44f16c89'

export default class NotificationManager {

    subscribe(handler) {
        const socket = new WebSocket(`wss://ntfy.sh/${topic}/ws`)
        socket.addEventListener('message', handler)
    }

    async send(userId, message, scheduleId) {
        const json = await getApiJsonDataPost("/notifications/insert",
            {
                titulo: message,
                usuario: `${userId}`,
                timestamp: new Date(),
                //nivel: "urgente",
                conteudo: "",
                agendamento: scheduleId
            })

        if (json.success)
            this.sendNotification(-1, message, {})
    }

    async sendNotification(user, message, data) {
        fetch(`https://ntfy.sh/${topic}`, {
            method: 'POST',
            body: JSON.stringify({
                user: user,
                message: message,
                data: data
            })
        })
    }

    async getCount(user) {
        const json = await getApiJsonDataPost("/notifications/count", { user: user })
        if (json.success)
            return json.count

        return 0
    }

    async getUnread() {
        const json = await getApiJsonDataPost("/notifications/unread")
        if (json.success)
            return json.items

        return []
    }

    async setReaded(id) {
        await getApiJsonDataPost("/notifications/read", { id: id })
    }

    showNotification(message) {
        if (Notification.permission === "granted") {
            var notification = new Notification("Título da Notificação", {
                body: message,
                icon: "/assets/colih.png"
            })

            notification.onclick = e => {
                console.log(e)
            }
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                    var notification = new Notification("Título da Notificação", {
                        body: message,
                        icon: "/assets/colih.png"
                    })

                    notification.onclick = e => {
                        console.log(e)
                    }
                }
            })
        }
    }

}