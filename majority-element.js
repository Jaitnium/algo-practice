var majorityElement = function(nums) {
  // Create tally of each element in nums param
  const tally = {};
  nums.forEach((ele) => tally[ele] ? tally[ele]++ : tally[ele] = 1);
  // Return the number with the most occurences
  return Number(Object.entries(tally).reduce((acc, curr) => acc[1] > curr[1] ? acc : curr)[0]);
};

//console.log(majorityElement([3, 2, 3]))
//console.log(majorityElement([2,2,1,1,1,2,2]))