/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
 var minDepth = function(root) {
  const traverseTree = (node) => {
      // Base case
      if(node === null) return 0;
      if(node.left === null && node.right === null) {
          return 1;
      }
      // Recursive case
      return 1 + Math.min(node.left ? traverseTree(node.left) : Infinity, node.right ? traverseTree(node.right) : Infinity);
  }
  return traverseTree(root);
};