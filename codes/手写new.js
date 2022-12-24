function create(fn, ...args){
  var obj = {}
  obj.__proto__ = fn.prototype
  var res = fn.apply(obj, args)
  return res instanceof Object ? res : obj
}

function fn(name, age){
  this.name = name
  this.age = age
}

create(fn, '章三', 1)