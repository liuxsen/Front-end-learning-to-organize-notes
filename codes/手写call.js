Function.prototype.call = function(context = window){
  if(typeof this !== 'Function'){
    throw new Error('error')
  }
  context.fn = this
  const args = [...arguments].slice(1)
  const res = context.fn(...args)
  delete context.fn
  return res
}