```js
setTimeout(function () {
  console.log('9')
}, 0)
console.log('1')
async function async1() {
  console.log('2')
  await async2()
  console.log('8')
}
async function async2() {
  return new Promise(function (resolve) {
    console.log('3')
    resolve()
  }).then(function () {
    console.log('6')
  })
}
async1()

new Promise(function (resolve) {
  console.log('4')
  resolve()
}).then(function () {
  console.log('7')
})
console.log('5')

// 先输出1，2，3。3后面的then进入微任务队列。
// 执行外面的同步代码，输出4，5。4后面的then进入微任务队列。
// 接下来执行微任务，因为3后面的then先进入，所以按序输出6，7。
// 下面回到async1函数，await关键字等到了结果继续往下执行。
// 输出8，进行下一轮事件循环也就是宏任务二，输出9。

// 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9
```

```js
async function async1() {
  console.log('2')
  const data = await async2()
  console.log(data)
  console.log('8')
}

async function async2() {
  return new Promise(function (resolve) {
    console.log('3')
    resolve('await的结果')
  }).then(function (data) {
    console.log('6')
    return data
  })
}
console.log('1')

setTimeout(function () {
  console.log('9')
}, 0)

async1()

new Promise(function (resolve) {
  console.log('4')
  resolve()
}).then(function () {
  console.log('7')
})
console.log('5')


// 1 2 3 4 5 6 7 'await的结果' 8 9


// 函数async1和async2只是定义先不去管他，首先输出1。
// setTimeout作为宏任务进入宏任务队列等待下一轮事件循环。
// 进入async1()函数输出2，await下面的代码进入等待状态。
// 进入async2()输出3，then回调进入微任务队列。
// 现在执行外面的同步代码，输出4，5，then回调进入微任务队列。
// 按序执行微任务，输出6，7。现在回到async1函数。
// 输出data，也就是await关键字等到的内容，接着输出8。
// 进行下一轮时间循环输出9。
// 执行结果：1 - 2 - 3 - 4 - 5 - 6 - 7 - await的结果 - 8 - 9

```


```js
setTimeout(function () {
  console.log('8')
}, 0)

async function async1() {
  console.log('1')
  const data = await async2()
  console.log('6')
  return data
}

async function async2() {
  return new Promise(resolve => {
    console.log('2')
    resolve('async2的结果')
  }).then(data => {
    console.log('4')
    return data
  })
}

async1().then(data => {
  console.log('7')
  console.log(data)
})

new Promise(function (resolve) {
  console.log('3')
  resolve()
}).then(function () {
  console.log('5')
})

// 1 2 3 4 5 6 7 'async2的结果' 8


// setTimeout作为宏任务进入宏任务队列等待下一轮事件循环。
// 先执行async1函数，输出1，6进入等待状态，现在执行async2。
// 输出2，then回调进入微任务队列。
// 接下来执行外面的同步代码输出3，then回调进入微任务队列。
// 按序执行微任务，输出4，5。下面回到async1函数。
// 输出了4之后执行了return data，await拿到了内容。
// 继续执行输出6，执行了后面的 return data 才触发了async1()的then回调输出7以及data。
// 进行第二轮事件循环输出8。
// 执行结果：1 - 2 - 3 -4 - 5 - 6 - 7 - async2的结果 - 8

```

```js
async function test() {
  console.log('test start');
  await undefined;
  console.log('await 1');
  await new Promise(r => {
    console.log('promise in async');
    r();
  });
  console.log('await 2');
}

test();
new Promise((r) => {
  console.log('promise');
  r();
}).then(() => {
  console.log(1)
}).then(() => {
  console.log(2)
}).then(() => {
  console.log(3)
}).then(() => {
  console.log(4)
});


// test start promise await1 promise in async 1 await2 2 3 4

// 从test()开始，先输出 'test start'，await 后面并不是Promise，不需要等then，这时候后面的 console.log('await 1') await new Promise console.log('await 2') 会立即进入微任务队列。
// 然后 console.log('promise') 运行，console.log(1) 进入微任务队列。
// 现在开始运行微任务，依据先入先出，console.log('await 1')、console.log('promise in async') 被运行。
// console.log('promise in async') 所在的Promise前面加了await，所以 console.log('await 2') 作为微任务进入微任务队列。
// 刚才第二位进入微任务队列的 console.log(1) 运行，console.log(2) 进入微任务队列，在 console.log(2) 运行之前要先运行 console.log('await 2') 因为await2入队列早，后面的依次 2、3、4。

// test start -> promise -> await 1 -> promise in async -> 1 -> await 2 -> 2 -> 3 -> 4

```