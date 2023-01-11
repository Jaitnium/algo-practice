
function Node(value) {
  this.value = value;
  this.next = null;
}

// circularHead, node param, visitedObj={}
// const circularHead = (node) => {
//   const visitedObj = {};
//   let ptr = node;
//   let index = 0;

//   while(ptr !== null) {
//     console.log(ptr);
//     if(visitedObj[`${ptr.value}${index}`]) {
//       return ptr;
//     }
//     visitedObj[`${ptr.value}${index++}`] = true;
//     ptr = ptr.next;
//   }
//   return undefined;
// }

// circularHead, node param, visitedObj={}
const circularHead = (node, visitedObj={}) => {
   // Base cases
   // if the node param isn't a node
   if(node === null) {
    // return undefined
    return undefined;
   }

   // if node param is in visitedObj, return the node object
   if(visitedObj[node.value] === node) return node;
   
   // update visitedObj with node param
   visitedObj[node.value] = node;
   // Recursive case
   // return the result of invoking circularHead with the param of node.next and visitedObj
   return circularHead(node.next, visitedObj);
}

//A -> B -> C -> D -> E -> C // C
const head = new Node('A');
head.next = new Node('B');
head.next.next = new Node('C');
head.next.next.next = new Node('D');
head.next.next.next.next = new Node('E');
head.next.next.next.next.next = head.next.next; // C

console.log(circularHead(head));

const head2 = new Node('A');
console.log(circularHead(head2)); // undefined

head2.next = new Node('B');
head2.next.next = head2;
console.log(circularHead(head2)); // A

const head3 = new Node('A');
head3.next = new Node('A');
console.log(circularHead(head2)); // undefined

// function printLL(node) {
//   if(!node) return;
//   console.log(node.value);
//   printLL(node.next);
// }
// printLL(head);