/**
 * @param {number[]} height
 * @return {number}
 */
// var trap = function (height) {


/*
 * --- First solution ---
 * O(n^2)
 * Treat the array as a 2D array by processing a single layer at a time
 * 
 * Pair the walls off, increment the waterTotal for each 0 found
 * Decrementing the values by one on each pass, then break if only 0's left
 */
//   // absolute total number of zeroes set to 0
//   // Loop through height array until we find only zeroes
//   let i = 0;
//   let waterTotal = 0;
//   let waterLevel = 0;
//   let wall = null;

//   // For each level
//   while (i < height.length) {
//     // console.log(i, height.length);
//     // Reset flag on new level
//     if(i === 0) {
//       wall = null;
//       waterLevel = 0;
//       // console.log('level:', height);
//       // console.log(i, height[i], waterLevel, waterTotal);
//     }

//     // If a wall is found
//     if (height[i]) {
//       // Start tracking water it's adjacent to
//       wall = true;
//       // Add water before this wall to total
//       waterTotal += waterLevel;
//       waterLevel = 0;
//       // Decrement the height for next iteration
//       height[i]--;
//     }
//     // If previous wall defined and water
//     else if (wall && height[i] === 0) {
//       // increment total zeroes found
//       waterLevel++;
//     }
//     // If at end of array and a wall was found
//     if (i === height.length - 1 && wall) {
//         // Don't loop if only zeroes were found
//         // console.log('reseting level');
//         i = 0;
//     } else {
//       i++;
//     }
//   }
//   // Return absolute total number of zeroes
//   return waterTotal;
// };
//[0, 0, 0, 1, 0, 0, 0, 2, 1, 0, 1, 0]


// const trap = (height) => {

//   const calcVolume = (firstWallIndex, secondWallIndex, subVolume) => {
//     let minHeight = Math.min(height[firstWallIndex], height[secondWallIndex]);
//     let dist = Math.abs(firstWallIndex - secondWallIndex) - 1;
//     // Calculate the total possible volume between these two walls (if all values in between are 0's)
//     let totalSubVolume = dist * minHeight;
//     // Subtract all of the volumes inbetween the walls for the actual total volume
//     console.log(firstWallIndex, secondWallIndex, dist, subVolume);
//     return totalSubVolume - subVolume;
//   }

//   // All water trapped
//   let waterTotal = 0;
//   // Total volume between two walls, assuming all volumes inbetween are 0's
//   let subVolume = 0;
//   // current wall height
//   let currWallIndex = 0;
//   // highest wall found
//   let highestFoundIndex = -1;
//   let i = 1;

//   // key is the index of a wall
//   // value is the subVolume b/w the currWallIndex and this wall
//   const walls = {};

//   while (i <= height.length) {
//     // If we hit the end of the array
//     if(i === height.length) {
//       // If the last wall was already paired
//       if(currWallIndex === height.length - 1) {
//         break;
//       }
//       // Pair with the highest found wall, and subtract volume stored b/w them
//       i = highestFoundIndex;
//       waterTotal += calcVolume(currWallIndex, i, walls[highestFoundIndex]);
//       currWallIndex = i;
//       highestFoundIndex = -1;
//       subVolume = 0;
//     }
//     // If a wall to pair with current wall is found
//     else if (height[currWallIndex] <= height[i]) {
//       // Get the volume between the two walls
//       waterTotal += calcVolume(currWallIndex, i, subVolume);
//       // New wall we want to find a pair with
//       currWallIndex = i;
//       subVolume = 0;
//       highestFoundIndex = -1;
//     } 
//     else {
//       // Keep track of highest found wall
//       if(highestFoundIndex === -1 || height[i] > height[highestFoundIndex]) {
//         highestFoundIndex = i;
//       }
//       // Create an entry for this wall
//       walls[i] = subVolume;

//       // The walls and water have the same width, so we can keep track
//       // of the smaller walls and remove their volumes from total
//       subVolume += height[i];
//     }
//     i++;
//   }

//   return waterTotal;
// }

//console.log(trap([5,5,1,7,1,1,5,2,7,6])); //23
//console.log(trap([2, 0, 2])) // 2
//console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])) // 6
//console.log(trap([4, 2, 0, 3, 2, 5])); // 9


// O(2n) -> O(n)
// Given an array of numbers representing the elevation of walls
// Return the total volume of water that can be inbetween those walls

/**
 * Passes through the parameter once in each direction
 * 
 * Pair a wall with another wall if it's at least as tall
 * calculate the total possible volume of water b/w those walls
 * Subtract the stored height (volumes) occupied by the walls
 * inbetween the paired walls for the actual total water b/w the paired walls
 * 
 * Do the same thing backwards, except only pair with a wall
 * that is *greater*, otherwise the volume b/w two same-height
 * walls will be calculated twice (once per pass).
 * 
 * @param {*height array of numbers representing elevation} height 
 * @returns The total water held between those elevations
 */
