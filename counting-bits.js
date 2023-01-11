/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
    // If n isn't a number or less than 0, return undefined
    if(typeof(n) !== 'number' || n < 0) return undefined;

    // Base cases
    if(n === 0) return [0];
    if(n === 1) return [0, 1];

    const oneCount = {0 : 0, 1 : 1};

    // Iterate from 0 to n
    for(let i = 2; i <= n; i++) {
       // Determine the closest, lower number that's a factor of 2
       let twoFactor = Math.pow(2, Math.floor(Math.log2(i)));
       // Calculate the offset between that number and n
       let offset = i - twoFactor;
       // Use the offset as a key in oneCount, and sum that value with 1
       // Create a new key:value pair where the key is n, and the new value
       oneCount[i] = oneCount[offset] + 1;
    } 
    return Object.values(oneCount);
};