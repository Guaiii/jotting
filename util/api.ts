

export let BASE_URL = 'http://localhost:3000/api'


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
