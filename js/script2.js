// /****************************************************** */
// //First-class functions / passing as argument and returning
// /****************************************************** */


// function myArrayCalc(arr, fn) {
//     var myArr = new Array();
//     for(var i=0; i < arr.length; i++) {
//         myArr.push(fn(arr[i]));
//     }
//     return myArr;
// }

// years = [1975, 1988, 1993, 1954, 2001, 2010];

// ages = myArrayCalc(years, function(year) {
//     return 2020 - year;
// });

// console.log(ages);

// function fullOfAge(age) {
//     return age >= 18;
// }

// values = new Array(myArrayCalc(ages, fullOfAge));

// console.log(values);


// var Device = function(manufactureDate, material) {
//     this.manufactureDate = manufactureDate,
//     this.material = material;
//     this.about = function() {
//         console.log('Device manufacture date: ' + this.manufactureDate);
//         console.log('Made of: ' + this.material);
//     }
// }

// mechanicalDevice = new Device(2006, 'plastic and metal');

// var Printer = function(device, model, type) {
//     this.device = device;
//     this.model = model;
//     this.type = type;
// }

// myPrinter = new Printer(mechanicalDevice, 'PR-305', 'Ink');
// myPrinter.device.about();

// console.log(myPrinter);

// function getInterviewQuestion(job) {
//     switch(job) {
//         case 'teacher':
//             return function(name) { return 'So, how long have you been teaching for, ' + name + '?'; };
//             break;
//         case 'designer':
//             return function(name) { return name + ' how many designs have you submitted?' };
//             break;
//         case 'programmer':
//             return function(name) { return name + ', what is your primary programming language?'};
//             break;
//         case 'doctor':
//             return function(name) { return 'Dr. ' + name + ', how many patients do you treat daily?'};
//             break;
//         default:
//             return function(name) { return 'Great to meet you' + name; };
//     }
// }

// var teachers = ['Emir', 'Muyo', 'Suyo', 'Han'];

// function askQuestions(teachers) {
//     for(var i = 0; i < teachers.length; i++) {
//         var question = getInterviewQuestion('teacher');
//         console.log(question(teachers[i]));
//     }
// }

// askQuestions(teachers);

// /****************************************************** */
// //Closures
// /****************************************************** */

// function getRetirement(retirementAge) {
//     console.log('Outer function executed');

//     return function yearsUntilRetired(birthYear) {
//         console.log('Inner function executed');
//         var age = 2020 - birthYear;
//         return retirementAge - age;
//     }
// }

// var retirementFunc = getRetirement(68);

// retirementFunc(1975);

// //function constructor
// var Question = function(question, answers, correctAnswer, id) {
//    this.question = question;
//    this.answers = answers;
//    this.correctAnswer = correctAnswer;
//    this.id = id;
// };
 
// //Saving different questions to an array. 
// var workQuestion = new Question("Where will you be working in 2 months time?", [ "Premier Foods FSP", "Amex", "Out Of Job" ], "Amex", 1);
 
// var gfQuestion = new Question("Who is X´s Other Half?", ["Erica", "India", "My Cat"], "Erica", 2);
 
// var abcQuestion = new Question("Which letter Am  I thinking?", ["a", "b", "c"], "a", 3);
 
 
// var Questions = [workQuestion, gfQuestion, abcQuestion];
 

 
// function askQuestion(randomQuestion) {

//     //let's see in console which question was asked
//     console.log(randomQuestion);
 
//     //Function closures to verify the answer
//     return function checkAnswer() {

//         //queston is still here?
//         console.log(randomQuestion);

//         var answer = prompt(randomQuestion.question);

//         //checking if they answered correctly
//         return randomQuestion.correctAnswer === answer;
//     }

// }
 
// // variable to know which random question to ask
// var questionNr = Math.floor(Math.random() * Questions.length);

// var randomQuestion = askQuestion(Questions[questionNr]);

// var usingClosureFunc = randomQuestion();
// if(usingClosureFunc) alert("Correct!"); else alert("Incorrect :/");

////interview questions

// function interviewQuestion(job, name) {
//     console.log('Thank you for applying to job: ' + job, ', Mr. ' + name);
//     return function myFunc() {
//         switch(job) {
//             case 'designer':
//                 return 'How many designs have you submitted Mr. ' + name  + '?';
//             case 'teacher':
//                 return 'How long have you been teaching already Mr. ' + name  + '?';
//             case 'programmer':
//                 return 'What language have you used the most Mr. ' + name  + '?';
//             default:
//                 return 'How many positions have you worked at Mr. ' + name  + '?';
//         }
//     }
// }

