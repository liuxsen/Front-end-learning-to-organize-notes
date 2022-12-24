async function async1 (){
  console.log(1)
}

async function async2 (){
  await async1()
  console.log(2)
}


function main(){
  async2()
}

main()

console.log('main')

new Promise((resolve) => {
  console.log('promise')
  resolve('resolve')
})
.then(() => {
  console.log('aaa')
})

// 1
// main
// promise
// 2
// aaa