/**
 * @param {number[]} nums
 * @return {number}
 */
 var missingNumber = function(nums) {
  // Create an empty object
  let dict = {};
  // Iterate through nums param
  // Populate object with key:value pairs
  nums.forEach((ele) => dict[ele] = true);

  // Iterate from 0 to nums.length + 1
  for(let i = 0; i < nums.length + 1; i++) {
      // If the index i isn't in the empty object, return that value
      if(!dict[i]) {
          return i;
      }
  }
};