/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {

//  return matrix[0].map((val, column) => matrix.map(row => row[column]).reverse());
  // map this callback function to each element of the first row
     // map this callback function to each 
  // matrix[0].map((val, index) => {
  //   console.log(val, index);
  //   return matrix.map(row => {
  //     console.log(row[index]);
  //     return row[index]}).reverse()})

  const reverse90Num = (i, j) => {
    return [matrix.length - 1 - j, i];
  }
  for(let i = 0; i < Math.ceil(matrix.length/2); i++) {
    for(let j = i; j < matrix.length - 1 - i; j++) {
      let second = reverse90Num(i, j);
      let third = reverse90Num(...second);
      let fourth = reverse90Num(...third);
      [matrix[i][j],matrix[second[0]][second[1]], matrix[third[0]][third[1]], matrix[fourth[0]][fourth[1]]]
      = [matrix[second[0]][second[1]], matrix[third[0]][third[1]], matrix[fourth[0]][fourth[1]], matrix[i][j]];
    }
  }
};

// let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
// console.log(matrix);
// //matrix[0].map((val, index) => matrix.map(row => row[index]).reverse())
//rotate(matrix); //[7, 4, 1], [8, 5, 2], [9, 6, 3]
// console.log(matrix);
// let matrix2 = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]];
// console.log(matrix2);
// rotate(matrix2); // [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
// console.log(matrix2);

//[3, 2, 1] []

/*
[0, 0] [2, 0]
[0, 1] [1, 0]
[0, 2] [0, 0]

[1, 0] [2, 1]
[1, 1] [1, 1]
[1, 2] [0, 1]

[2, 0] [2, 2]
[2, 1] [1, 2]
[2, 2] [0, 2]
*/

/*
[0, 0] [2, 0] [2, 2] [0, 2]
[0, 1] [1, 0] [2, 1] [1, 2]

[1, 0] [2, 1] [1, 2] [0, 1]
[1, 1] [1, 1] [1, 1] [1, 1]
*/