const globalStyle =
    `body {
        font-family: sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: #333333;
        padding: 20px;
    }
    a {
        color: #0F2E53;
        text-decoration: none;
        font-weight: bold;
    }
    a.button {
        display: inline-block;
        margin: 16px 0;
        border: 2px solid #0F2E53;
        border-radius: 8px; 
        padding: 6px 12px;
    }`

const footer =
    `<p style="margin-top: 40px;">
        See you 👋<br/>
        <a href="${process.env.url}" target="_blank">ParkPlus</a>
    </p>`

export function activationTemplate(userName, token) {
    return `<html>
                <head>
                    <title>Activation Code</title>
                    <style>${globalStyle}</style>
                </head>
                <body>
                    <h1>Welcome to ParkPlus!</h1>
                    <p>Hi ${userName}, use this code to active your account:</p>
                    <h1>${token}</h1>
                    ${footer}
                </body>
            </html>`
}

export function resetPasswordTemplate(token) {
    return `<html>
                <head>
                    <title>Verification Code</title>
                    <style>${globalStyle}</style>
                </head>
                <body>
                    <h1>Verification Code</h1>
                    <p>Use this code to reset your password:</p>
                    <h1>${token}</h1>
                    ${footer}
                </body>
            </html>`
}

export function setPasswordTemplate(link) {
    return `<html>
                <head>
                    <title>Welcome to ParkPlus!</title>
                    <style>${globalStyle}</style>
                </head>
                <body>
                    <h1>Welcome to ParkPlus!</h1>
                    <p>Your account needs a password</p>
                    <p>Please, go to ${link}</p>
                    ${footer}
                </body>
            </html>`
}