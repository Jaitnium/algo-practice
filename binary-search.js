/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var search = function(nums, target) {

  // recursive func def, takes in lower and upper bounds - defined in indexes
  const binarySearch = (lower, upper) => {
     // calculate the middle index between the two bounds
     let mid = Math.floor((lower + upper) / 2);
     // if the value at nums[mid] is the target, return mid
     if(nums[mid] === target) return mid;
     // if out of values evaluate
     if(lower > upper) return -1;

     // if the value is less than the target, the target is on the right side
     if(nums[mid] < target) {
        // return the evaluated result of recursing with the params mid and upper bound
        return binarySearch(mid + 1, upper);
     } else {
        // Else the value is greater than the target, the target is on the left side
        // return the evaluated result of recursing with the params lower and mid bound
        return binarySearch(lower, mid - 1);
     }
  }

  //return the evaluated result of invoking the inner recursive function
  // with the values 0 and nums.length - 1
  return binarySearch(0, nums.length - 1);
};