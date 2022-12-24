function clone(origin){
  var res = null
  if(typeof origin === 'object' && origin !== null){
    if(Object.prototype.toString.call(origin) === '[object Array]'){
      res = []
    } else {
      res = {}
    }
    for(var key in origin){
      if(Object.prototype.hasOwnProperty.call(origin, key)){
        res[key] = origin[key]
      }
    }
  } else {
    res = origin
  }
  return res
}