/**
 * Given an array nums of n integers where nums[i] is in the range [1, n], 
 * return an array of all the integers in the range [1, n] that do not appear in nums.
 * @param {number[]} nums
 * @return {number[]}
 */
 var findDisappearedNumbers = function(nums) {
  // Create an empty object
  const dict = {};
  // Create an empty result array
  const result = [];

  // Iterate through nuns, creating key:value pairs
  nums.forEach((ele) => dict[ele] = true);

  // Loop from 1 to n + 1
  for(let i = 1; i < nums.length + 1; i++) {
     // If the key i doesn't exist in the object
     if(dict[i] === undefined) {
        // Push i into empty array
        result.push(i);
     }
  }

  // Return array
  return result;
};