// var designerApplication = interviewQuestion('designer', 'Omega');
// var programmerApplication = interviewQuestion('programmer', 'Alpha');
// var otherApplication = interviewQuestion('job', 'Sigma');

// console.log(designerApplication());
// console.log(programmerApplication());
// console.log(otherApplication());

// /****************************************************** */
// //Call, bind
// /****************************************************** */

// var john = {
//     firstName : 'John',
//     lastName : 'Doe',
//     birthYear : 1976,
//     job : 'Accountant',
//     presentation : function(style, timeOfDay) {
//         if(style === 'formal') {
//             return 'Good ' + timeOfDay + ' gentlemen, we\'re happy to have you here. My name is '
//               + this.firstName + ' ' + this.lastName + ' and I am ' + this.getAge() + ' years old. I work as an ' + this.job;
//         } else
//         {
//             return 'Hello everybody, nice to see you this ' + timeOfDay + '. I\'m '
//               + this.firstName + ' ' + this.lastName + '. I work here as an ' + this.job + '!';
//         }
//     },
//     getAge : function() {
//         return 2020 - this.birthYear;
//     }
// }

// var alex = {
//     firstName : 'Alex',
//     lastName : 'Neo',
//     birthYear : 1985,
//     job: 'UX designer'
// }

// alex.getAge = john.getAge;

// var johnCallOnAllex = john.presentation.call(alex, 'formal', 'morning');
// console.log(johnCallOnAllex);

// johnFormal = john.presentation.bind(john, 'formal');
// console.log(johnFormal('evening'));



// function receivingFunc(arr, fn) {
//     var funcArray = [];

//     for(var i = 0; i < arr.length; i++) {
//         funcArray.push(fn(arr[i]));
//     }

//     return funcArray;
// }

// function checkAgeLimit(limit, el) {
//     return el >= limit;
// }

// var agesArray = [50, 8, 20, 15, 18, 21, 59];

// var allowed = receivingFunc(agesArray, checkAgeLimit.bind(this, 19));
// console.log(allowed);


// var ageBoundFunction = checkAgeLimit.bind(this, 21);
// allowed = receivingFunc(agesArray, ageBoundFunction);
// console.log(allowed);

// /****************************************************** */
// //Practice
// /****************************************************** */

function getQuestion() {

    var Question = function(question, questionAnswers, correctAnswer) {
        this.question = question;
        this.questionAnswers = questionAnswers;
        this.correctAnswer = correctAnswer;
    }

    question1 = new Question('Is Javascript a cool language?', ['0: Yes', '1: No'], 0);
    question2 = new Question('The fox says... ', ['0: Moo', '1: Meow', '2: None of this', '3: Rawr'], 2);
    question3 = new Question('Was the moon landing faked?', ['0: Probably not', '1: Hell no', '2: Hell yes!', '3: The moon\'s made of cheese'], 3);
    question4 = new Question('What was Javascript\'s original name?', ['0: JavaLang', '1: Livescript', '2: RNG', '3: Typescript'], 1);
    question5 = new Question('Do you like Quentin Tarantino?', ['0: Yes', '1: Yes', '2: Yes'], -1);

    questionsArray = {
        questions : [question1, question2, question3, question4, question5],
        selectRandomQuestion : function() {
            var randomNumber = Math.floor(Math.random() * this.questions.length);
            return this.questions[randomNumber];
        }
    }

    var randomQuestion = questionsArray.selectRandomQuestion();

    return function checkAnswer() {
    
        for(var i=0; i < randomQuestion.questionAnswers.length; i++) {
            console.log(randomQuestion.questionAnswers[i]);
        }

        var answer = prompt(randomQuestion.question);
        if(randomQuestion.correctAnswer == answer ||  randomQuestion.correctAnswer == -1) console.log('Correct!'); else console.log('Incorrect!');
    }
}

var QuestionFactory = function() {
    this.getNewQuestion = function() {
        this.currentQuestion = getQuestion();
        return this.currentQuestion;
    }
    this.askQuestion = function() {
        this.currentQuestion();
    }
    this.currentQuestion = null;
}

var myQuestionFactory = new QuestionFactory;
var question = myQuestionFactory.getNewQuestion();
question();
question();

//possible to get the same question even though it's "new" as there are only 5 questions in the pool // technically it's always possible
myQuestionFactory.getNewQuestion();
myQuestionFactory.askQuestion();





