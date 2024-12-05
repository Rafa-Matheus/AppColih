/** @type {import('next').NextConfig} */

require('dotenv').config({ path: '.env' })

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        url: "http://localhost:3000",
        isHttps: true,
        mailHost: "smtp.office365.com",
        mailPort: 587,
        mailUser: "rafael.oliveira@parkplusinc.com",
        mailSender: "rafael.oliveira@parkplusinc.com",
        mailPassword: "RMDOparkplus160",
        sendGridApiKey: "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",
        sessionConfig: {
            cookieName: "SESSION",
            cookieOptions: {
                secure: process.env.NODE_ENV != "development"
            },
            password: "p3#oCQDw0TAJ4W&ow5pVka2^0spIG@2U"
        },
        currencySymbol: "USD"
    }
}

module.exports = nextConfig