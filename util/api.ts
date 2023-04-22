
const isDev = process.env.NODE_ENV === 'development'
console.log({isDev});
export let BASE_URL = isDev ? 'http://localhost:3000/api' : '/api'


export const validValue = (obj:Record<string,any>):boolean => {
  if(!obj || typeof obj !== 'object'){
      return false
  }
    for (const [k,v] of Object.entries(obj)) {
        if(!v && k !== 'important'){
            return false
        }
    }
    return true
}
