const isDev = process.env.NODE_ENV === 'development'

export let BASE_URL = isDev ? process.env.BASE_URL_DEV : process.env.BASE_URL_PROD
console.log({isDev, BASE_URL});

export const validValue = (obj: Record<string, any>): boolean => {
    if (!obj || typeof obj !== 'object') {
        return false
    }
    for (const [k, v] of Object.entries(obj)) {
        if (!v && k !== 'important') {
            return false
        }
    }
    return true
}
