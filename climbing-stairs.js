/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {

  // Base cases
  const cache = {0:0, 1:1, 2:2};

  const perms = (stairs) => {
    // Create cached value if it doesn't exist
    if (!cache[stairs]) {
      // Recursive case
      cache[stairs] = perms(stairs - 1) + perms(stairs - 2);
    }
    // Return cached value
    return cache[stairs];
  }

  return perms(n);
};