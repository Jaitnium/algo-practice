//Given the root of a binary tree, return the length of the diameter of the tree.

function Node (value) {
  this.value = value;
  this.value = value;
  this.left = null;
  this.right = null;
}

const diameterOfBinaryTree = (root) => {

  const pathsFound = [];

  const traverseTree = (node) => {
    // Base cases
    if (node === null) {
      //console.log('null node')
      return -1;
    }

    // Recursive case
    let leftPath = 1 + traverseTree(node.left);
    let rightPath = 1 + traverseTree(node.right);

    // Store combined paths
    pathsFound.push(leftPath + rightPath);
    // Return only longest
    return Math.max(leftPath, rightPath);
  }
  traverseTree(root);
  return Math.max(...pathsFound);
}

const root = new Node(1);
console.log(diameterOfBinaryTree(root)); // 0
root.left = new Node(2);
console.log(diameterOfBinaryTree(root)); // 1
root.right = new Node(3);
console.log(diameterOfBinaryTree(root)); // 2
root.left.left = new Node(4);
console.log(diameterOfBinaryTree(root)); // 3
root.left.right = new Node(5);
console.log(diameterOfBinaryTree(root)); // 3
root.left.right.right = new Node(7);
console.log(diameterOfBinaryTree(root)); // 4