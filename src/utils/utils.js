const OBJECT = 'object'
const ARRAY = 'array'

function getDataType (data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
}

function isEmpty (stuff) {
  if (typeof stuff === 'string' || typeof stuff === 'number') {
    return !stuff.toString().length
  }
  if (typeof stuff === 'object') {
    if (getDataType(stuff) === OBJECT) {
      for (let key in stuff) {
        if (stuff[key]) {
          return false
        }
        return true
      }
    }
    if (getDataType(stuff) === ARRAY) {
      return !stuff.length
    }
  }
  return true
}

export {
  isEmpty
}
