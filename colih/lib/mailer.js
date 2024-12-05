import nodemailer from 'nodemailer'

import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.sendGridApiKey)

const transport = nodemailer.createTransport({
    host: process.env.mailHost,
    port: process.env.mailPort,
    auth: {
        user: process.env.mailUser,
        pass: process.env.mailPassword,
    },
    tls: {
        rejectUnauthorized: false
    }
})

export function sendEmail2(subject, receiver, template) {
    return

    const message = {
        from: process.env.mailSender,
        to: process.env.isHttps == true ? receiver : process.env.mailSender,
        subject: subject,
        html: template
    }

    sgMail.send(message).then(info => {
        if (process.env.isHttps != true)
            console.log(info)
        }, error => {
        if (error)
            console.error(error.message)
    })
}

export function sendEmail(subject, receiver, template) {
    return

    const message = {
        from: process.env.mailSender,
        to: process.env.isHttps == true ? receiver : process.env.mailSender,
        subject: subject,
        html: template
    }

    transport.sendMail(message, (error, info) => {
        if (error)
            console.error(error.message)
        else if (process.env.isHttps != true)
            console.log(info)
    })
}