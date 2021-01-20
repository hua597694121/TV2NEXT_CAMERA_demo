import format from 'date-fns/format';

export function getCurrentTimestamp(): number {
    return Date.parse(new Date().toString())
}

export function getTimestamp(time: string): number {
    return Date.parse(time)
}

export function getCurrentDate(): string {
    return format(new Date(), 'MM/DD/YYYY HH:mm')
}

export function formatDate(date: Date, formatStr: string): string {
    return format(date, formatStr)
}

/**
 * @param timestamp
 * @param format  option: 'Y-M-D', 'Y-M-D h:m:s', 'Y/M/D h:m:s', 'Y年M月D日 h:m:s'
 */
export function timestampToDate(timestamp: number, format: string = 'Y-M-D h:m') {
    const date = new Date(timestamp)
    const TimeObj = {
        Y: date.getFullYear(),
        M: (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
        D: (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()),
        h: (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()),
        m: (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()),
        s: (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    }
    let newitem = format.split("").map(item => {
        for (let key in TimeObj) {
            if (item == key) {
                item = TimeObj[key]
            }
        }
        return item
    })
    return newitem.join("")
}

export function formatSeconds(value: number, showEmptyHours?: boolean) {
    const hours = Math.floor(value / 3600)
    const minutes = Math.floor((value / 60 % 60))
    const seconds = Math.floor((value % 60))

    const hourStr = hours < 10 ? `0${hours}` : hours.toString()
    const minuteStr = minutes < 10 ? `0${minutes}` : minutes.toString()
    const secondStr = seconds < 10 ? `0${seconds}` : seconds.toString()

    if (hours < 1) {
        return showEmptyHours ?
            `${hourStr}:${minuteStr}:${secondStr}` : `${minuteStr}:${secondStr}`
    }
    return `${hourStr}:${minuteStr}:${secondStr}`
}

export function chinesizeSecondsToTime(value: number, useTraditional?: boolean, keepInteger?: boolean) {
    const hourUnit = useTraditional ? '小時' : '小时'
    const minuteUnit = useTraditional ? '分鐘' : '分钟'
    const secondUnit = '秒'

    const hours = Math.floor(value / 3600)
    const minutes = Math.floor((value / 60 % 60))
    const seconds = keepInteger ? (value % 60) : Math.floor((value % 60))

    let time = `${seconds}${secondUnit}`
    if (minutes > 0) {
        time = `${minutes}${minuteUnit}${time}`
    }
    if (hours > 0) {
        time = `${hours}${hourUnit}${time}`
    }
    return time
}

export function convertTimeToSeconds(time: string) {
    const hours = time.split(':')[0]
    const minutes = time.split(':')[1]
    const seconds = time.split(':')[2]
    return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)
}