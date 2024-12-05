import { pad } from './TextUtil'

export function adjustTimezone(dateTime) {
    var timeOffsetInMS = dateTime.getTimezoneOffset() * 60000
    dateTime.setTime(dateTime.getTime() - timeOffsetInMS)
    return dateTime
}

export function getFirstAndLastDayOfMonth(dateTime) {
    return {
        first: new Date(dateTime.getFullYear(), dateTime.getMonth(), 1),
        last: new Date(dateTime.getFullYear(), dateTime.getMonth() + 1, 0)
    }
}

export function getDateRealRange(startDate, endDate) {
    const start = startDate
    start.setHours(0, 0, 0, 0)

    const end = endDate
    end.setHours(23, 59, 59, 999)

    return { start: start, end: end }
}

export function getDateRealRangeUTC(startDate, endDate) {
    const start = startDate
    start.setUTCHours(0, 0, 0, 0)

    const end = endDate
    end.setUTCHours(23, 59, 59, 999)

    return { start: start, end: end }
}

export function isInsideRange(startDate, endDate, date) {
    return date >= startDate && date <= endDate
}

export function getTimeDifference(startDate, endDate) {
    const ms = (startDate - endDate)
    return {
        days: Math.floor(ms / 86400000),
        hours: Math.floor((ms % 86400000) / 3600000),
        minutes: Math.round(((ms % 86400000) % 3600000) / 60000)
    }
}

export function getDateString(dateTime) {
    return `${dateTime.getFullYear()}-${pad(dateTime.getMonth() + 1, 2)}-${pad(dateTime.getDate(), 2)}`
}

export function setDateByString(dateTime, stringValue) {
    var parts = stringValue.match(/(\d+)-(\d+)-(\d+)/)

    dateTime.setFullYear(parseInt(parts[1]), parseInt(parts[2]) - 1, parseInt(parts[3]))
    return dateTime
}

export function getTimeString(dateTime) {
    return `${pad(dateTime.getHours(), 2)}:${pad(dateTime.getMinutes(), 2)}`
}

export function setTimeByString(dateTime, stringValue) {
    var parts = stringValue.match(/(\d+)\:(\d+)/)

    dateTime.setHours(parseInt(parts[1]), parseInt(parts[2]), 0, 0)
    return dateTime
}

export function setUTCTimeByString(dateTime, stringValue) {
    var parts = stringValue.match(/(\d+)\:(\d+)/)

    dateTime.setUTCHours(parseInt(parts[1]), parseInt(parts[2]), 0, 0)
    return dateTime
}

export function addMinutes(dateTime, minutes) {
    dateTime.setTime(dateTime.getTime() + (minutes * 60 * 1000))
    return dateTime
}

export function addHours(dateTime, hours) {
    dateTime.setTime(dateTime.getTime() + (hours * 60 * 60 * 1000))
    return dateTime
}

export function addDays(dateTime, days) {
    dateTime.setDate(dateTime.getDate() + days)
    return dateTime
}