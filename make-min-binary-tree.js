//makeMinBinaryTree - Given a sorted array, find a way to make a binary tree with minimal height

// define a node structure
function node (value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

// recursive function, takes in an array param
const makeMinBinaryTree = (arr) => {
  // if the array is empty, return null
  if(arr === null) return null;
  // if the array is empty, return null
  if(!arr.length) return null;
  // if the array has a single value, return a node w/ that value
  if(arr.length === 1) return new node(arr[0]);

  // select the value at the middle index, create a node from it
  let midIndex = Math.floor(arr.length/2);
  let midNode = new node(arr[midIndex]);
  // recurse on the subarray left of the middle index, and set to node's left
  midNode.left = makeMinBinaryTree(arr.slice(0, midIndex));
  //console.log(midNode.left);
  // recurse on the subarray right of the middle index, and set to node's right
  midNode.right = makeMinBinaryTree(arr.slice(midIndex + 1, arr.length));
  //console.log(midNode.right);

  // return node
  return midNode;
}

const printTree = (node) => {
  if(!node) return;
  console.log(node);
  printTree(node.left);
  printTree(node.right);
}

let root = makeMinBinaryTree([-33, -27, -11, -7, 0, 3, 5, 10, 17, 55, 77]);
printTree(root);