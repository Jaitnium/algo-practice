/**
 * Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {

  // Base case
  if(n === 0) {
    return [''];
  }

  //Recursive case
  const subPerms = generateParenthesis(n - 1);
  const results = [];

  subPerms.forEach((perm) => {

    // Before, after, around
    results.push(`()${perm}`);
    results.push(`${perm}()`);
    results.push(`(${perm})`);

    for(let i = 0; i < perm.length; i++) {
      // Insert pair before, around, and after
      if(perm[i] === '(') {
        perm.slice(0, i)
        results.push(`${perm.slice(0, i + 1)}()${perm.slice(i + 1, perm.length)}`)
      }
    }
  })

  return [...new Set(results)];
};

// console.log(generateParenthesis(0)); // ''
// console.log(generateParenthesis(1)); // ()
// console.log(generateParenthesis(2)); // ()(), (())