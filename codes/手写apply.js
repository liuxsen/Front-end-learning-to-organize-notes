Function.prototype.apply = function(context = window){
  if(typeof this !== 'Function'){
    throw new Error('err')
  }
  context.fn = this
  let res;
  if(arguments[1]){
    res = context.fn(...arguments[1])
  } else {
    res = context.fn()
  }
  delete context.fn;
  return res
}