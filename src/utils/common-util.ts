export const deepCopy = (obj: any): any => {
    if (!isNullOrEmpty(obj)
        && (Array.isArray(obj) || (typeof obj === 'object'))) {
        return JSON.parse(JSON.stringify(obj))
    }
    return obj
}

export function isNullOrEmpty(entity: any): boolean {
    if (entity === null || entity === undefined) {
        return true
    }

    switch (typeof entity) {
        case 'string':
            return entity === '' ? true : false
        case 'object': {
            const str = entity.toString()
            return (str === null || str === '') ? true : false
        }
        default:
            return false
    }
}

export function isNumber(value: number): boolean {
    if (value === null || value === undefined || isNaN(value)) {
        return false
    }

    return true
}

export function isPositiveNumber(value: number): boolean {
    if (isNumber(value) && value > 0) {
        return true
    }
    return false
}

export function encodeObject(entity: any): Uint8Array {
    return new TextEncoder().encode(JSON.stringify(entity))
}
