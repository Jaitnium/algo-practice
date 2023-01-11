//Given a binary tree, check if it is balanced (ie the heights of the two subtrees of any node never differ by more than one.

function Node(value) {
  this.left = null;
  this.right = null;
  this.value = value;
}

const checkBalancedBinaryTree = (root) => {

  if(!(root instanceof Node)) return undefined;

  const traverseLevel = (nodeLevel, previousLevelNull) => {
    const childrenLevel = [];
    let nullNodeFound = false;
    // To avoid shifting which is O(n), simply increment currNodeIndex
    let currNodeIndex = 0;

    if(nodeLevel.length === 0) {
      return true;
    }

    // Process all nodes on this level
    while(currNodeIndex < nodeLevel.length) {
      let currNode = nodeLevel[currNodeIndex++];

      // Not balanced if there was an emtpy node on the previous level
      // And this level has a child node
      if(previousLevelNull && (currNode.left || currNode.right)) return false;

      // Push left into next level to process, or set flag if null
      if(!currNode.left) nullNodeFound = true;
      else childrenLevel.push(currNode.left);

      // Push right into next level to process, or set flag if null
      if(!currNode.right) nullNodeFound = true;
      else childrenLevel.push(currNode.right);
    }

    // Traverse on child level
    return traverseLevel(childrenLevel, nullNodeFound);
  }

  return traverseLevel([root], false);
}

console.log(checkBalancedBinaryTree(false)); //undefined
console.log(checkBalancedBinaryTree(42)); //undefined
let root = new Node(9);
console.log(checkBalancedBinaryTree(root)); //true
root.left = new Node(5)
root.right = new Node(17);
console.log(checkBalancedBinaryTree(root)); //true
root.left.right = new Node(8);
root.right.left = new Node(15);
root.right.right = new Node(22);
console.log(checkBalancedBinaryTree(root)); //true
root.left.right.left = new Node(7)
console.log(checkBalancedBinaryTree(root)); //false