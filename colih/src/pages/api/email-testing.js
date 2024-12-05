/* #region  Modules */
import { sendEmail } from '../../../lib/mailer'
import { activationTemplate } from '../../../lib/templates'
import { generateToken } from 'tools/TextUtil'
/* #endregion */

export default async function handler(_, res) {
    const email = "lyle.smith@parkplusinc.com"

    var index = 0, count = 40
    while (index < count) {
        const token = generateToken("0123456789", 6)
        sendEmail(
            `Activation Code - ParkPlus (${index + 1})`,
            email,
            activationTemplate(`Email ${index + 1}`, token))

        await new Promise(r => setTimeout(r, 2000))
        index++
    }

    res.status(200).json({ success: true })
}