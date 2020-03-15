//_______________________________________________________________________
var person1 = {
    firstName : 'John',
    lastName : 'Doe',
    age : 33,
    height : 1.85,
    weight : 78,
    calculateBMI : function(){
        this.BMI = this.weight / this.height**2;
        return this.BMI;
    },
    getFullName : function() {
        return this.firstName + ' ' + this.lastName;
    },
    sayMyBMI: function() {
        return this.getFullName() + ' BMI is = ' + this.BMI;
    }
}

var person2 = {
    firstName : 'Max',
    lastName : 'Doe',
    age : 29,
    height : 1.89,
    weight : 85,
    calculateBMI : function(){
        var BMI = 0;
        BMI = this.weight / this.height ** 2;
        this.BMI = BMI.toFixed(2);
    },
    getFullName : function() {
        return this.firstName + ' ' + this.lastName;
    },
    sayMyBMI: function() {
        return this.getFullName() + ' BMI is = ' + this.BMI;
    }
}

person2.calculateBMI();
console.log(person2.sayMyBMI());

/***************************************************************************************************************/
//Reference-passing, setting new property on object inside function
/***************************************************************************************************************/

var johnBills = {
    bills : new Array(124, 48, 268, 180, 42),
    tips : new Array(),
    total : new Array(),
    calculateTipsTotal : function() {
        for(var i = 0; i < this.bills.length; i++) {
            switch(true) {
                case this.bills[i] < 50:
                    this.tips.push(this.bills[i] * 0.2);
                    this.total.push(this.tips[i] + this.bills[i]);
                    break;
                case this.bills[i] < 200:
                    this.tips.push(this.bills[i] * 0.15);
                    this.total.push(this.tips[i] + this.bills[i]);
                    break;
                default:
                    this.tips.push(this.bills[i] * 0.1);
                    this.total.push(this.tips[i] + this.bills[i]);
            }
        }
    },
    getTips : function() {
        console.log('Tips: ************');
        for(var i = 0; i < this.tips.length; i++) {
            console.log(this.tips[i]);
        }
    },
    getTotals : function() {
        console.log('Total: ************');
        for(var i = 0; i < this.total.length;i++) {
            console.log(this.total[i]);
        }
    }
}

var markBills = {
    bills : new Array(77, 375, 110, 45),
    calculateTipsTotal : function() {
        tips = new Array();
        totals = new Array();
        bills = this.bills;
        for(var i=0; i < bills.length; i++) {
            switch(true) {
                case bills[i] < 100 :
                    tips.push(bills[i] * 0.2);
                    totals.push(tips[i] + bills[i]);
                    break;
                case bills[i] < 300 :
                    tips.push(bills[i] * 0.1);
                    totals.push(tips[i] + bills[i]);
                    break;
                default:
                    tips.push(bills[i] * 0.25);
                    totals.push(tips[i] + bills[i]);
            }
        }
        this.tips = tips;
        this.totals = totals;
    }
}


johnBills.calculateTipsTotal();
johnBills.getTips();
johnBills.getTotals();

markBills.calculateTipsTotal();
console.log(markBills.tips);

function calculateAvg(tipsArray) {
    var sum = 0;
    for(var i = 0; i < tipsArray.length; i++) {
        sum+=tipsArray[i];
    }
    return sum / tipsArray.length;
}

console.log('Average tip amount for John\'s family: ' + calculateAvg(johnBills.tips).toFixed(2));
console.log('Average tip for Mark\'s family: ' + calculateAvg(markBills.tips).toFixed(2));


/***************************************************************************************************************/
//Scope-chain
/***************************************************************************************************************/

var a = 5;
console.log(a);


functionOne();

function functionOne() {
    var a = 6;
    console.log(a);

    functionTwo();
    function functionTwo() {
        var a;
        a = 7;
        console.log(a);
    }
}

var arr = [10,20,30];
console.log(arr);

var person = {
    name : 'personName',
    lastName : 'personLastName',
    arr : new Array(10,50,30)
}

person.age = 5;
person.arr2 = [10,20,30];
console.log(person);


var myFunc = function() {
    return 50;
}
console.log(myFunc());

