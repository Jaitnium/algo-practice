
function Node (value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

const invertTree = (root) => {
  // Base case
  if(root === null) {
    return null;
  }

  // Recursive case
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];

  return root;
}

const root = new Node(4);
root.left = new Node(2);
root.right = new Node(7);
root.left.left = new Node(1);
root.left.right = new Node(3);
root.right.left = new Node(6);
root.right.right = new Node(9);

console.log(invertTree(root));