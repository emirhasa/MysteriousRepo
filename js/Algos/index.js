
/********************************* 
 * Intro
 * 
************************************/
// function someFunction(input) {

//     let t0 = performance.now(); //O(1)
//     let x = 'foo'; //O(1)
//     let y = 'bar'; //O(1)

//     let sum = 0;
//     for(let i = 0; i < input.length; i++) { //O(n)
//         sum+= i; //O(1)
//         someOtherFunction(); //O(1)
//     }

//     let t1 = performance.now(); //O(1)
//     console.log(t1 - t0 + ' miliseconds'); //O(2)
//     return sum; //O(1)
// }

// function someOtherFunction() {
//     console.log('Executed');
// }

// const array = new Array(5000).fill('data');
// console.log(array);
// console.log(someFunction(array));

// //therefore total O of someFunction is O(1 + 1 + 1 + n * (1 + 2 + 1)) = O(3 + 2n) 
// //the constants get removed usually so it's O(n)
// //if you'd like you can also include i++ but doesn't change the result if we reduce to O(n)


/********************************* 
 * Nesting
 * 
************************************/

// const array = [];
// for(let i = 0; i < 10; i++) {
//     array[i] = i;
// }

// function logPairs(input) {
//     for(let j = 0; j < input.length; j++) {
//         for(let k = 0; k < input.length; k++) {
//             console.log(array[j], array[k]);
//         }
//     }
// }
     
// logPairs(array);

//So for input function will be executed n times, and for each of those times another function is executed n times
//Like multiplying constants this time we will mutliply n by how many operations are there inside the inner function. And there are n operations
//So naturally that is O(n*n) = O(n^2)

/********************************* 
 * Different terms
 * 
************************************/

//what if there are different terms, that is - different inputs of variable size

const nums1 = [1, 5, 3, 10, 500];
const nums2 = [50, 1, 2, 4];

function multiplyFactors(inputX, inputY) {
    inputX.forEach(function(factor1) {
       inputY.forEach(function(factor2) {
            console.log(`${factor1} * ${factor2} = ${factor1 * factor2}`);
       });
    });
}

multiplyFactors(nums1, nums2);

//as we see we can't just say it's O(n^2) because they're 2 different unknown size inputs. So it will be
//O(n * m) which we could say is similar to O(n^2) - if we wanted to be specific then
//of course if m == n then O(n*m) == O(n^2) 
//if m > n then O(n*m) > O(n^2)
//if n > m then O(n*m) < O(n^2)


/********************************* 
 * 
 * 
************************************/