/***************************************************************************************************************/
//Function-borrowing
/***************************************************************************************************************/

var currentYear = 2020;
var person1 = {
    name : 'Muyo',
    birthYear : 1965,
    getAge : function() {
        console.log(this);
        var age = getCurrentYear() - this.birthYear;

        function getCurrentYear() {
            console.log(this);
            return currentYear;
        }
        return age;
    }
}

console.log(person1.getAge());

var person2 = {
    name : 'Suyo',
    birthYear : 1963,
    getAge : person1.getAge
}

console.log(person2.getAge());

/***************************************************************************************************************/
//Prototyping
/***************************************************************************************************************/

//indicate prototype objects with initial capital letter - good practice

var currentYear = 2020;

var Person = function(firstName, lastName, birthYear) {
    this.firstName = firstName;
    this.lastName= lastName;
    this.birthYear = birthYear;
}

var muyo = new Person('Muyo', 'Suyo', 1965);

var suyo = new Person('Suyo', 'Rayo', 1975);
console.log(suyo);

/***************************************************************************************************************/
//inheritance through direct assignment (not prototype)
/***************************************************************************************************************/

var Furniture = function(material, manufactureDate) {
    this.material = material;
    this.manufactureDate = manufactureDate;
}

var woodFurniture = new Furniture('wood and leather', 2015);

var Sofa = function(furniture, numberOfSeats) {
    this.Furniture = new Furniture(furniture.material, furniture.manufactureDate);
    this.numberOfSeats = numberOfSeats;
    this.about = function() {
        console.log('I\'m a sofa made of: ' + this.Furniture.material + '. Manufacture date: ' + this.Furniture.manufactureDate + '. I have ' + this.numberOfSeats + ' seats!');
    }
}

var mySofa = new Sofa(woodFurniture, 3);
console.log(woodFurniture);
mySofa.about();

/***************************************************************************************************************/
//inheriting properties through prototype
/***************************************************************************************************************/

var Vehicle = function(brand, horsePower, manufactureDate) {
    this.brand = brand;
    this.horsePower = horsePower;
    this.manufactureDate = manufactureDate;
}

Vehicle.prototype.interiorMaterial = 'plastic';

Vehicle.prototype.about = function() {
    console.log('**********');
    console.log('Brand: ' + this.brand + ' HP: ' + this.horsePower + ' Manufacture date: ' + this.manufactureDate);
    console.log('Interior made of ' + opelCar.interiorMaterial + '.');
    console.log('**********');
}

var opelCar = new Vehicle('Opel', 84, 2016);
console.log(opelCar);
opelCar.about();

/***************************************************************************************************************/
//inheriting through Object.create //Property precedence(direct > object prototype)
/***************************************************************************************************************/

var devicePrototype = {
    sayPrice : function() {
        console.log('My price is $' + this.price);
    }
}

var printer = Object.create(devicePrototype);
printer.price = 100;
printer.sayPrice();

var personPrototype = {
    lastName : 'Smith',
    calculateAge : function() {
        console.log("My age is " + 2020 - this.birthYear);
    }
}

var mujo = Object.create(personPrototype);
mujo.lastName = 'Suyo';
console.log(mujo);
console.log(mujo.lastName);
console.log(mujo.__proto__.lastName);

/***************************************************************************************************************/
//using constructor function + object prototype
/***************************************************************************************************************/

var woodFurniturePrototype = {
    name : {value : 'wood and leather'},
    manufactureDate : {value : 1995},
    about : function() {
        console.log('Made of ' + this.name.value + '. Date of manufacture: ' + this.manufactureDate.value);
    }
}

var Sofa = function(numberOfSeats, modelName) {
    this.furniture = Object.create(woodFurniturePrototype);
    this.numberOfSeats = numberOfSeats;
    this.modelName = modelName;
    this.about = function() {
        console.log('************');
        console.log('Sofa name: ' + this.modelName);
        this.furniture.about();
        console.log('Number of seats ' + this.numberOfSeats);
        console.log('************');
    }
}

var mySofa = new Sofa(4, '1337S0f4');
mySofa.about();



