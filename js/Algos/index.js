
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

// //what if there are different terms, that is - different inputs of variable size

// const nums1 = [1, 5, 3, 10, 500];
// const nums2 = [50, 1, 2, 4];

// function multiplyFactors(inputX, inputY) {
//     inputX.forEach(function(factor1) {
//        inputY.forEach(function(factor2) {
//             console.log(`${factor1} * ${factor2} = ${factor1 * factor2}`);
//        });
//     });
// }

// multiplyFactors(nums1, nums2);

// //as we see we can't just say it's O(n^2) because they're 2 different unknown size inputs. So it will be
// //O(n * m) which we could say is similar to O(n^2) - if we wanted to be specific then
// //of course if m == n then O(n*m) == O(n^2) 
// //if m > n then O(n*m) > O(n^2)
// //if n > m then O(n*m) < O(n^2)


/********************************* 
 * Recursion
 * 
************************************/
//Sum
//set up function test to assert

// const assert = {
//     equal: function(result1, result2) {
//         if(result1 === result2) {
//             console.log(true);
//             return; 
//         } 
//         console.log(false);
//     }
// }


// assert.equal(sum(10, 89, 4), 103);
// console.log(sum(10,89,4));


// function sum(...args) {
//   if(args.length == 1) return args[0];
//   let currentVal = args.splice(0,1)[0];
//   return currentVal + sum(...args);
// }

// //exponentiation
// assert.equal(exponent(2, 8), 64);

// function exponent(exp, base) {
//   if(exp == 0) return 1;
//   return base * exponent(exp-1, base);
// }

// //Fibonacci(n) returning array of sums
// assert.equal(fibonacci(5), [0, 1, 1, 2, 3]);


// function fibonacci(n) {
//   if(n == 1 ) {
//     let arr = [];
//     arr.push(0);
//     return arr;
//   }
//   if(n == 2) {
//     let arr = fibonacci(n-1);
//     arr.push(1);
//     return arr;
//   }
//   let arr = fibonacci(n-1);
//   arr.push(arr[n-2] + arr[n-3]);
//   return arr;
// }
// //will not work until assert equal arrays(based on values) is implemented


//Get an exclusive range of values and return array
// assert.equal(range(3, 9), [4, 5, 6, 7, 8]);

// function range(lower, upper) {
//   let diff = upper - lower;
//   if(diff < 2) return;
//   if(diff == 2) return [lower+1];
//   let arr = range(lower, upper-1);
//   arr.push(upper-1);
//   return arr;
// }


/********************************* 
 * Sorting
 * 
************************************/


//Bubble sort

// let unsorted = 
// [9, 10, 3, 50, 11, 2, 5];

// function BubbleSort(arr) {
//     for(let i = 0; i < arr.length; i++) {
//         for(let j = 0; j < arr.length; j++) {
//             if(arr[j] > arr[j+1]) {
//                 let temp = arr[j];
//                 arr[j] = arr[j+1];
//                 arr[j+1] = temp;
//             }
//         }
//     }
// }

// BubbleSort(unsorted);
// console.log(unsorted);

/**
 * select sort 
 */

// let unsorted = 
// [9, 10, 3, 50, 11, 2, 5, 30, 1, 2];

// function SelectionSort(arr) {
//     for(let i = 0; i < arr.length -1; i++) {
//         let tempMin = arr[i];
//         let index = arr[i];
//         for(let j = i+1; j < arr.length -1; j++) {
//             if(arr[j] < tempMin) {
//                 tempMin = arr[j];
//                 index = j;
//             }
//         }
//         if(i != index) {
//             let temp = arr[i];
//             arr[i] = arr[index];
//             arr[index] = temp;
//         }
//     }
// }

// SelectionSort(unsorted);
// console.log(unsorted);

/**
 * 
 * Binary search
 */

 ////Search for a value in an array - with O(log N) time complexity and O(1) space complexity

//  const arr = [0, 1, 5, 10, 15, 30, 55, 100, 101, 102, 105, 205, 210, 215, 220, 356, 452];


 /**
  * Get length of array
  * Figure out where the middle element is arr.length / 2
  * there must be a max nr of searches according to the formula searches = log2(arr.length)
  * check if that's the value we're searching for
  * if not halve the middle 
  * value we're searching for is < or >
  * repeat until boundaries intersect
  */
