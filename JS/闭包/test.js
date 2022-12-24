function f(x){
  return function b (y) {
    console.log(x)
    console.log((++x)+ y)
  }
}

const b = f(10)
b(1) // 10 11 + 1 = 12
b(1)
