// fn.bind({}, 1)(2)
// var a = fn.bind({}, 1) new a(2)

Function.prototype.bind = function(context){
  if(typeof this !== 'Function'){
    throw new TypeError('error')
  }
  var that = this
  var args = [...arguments]
  return function f(){
    if(this instanceof f){
      return new that(...args, ...arguments)
    } else {
      that.apply(context, args.concat([...arguments]))
    }
  }
}