//  function binarySearch(arr, value) {
//     let middle, upperBoundary, lowerBoundary;
//     lowerBoundary = 0;
//     upperBoundary = arr.length - 1;
//     while(lowerBoundary <= upperBoundary) {
//         middle = Math.floor((upperBoundary + lowerBoundary) / 2);
//         if(value > arr[middle]) {
//             lowerBoundary = middle + 1;
//         } else if(value < arr[middle]) {
//             upperBoundary = middle - 1;
//         }
//         if(value === arr[middle]) {
//             return value;
//         }
//     } 
//     return -1;
//  }

//  console.log(binarySearch(arr, 9));

/**
 * Quicksort 
 * Original array remains, output = sorted array
 * (O(n) space and O(N logN) time complexity)
 * O(n) space is okay because in this case we're making a new array and leaving the old array
 * Naturally we must take up new O(n) space
 */

/**
 * mergeSort(arr, 0, 8) -> mergeSort(arr, 0, 4), 
 * */



// //outer function to receive an arr
// function mergeSort(arr) {

//   return mergeSort(arr, 0, arr.length - 1);
//   //inner function to implement recursion and pass the arr's parameters
//   //we could instead just have this as the outer func and have to pass 0 and arr.length-1 
//   //but this way the user will just pass an array and not worry about all that
//   function mergeSort(arr, leftIndex, rightIndex) {
//     //we need arraySize because we don't determine the size of the initial array
//     //instead we look at the size of the "chunk" which was sent by looking at 
//     //left and right index
//     let arrSize = rightIndex - leftIndex + 1;
//     if(arrSize > 0) {
//       if(arrSize == 1 ) return [arr[leftIndex]];
//       if(arrSize == 2) {
//         if(arr[leftIndex] > arr[rightIndex]) {
//           return [arr[rightIndex], arr[leftIndex]];
//         } return [arr[leftIndex], arr[rightIndex]];
//       }

//       let leftHalfRightBoundary = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
//       let rightHalfLeftBoundary = leftHalfRightBoundary + 1;
//       let leftSortedHalf = mergeSort(arr, leftIndex, leftHalfRightBoundary);
//       let rightSortedHalf = mergeSort(arr, rightHalfLeftBoundary, rightIndex);

//       //after we return the sorted halves, we need to merge them
//       sortedArray = mergeSortedHalves(leftSortedHalf, rightSortedHalf);

//       return sortedArray;
//     } 
//   }

// }

// //merge 2 already sorted arrays
// //sorting logic: start both from beginning index(0)
// //whichever is smaller, pop it from the array and move it to the sorted array
// //increment counter in the array in which the element was popped
// //if at some point any array is left without elements
// //then if there are remaining elements in the other array, just append them
// //return the result
// function mergeSortedHalves(leftHalf, rightHalf) {
//   // left and right counter indicate how far off we are 
//   // in traversing a sorted array
//   let leftCounter = 0; 
//   let rightCounter = 0;
//   let leftHalfSize = leftHalf.length;
//   let rightHalfSize = rightHalf.length;



//     //this will represent the merged sorted array
//     let newSortedArray = [];

//     //each time we "pop" an element from an array, we increase the counter
//     //if at any time the counter becomes as big as the size of the array
//     //that naturally means we sorted all elements from that array. at that point, we exit the loop
//     while((leftCounter < leftHalfSize) && (rightCounter < rightHalfSize)) {
//       if(leftHalf[leftCounter] < rightHalf[rightCounter]) {
//         newSortedArray.push(leftHalf[leftCounter]);
//         leftCounter++;
//       } else {
//         newSortedArray.push(rightHalf[rightCounter]);
//         rightCounter++;
//       }
//     }

//     //how do we know if there are remaining elements once at least one of the arrays
//     //is completely pushed into the new array? check the counter for that half - if it's smaller than
//     //the corresponding half size, that means there are elements left
//     if(rightCounter < rightHalfSize) {
//       //so there are remaining elements, how to know where to start appending from?
//       //coincidentally, the counter will indicate the index where we will start
//       //we will continue as long as counter 
//       for(let i = rightCounter; i < rightHalfSize; i++) {
//         newSortedArray.push(rightHalf[i]);
//       }
//       //do the same if there are remaning elements in the left half
//     } else if(leftCounter < leftHalfSize) {
//       for(let i = leftCounter; i < leftHalfSize; i++) {
//         newSortedArray.push(leftHalf[i]);
//       }
//     }

//     //finally, return the sorted array
//     return newSortedArray;
  
// }

// //testing mergeSortedArrays function
// let arr1 = [10];
// let arr2 = [5];

// console.log(mergeSortedHalves(arr1, arr2));

