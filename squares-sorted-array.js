/**
 * @param {number[]} nums
 * @return {number[]}
 */
// Beats 88.5% in time and 95.54% in space
// let sortedSquares = function (nums) {
//   // 0, 1, 9, 16, 100
//   // Square each number in the array param and then sort in ascending order
//   return nums.map((ele) => Math.pow(ele, 2)).sort((a, b) => a - b);
// };

// Beats 88.5% in time and 95.54% in space
let sortedSquares = function (nums) {
  if(!nums) return null;
  if(!nums.length) return [];

  // Push squared values into their respective array
  // Positives will retain order, while negatives will become positive
  const negatives = []
  const positives = []
  for(let i = 0; i < nums.length; i++) {
    if(nums[i] < 0) {
      negatives.push(Math.pow(nums[i], 2));
    } else {
      positives.push(Math.pow(nums[i], 2))
    }
  }

  // Join the two arrays
  const output = [];
  let i = negatives.length - 1;
  let j = 0;

  while(i >= 0 && j < positives.length) {
    if(negatives[i] < positives[j]) {
      output.push(negatives[i--]);
    } else {
      output.push(positives[j++]);
    }
  }
  // Push any leftovers
  while(i >= 0) output.push(negatives[i--]);
  while(j < positives.length) output.push(positives[j++]);

  return output;
};

console.log(sortedSquares([-4,-1,0,3,10]));
console.log(sortedSquares([-7,-3,2,3,11]));