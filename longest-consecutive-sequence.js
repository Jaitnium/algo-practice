/**
 * Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
 * You must write an algorithm that runs in O(n) time.
 * @param {number[]} nums
 * @return {number}
 */

var longestConsecutive = function (nums) {

  // Iterate through nums parameter
  // Convert negative numbers into positive and then insert into negative object
  // Insert positive numbers into positive object
  const negative = {};
  const positive = {};
  nums.forEach((ele) => {
    if (ele < 0) {
      negative[ele * -1] = ele * -1;
    } else {
      positive[ele] = ele;
    }
  });

  let longestSeq = 0;
  let seq = 0;

  // Iterate through the values of the negative object starting at the end
  let negNums = Object.values(negative);
  for (let i = negNums.length - 1; i >= 0; i--) {
    // If this is the first number, or it's conseq with the prev num
    if (i === negNums.length - 1 || negNums[i] + 1 === negNums[i + 1]) {
      seq++;
    }
    // Else sequence is broken
    else  {
      longestSeq = seq > longestSeq? seq : longestSeq;
      seq = 1;
    }
  }

  // and continue through the positive object, keeping track of consecutive nums
  let posNums = Object.values(positive);

  for (let i = 0; i < posNums.length; i++) {
    // Start by checking to see if this is a continuation of a negative sequence
    if (i === 0) {
      if(posNums[0] - 1 !== negNums[0] * -1) {
        longestSeq = seq > longestSeq? seq : longestSeq;
        seq = 0;
      }
      seq++;
    }
    // Else if this is a seq with the prev number
    else if (posNums[i] - 1 === posNums[i - 1]) {
      seq++;
    }
    // Else sequence is broken
    else {
      longestSeq = seq > longestSeq? seq : longestSeq;
      seq = 1;
    }
  }

  // Return longest consecutive sequence found
  return seq < longestSeq ? longestSeq : seq;
};

// console.log(longestConsecutive([])) //0
// console.log(longestConsecutive([7])) //1
// console.log(longestConsecutive([0, -1])) //2
// console.log(longestConsecutive([-4, -2, -5, -8, -15, -3, -1])) // 5
// console.log(longestConsecutive([-2, 3, -3, 4, -1, 2, 5, 1])) // 5
//console.log(longestConsecutive([-11, 0, -2, 1, -3, 9, 7, -1])) // 5

//console.log(longestConsecutive([4,0,-4,-2,2,5,2,0,-8,-8,-8,-8,-1,7,4,5,5,-4,6,6,-3])); // 5
//console.log(longestConsecutive([9,1,-3,2,4,8,3,-1,6,-2,-4,7])); //4

//console.log(longestConsecutive([100,4,200,1,3,2])) //4
// console.log(longestConsecutive([0,3,7,2,5,8,4,6,0,1])) //9