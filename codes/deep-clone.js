function deepClone(origin, target){
  let res = target || {}
  for(var key  in origin){
    if(Object.prototype.hasOwnProperty.call(origin, key)){
      if(typeof origin[key] === 'object' && origin[key] !== null){
        // array
        if(Object.prototype.toString.call(origin[key]) === '[object Array]'){
          res[key] = []
        } else {
          res[key] = {}
        }
        deepClone(origin[key], res[key])
      } else {
        res[key] = origin[key]
      }
    }
  }
  return res
}