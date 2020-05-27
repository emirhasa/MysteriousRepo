/******************************************
 * Simple array sum
 * Given an array of integers, find the sum of its elements
 * Input format: n comma separated integers denoting the arrays elements
 * Input format2 : array ar with n integers
 * Constraints 0 < n, ar[i] <= 1000
 * Print the sum of the array's elements as a single integer
 *****************************************/

const assert = {
    equal : function(result1, result2) {
        if(result1 && result2 instanceof Array) {
            return result1.every(curr => result2.includes(curr));
            //  result1.Array.prototype.every(curr => result2.includes(curr));
        }
        if(result1 === result2) return true;
        return -1;
    }
}

// console.log(assert.equal(sumIntegers([10, 5, 3, 10, 11]), 39));

// let arr1 = [10, 5, 15];
// let arr2 = [5, 10, 15];

// console.log(assert.equal(arr1, arr2));


//  //with rest operator
//  function sumIntegers(...ar) {
//      let sum = 0;
//      for(let number of ar) {
//         if(!isNaN(number) && number > 0 && number <= 1000) {
//             sum+= number;
//         }
//      }
//      return sum;
//  }

//  //with array
//  function sumIntegers(ar) {
//     let sum = 0;
//     for(let number of ar) {
//         if(!isNaN(number) && number > 0 && number <= 1000) {
//             sum+= number;
//         }
//     }
//     return sum;
//  }

/**
 * Compare two rankings
 * Input: 2 arrays - 1 for each person
 * Each array represents points awarded for each of the 3 categories
 * Compare points from respective categories and award points 
 * return: array/object with 2 values, containing the points won by each person
*/

// function compareRanking(pointsArr1, pointsArr2) {
//     const ranking = {
//         contestant1 : {
//             name : 'Alice',
//             points : 0
//         },
//         contestant2 : {
//             name : 'Bob',
//             points : 0
//         }
//     };
//     pointsArr1.forEach((curr, index) => {
//         if(curr > pointsArr2[index]) {
//             ranking.contestant1.points++;
//         } else if(curr < pointsArr2[index]) {
//             ranking.contestant2.points++;
//         }
//     });
//     return [ranking.contestant1.points, ranking.contestant2.points];
// }

// console.log(compareRanking([10, 4, 2], [11, 3, 2]));


/**
 *
*/