const trap = (height) => {

  // Need at least 3 walls to hold water
  if (height.length <= 2) {
    return 0;
  }

  let totalWater = 0;
  // First wall to pair
  let currWallIndex = 0;
  // Sum of wall heights found after current wall (also the volume!)
  let wallSums = 0;

  // iterate through the entire array, starting at 1
  for (let i = 1; i < height.length; i++) {
    // if the number at i is at least the height of the current wall
    if (height[currWallIndex] <= height[i]) {
      // calculate the total spaces b/w the two indexes, and multiply by the min wall height
      let absoluteVolume = (i - currWallIndex - 1) * height[currWallIndex];
      // subtract the walls found inbetween these two walls from the absolute volume
      // add sum to total water found
      let water = absoluteVolume - wallSums;
      // console.log(`water b/w walls ${height[currWallIndex]} and ${height[i]}: ${water}`);
      totalWater += water;
      wallSums = 0;
      currWallIndex = i;
    } else {
      // add wall height to wall height sum
      wallSums += height[i];
    }
  }

  // set the current wall height to the wall at the end of the array
  // reset the wall height sum
  wallSums = 0;
  currWallIndex = height.length - 1;
  // iterate from the end of the array to the start
  for (let i = height.length - 2; i >= 0; i--) {
    // if the number at i is GREATER than the current wall 
    // (don't want to count the volume b/w two same height walls twice)
    if (height[currWallIndex] < height[i]) {
      // calculate the total spaces b/w the two indexes, and multiply by the min wall height
      let absoluteVolume = (currWallIndex - i - 1) * height[currWallIndex];
      // subtract the walls found inbetween these two walls from the absolute volume
      // add sum to total water found
      totalWater += absoluteVolume - wallSums;
      wallSums = 0;
      currWallIndex = i;
    } else {
      // add wall height to wall height sum
      wallSums += height[i];
    }
  }

  // return the total water found
  return totalWater;
}



/**
 * Passes through the parameter once in each direction
 * 
 * Pair a wall with another wall if it's at least as tall
 * calculate the total possible volume of water b/w those walls
 * Subtract the stored height (volumes) occupied by the walls
 * inbetween the paired walls for the actual total water b/w the paired walls
 * 
 * Do the same thing backwards, except only pair with a wall
 * that is *greater*, otherwise the volume b/w two same-height
 * walls will be calculated twice (once per pass).
 * 
 * @param {*height array of numbers representing elevation} height 
 * @returns The total water held between those elevations
 */
// const trap = (height) => {
  
//   let totalWater = 0;

//   // Given the start index, loop condition, stepper, and wall comparison function
//   // Return the volume of water b/w two indicies
//   const calculateVolumes = (start, cond, dir, compFunc) => {
//     let water = 0;
//     // First wall to pair
//     let currWallIndex = start;
//     // Sum of wall heights found after current wall (also the volume!)
//     let wallSums = 0;

//     // iterate through the entire array, starting at 1
//     for (let i = dir(start); cond(i); i = dir(i)) {
//       //console.log(i);
//       // if the number at i is at least the height of the current wall
//       if (compFunc(height[currWallIndex], height[i])) {
//         // calculate the total spaces b/w the two indexes, and multiply by the min wall height
//         let absoluteVolume = (Math.abs(i - currWallIndex) - 1) * height[currWallIndex];
//         // subtract the walls found inbetween these two walls from the absolute volume
//         // add sum to total water found
//         water += absoluteVolume - wallSums;
//         wallSums = 0;
//         currWallIndex = i;
//       } else {
//         // add wall height to wall height sum
//         wallSums += height[i];
//       }
//     }
//     return water;
//   }

//   // Loop from the start of the array to the end, and end of the array to the start
//   totalWater += calculateVolumes(0, (i) => i < height.length, (i) => ++i, (a, b) => a <= b);
//   //console.log(totalWater);
//   // Wall comp function HAS to be '<', to avoid counting the volume b/w two walls of the same height twice
//   totalWater += calculateVolumes(height.length - 1, (i) => i >= 0, (i) => --i, (a, b) => a < b);
//   //console.log(totalWater);

//   // return the total water found
//   return totalWater;
// }

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
console.log(trap([4, 2, 0, 3, 2, 5])); // 9
console.log(trap([2, 0, 2])); // 2
console.log(trap([5, 5, 7])); // 0
console.log(trap([5, 5, 1, 7, 1, 1, 5, 2, 7, 6])); //23