const currSymbol = process.env.currencySymbol
import CryptoJS from 'crypto-js'

export function pad(num, size) {
    var value = num.toString()
    while (value.length < size)
        value = "0" + value

    return value
}

export function plural(single, plural, none, count) {
    if (count > 0)
        if (count > 1)
            return `${count} ${plural}`
        else
            return `1 ${single}`

    return none
}

export function formatToCurrency(value) {
    const floatValue = parseFloat(value)
    if (floatValue)
        return `${currSymbol} ${floatValue.toFixed(2).toString().replace(".", ",")}`
    else
        return "-"
}

export function formatTimeRange(start, end) {
    return `${formatTime(start)}-${formatTime(end)}min`
}

export function formatTime(minutes) {
    const hours = Math.floor(minutes / 60)
    minutes = minutes % 60

    return `${hours > 0 ? `${hours}:` : ""}${pad(minutes, 2)}`
}

export function formatToCurrencyWithoutSymbol(value) {
    const floatValue = parseFloat(value)
    if (floatValue)
        return `${floatValue.toFixed(2).toString().replace(".", ",")}`
    else
        return "-"
}

export function encrypt(value, secret) {
    return CryptoJS.AES.encrypt(value, secret).toString()
}

export function decrypt(data, secret) {
    const bytes = CryptoJS.AES.decrypt(data, secret)
    return bytes.toString(CryptoJS.enc.Utf8)
}

export function generateToken(charset, minTokenLength) {
    var charIndex = 0,
        totalChars = charset.length,
        tokenValue = ""

    while (charIndex < minTokenLength) {
        tokenValue += charset.charAt(Math.floor(Math.random() * totalChars))
        charIndex++
    }

    return tokenValue;
}

export function removeAccents(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

export function removeNumbers(value) {
    return value.replace(/\d+/g, '')
}