// // test mergeSort

// const arr = [5, 10, 30, 2, 8, 1, 6, 0, 4];

// console.log(mergeSort(arr));
// console.log(arr);

/**
 * What is the time complexity of pushing an element to an array?
 * Take into account different kinds of arrays we might encounter
 * pushing => append to the end
 */

/**
 * What is the worst runtime(time complexity) of calculating all possible
 * routes between 2 nodes in a graph
 */

/**
 * Calculate the time complexity of the following function
 * 
 */

// function intersection(intArray1, intArray2) {
//   mergeSort(intArray2);

//   let commonNumbers = 0;

//   for(let number of intArray1) {
//     if(binarySearch(intArray2, number)) commonNumbers++;
//   }

//   return commonNumbers;
// }

/**
 * What is the time complexity of recursively
 * calculating fibonacci(n)?
 * 
 * How to optimize it?
 */

//  function fibonacci(n) {
//   if(n == 0) return -1;
//   if(n == 1) return 0;
//   if(n == 2) return 1;

//   return fibonnaci(n-1) + fibonacci(n-2);

//  }

 /**
* What is the time complexity of the following function?
* Assume n is a positive integer
*/

//  function calculate(n) 
// {     
//     for (let i = 1; i <= n; i++) 
//     { 
//         for (let j = 1; j < n; j += i) 
//         { 
//             // Some O(1) task 
//         } 
//     }     
// } 

//To do today: code singly, doubly circular and non-circular linked lists
//implement stack and queue with linked list and array
//implement binary search tree - insert, remove and search
//implement heap tree - each node at nth level has higher values than nodes at nth+1 level 
//implement inorder, postorder, preorder and level order traversals on each

// class SinglyLinkedList {
//   constructor() {
//     this.length = 0;
//     this.head = null;
//     this.tail = null;
//   }

//   _traverse(numberOfNodes) {
//     //traverse the required number of nodes
//     //if the number of nodes to traverse is higher than the actual 
//     //length, just go to tail
//     //this will shorten time complexity of appending to end
//     let traverseNode;
//     let possibleNodeTraversals = this.length - 1;
//     if(possibleNodeTraversals <= numberOfNodes) {
//       //saves us the time needed to traverse if we'll just end up at tail to O(1)
//       //in that case just go to tail
//       traverseNode = this.tail;
//     } else {
//       traverseNode = this.head;
//       while(numberOfNodes > 0) {
//         numberOfNodes--;
//         traverseNode = traverseNode.next;
//       }
//     }

//     //return the reference of node which is at the required destionation
//     return traverseNode;
//   }

//   insert(value) {
//     //just insert value, so it is at the beginning
//     let newNode = {
//       data : value,
//       next : this.head
//     }
//     this.head = newNode;
//     this.length++;

//     //if this was also the first node, then just set tail to also be head
//     if(this.length === 1) {
//       this.tail = this.head;
//     }
//   }

//   remove() {
//     //just remove so remove from beginning
//     if(this.head) {
//       this.head = this.head.next;
//       this.length--;
//     }
//   }

//   insertAt(position, value) {
//     //if there are no elements just do the default insert
//     if(this.length === 0) {
//       this.insert(value);
//       return;
//     }

//     //insert at certain position
//     //for this purpose, position should be > 1
//     //position 1 indicates after inserting, the node which we inserted will be Node 1(first node is #1)

//     //let's get to the right place with the function we implemented
//     //we need to be ahead of the place we're traversing. so number of nodes to traverse is 
//     //equal to position - 1
//     let traverseNode = this._traverse(position - 2);

//     let newNode = {
//       data : value,
//       next : null
//     }

//     if(traverseNode.next) {
//       //if we're not at end
//       newNode.next = traverseNode.next;
//       traverseNode.next = newNode;
//     } else {
//       //we're at tail
//       traverseNode.next = newNode;
//       this.tail = newNode;
//     }
//     this.length++;
//   }

//   removeAt(position) {

//     //if it's empty or just 1 element do the normal remove or notify about empty list
//     if(this.length === 0) {
//       console.log(`Can't remove from empty list`);
//       return;
//     }
//     if(this.length === 1) {
//       this.remove();
//       return;
//     }

//     //position indicates the number of node to remove
//     //so 2 would remove the 2nd, 4 the 4th node etc.

//     //we have to traverse a bit differently here
//     //to always end up one node ahead of the place we're removing
//     let traversals;
//     if(position > this.length) {
//       traversals = this.length - 2;
//     } {
//       traversals = position - 2;
//     }

