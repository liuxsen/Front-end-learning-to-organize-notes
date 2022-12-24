var foo = 3;
function hoistVariable() {
    var foo = foo || 5;
    console.log(foo); // 5
}
hoistVariable();


// var foo = 3;
// // 预编译之后
// function hoistVariable() {
//     var foo;
//     foo = foo || 5;
//     console.log(foo); // 5
// }

// hoistVariable();


// 函数声明会提升定义部分，是可以执行代码的
function hoistFunction() {
    foo(); // output: I am hoisted

    function foo() {
        console.log('I am hoisted');
    }
}

hoistFunction();


// // 预编译之后
// function hoistFunction() {
//     function foo() {
//         console.log('I am hoisted');
//     }

//     foo(); // output: I am hoisted
// }

// hoistFunction();