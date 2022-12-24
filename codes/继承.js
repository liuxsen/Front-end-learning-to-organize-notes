function Grand (name, age){
  this.name = name
  this.age = age
}

Grand.prototype.sayName = function(){
  console.log(this.name)
}


function Person (name, age, sex){
  Grand.call(this, name, age)
  this.sex = sex
}

// Person.prototype = new Grand()
Person.prototype = Object.create(Grand.prototype)
Person.prototype.constructor = Person