//     let traverseNode = this._traverse(traversals);

//     //we're finally at the required place
//     //we have to also see if the next node is tail or not
//     //if it's tail we'll set the tail to the previous node of the tail
//     //otherwise we have to make a connection between the adjacent nodes of the node we are removing
//     if(traverseNode.next) {
//       traverseNode.next = traverseNode.next.next;
//     } else {
//       traverseNode.next = null;
//       this.tail = traverseNode;
//     }
//   }

//   print() {
//     console.log('Printing linked list ------');
//     if(this.length === 0) {
//       console.log('***List empty***');
//       return;
//     };
//     let traverseNode = this.head;
//     console.log(this.head.data);
//     while(traverseNode.next) {
//       traverseNode = traverseNode.next;
//       console.log(traverseNode.data);
//     }
//     console.log('Printing done ------');
//   }

//   search(value) {

//   }
// }

// let mySinglyLinkedList = new SinglyLinkedList();

// mySinglyLinkedList.insert(5);
// mySinglyLinkedList.insert(10);
// mySinglyLinkedList.insert(11);
// mySinglyLinkedList.insertAt(2, 10);

// mySinglyLinkedList.print();
// mySinglyLinkedList.insertAt(2, 4);
// mySinglyLinkedList.removeAt(2);
// mySinglyLinkedList.print();

// class SinglyLinkedListCircular {
//   constructor() {
//     this.length = 0;
//     this.head = null;
//     this.tail = null;
//   }

//   insert(value) {
//     let newNode = {
//       data : value,
//       next : null
//     }
//     if(this.length === 0) {
//       newNode.next = newNode;
//       this.head = newNode;
//       this.tail = newNode;
//     }
//     if(this.length > 0) {
//       newNode.next = this.head;
//       this.head = newNode;
//       this.tail.next = this.head;
//     }
//     this.length++;
//   }

//   insertAt(position, value) {
//     if(position === 1) {
//       this.insert(value);
//       return;
//     }
//     let traverseNode = this._traverse(position - 2);

//     let newNode = {
//       data : value,
//       next : null
//     }

//     //are we at tail? if yes make a new tail and point it to head
//     if(traverseNode !== this.tail) {
//       newNode.next = traverseNode.next;
//       traverseNode.next = newNode;
//     } else {
//       //if not do the standard insert like with non-circular list
//       newNode.next = this.head;
//       this.tail.next = newNode;
//       this.tail = newNode;
//     }
//     this.length++;
//   }

//   remove() {
//     //just remove assumes remove from beginning
//     if(this.length === 0) {
//       console.log(`Can't remove from empty list`);
//       return;
//     }
//     if(this.length === 1) {
//       this.length = 0;
//       this.head = this.tail = null;
//       return;
//     }
//     this.head = this.head.next;
//     this.tail.next = this.head;
//     this.length--;
//   }

//   removeAt(position) {
//     if(this.length === 0) {
//       console.log(`Can't remove from empty list`);
//       return;
//     }
//     if(position === 1) {
//       this.remove();
//       return;
//     }

//     let traversals = position - 2;
//     if(traversals > (this.length - 2)) traversals = this.length-2;
//     let traverseNode = this._traverse(traversals);

//     if(traverseNode.next !== this.tail) {
//       //we're in between 2 nodes
//       traverseNode.next = traverseNode.next.next;
//     } else {
//       //we're in front of tail
//       traverseNode.next = this.head;
//       this.tail = traverseNode;
//     }
//     this.length--;
//   }

//   print() {
//     console.log(`Printing list----------`);
//     if(this.length === 0) {
//       console.log(`Empty list`);
//       return;
//     }
//     let traverseNode = this.head;
//     console.log(traverseNode.data);

//     //there was just 1 element, return
//     if(this.length === 1) return;

//     //otherwise let's keep going
//     let traversals = this.length - 1;
//     while(traverseNode.next && traversals > 0) {
//       traversals--;
//       traverseNode = traverseNode.next;
//       console.log(traverseNode.data);
//     }
//     console.log(`End----------`);
//   }

//   testCircularity() {
//     if(this.head === this.tail.next) console.log(`List is circular`);
//     else console.log(`List isn't circular`);
//   }

//   // _ indicates a private function
//   _traverse(numberOfNodes) {
//     let traverseNode = this.head;
//       if((this.length - 1) <= numberOfNodes) {
//         traverseNode = this.tail;
//       } else {
//         while(numberOfNodes > 0) {
//           numberOfNodes--;
//           traverseNode = traverseNode.next;
//         }
//       }
//       return traverseNode;
//   }

// }


// //Testing
// let mySinglyLinkedListCircular = new SinglyLinkedListCircular();
// mySinglyLinkedListCircular.insert(5);
// mySinglyLinkedListCircular.insert(10);
// mySinglyLinkedListCircular.insert(11);



// //test insert at, print and see if it's still circular
// mySinglyLinkedListCircular.insertAt(4, 3);
// mySinglyLinkedListCircular.print();
// mySinglyLinkedListCircular.testCircularity();

// //remove at a certain position, print and test if it's still properly circularž

// mySinglyLinkedListCircular.removeAt(3);
// mySinglyLinkedListCircular.print();
// mySinglyLinkedListCircular.testCircularity();


/**
 * Doubly linked list circular
 * with head, tail, length
 * and optimization for inserting to max O(n/2)
 */
class DoublyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  insert(value) {
    let newNode = {
      data : value,
      next: null,
      previous: null
    }
    if(this.length === 0) {
      this.head = this.tail = newNode;
    }
    if(this.length > 0) {
      newNode.next = this.head;
      this.head.previous = newNode;
      this.head = newNode;
    }
    this.length++;
  }

  remove() {
    if(this.length === 0) {
      console.log('List is already empty.');
      return;
    } 
    if(this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.previous = null;
    }
    this.length--;
  }

  insertAt(position, value) {

    if(this.length === 0) {
      this.insert();
      return;
    }

    //so if the position given is bigger than list size just append  to end
    if(position > this.length) {
      let newNode = {
        data : value,
        next : null,
        previous : this.tail
      }
      this.tail.next = newNode;
      this.tail = newNode;
      return;
    }

    //since we're talking about a doubly linked list there can be
    //2 possible directions, by default it's towards right but if the 
    //position we're talking about is bigger than half the size then we will "come in" from the right side
    //that means direction is 'L' which means left
    //this will save time in traversing the node to worse case of O(n/2)
    let direction = 'R';
    if(position > Math.round(this.length / 2)) direction = 'L';

    //number of required traversals to get 1 position "in front of" where we need to insert
    let traversals;
    let newNode = {
      data : value
    }
    if(direction === 'R') {
      traversals = position - 2;
      let tN = this._traverse(traversals, 'R');
      //we're finally at the required position so do the insert
      newNode.next = tN.next;
      newNode.previous = tN;
      tN.next.previous = newNode;
      tN.next = newNode;
    } else if(direction === 'L') {
      traversals = this.length - position - 1;
      let tN;

      if(traversals > 0) {
        tN = this._traverse(traversals, 'L');
      } else {
        tN = this.tail;
      }

      let newNode = {
        data : value
      }
      newNode.previous = tN.previous;
      newNode.next = tN;
      tN.previous.next = newNode;
      tN.previous = newNode;
      this.length++;
    }
  }

  removeAt(position, value) {

  }

  _traverse(numberOfNodes, direction) {
    if(direction === 'R') {
      let tN = this.head;
      while(numberOfNodes > 0) {
        tN = tN.next;
      }
    } else if(direction === 'L') {
      let tN = this.tail;
      while(numberOfNodes > 0) {
        tN = tN.previous;
      }
    }
  }

  print() {
    console.log(`Printing linked list: ------`);
    if(this.length === 0) {
      console.log(`***List empty***`);
    }
    if(this.length > 0) {
      console.log(`Length: ${this.length}`)
      let tN = this.head;                          
      console.log(tN.data);
      while(tN.next) {
        tN = tN.next;
        console.log(tN.data);
      }
    }
    console.log(`End: ------`);
  }

  printBackwards() {
    console.log(`Printing linked list backwards: ------`);
    if(this.length === 0) {
      console.log(`***List empty***`);
    }
    if(this.length > 0) {
      console.log(`Length: ${this.length}`)
      let tN = this.tail;
      console.log(tN.data);
      while(tN.previous) {
        tN = tN.previous;
        console.log(tN.data);
      }
    }
  }

  search(value) {
    
  }
}

myDoublyLinkedList = new DoublyLinkedList();

myDoublyLinkedList.insert(5);
myDoublyLinkedList.insert(10);
myDoublyLinkedList.insert(4);

myDoublyLinkedList.insertAt(3, 8);
myDoublyLinkedList.print();
myDoublyLinkedList.printBackwards();

/**
 * Doubly linked list circular
 */
