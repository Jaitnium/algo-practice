// "Given a list of words, write a program to find the longest word made of other words in the list.
// Example: ['dog', 'cat', 'walker', 'dogwalker'] -> 'dogwalker'"
// O(n!) solution
const longestWord = (words) => {
  // convert the array of words into a dictionary for O(1) lookup
  let possibleWords = words.reduce((prev, curr) => ({...prev, [curr] : true}), {});
  // variable to keep track of longest found so far
  let longestFound = "";
  // every possible permutation of words
  let results = [];
  // Create all possible permutations of words
  const permutations = (arr) => {

    // Always push perm in results if arg isn't empty
    if(arr.length) {
      results.push(arr.reduce((prev, curr) => prev + curr, ""));

      // Base case
      // Return if no more possible perms
      if (arr.length === words.length) {
        return;
      }
    }
    
    // Recursive case
    for(let word of words) {
      permutations([...arr, word]);
    }
  }
  // Create all possible permutations
  permutations([]);

  // Iterate through perms and update longestFound if word is bigger and in possibleWords
  for(perm of results) {
    if(possibleWords[perm] && perm.length > longestFound.length) {
      longestFound = perm;
    }
  }

  // Return longest found
  return longestFound;
}

// func def, takes in an array of strings - similar to "two sum" approach
// O(n^3) solution
const longestWordTwo = (words) => {
  // Remove any dupes because that will ruin solution
  words = Array.from(new Set(words));

  // longest string found so far
  let longestFound = '';

  let wordsCopy = words.slice();
  // For each word
  for(let i = 0; i < wordsCopy.length; i++) {
    // Remove all occurences of word from the rest of the array, but not the current
    // word itself, because a word needs to be made up of other words 
    let currWord = wordsCopy[i];
    for(j = 0; j < wordsCopy.length; j++) {
      if(i !== j) {
        wordsCopy[j] = wordsCopy[j].replace(currWord, '');
      }
    }
  }

  for(let i = 0; i < wordsCopy.length; i++) {
    // Empty indicates it was a word made up of other words in array
    if(wordsCopy[i] === '' && words[i].length > longestFound.length) {
      longestFound = words[i];
    }
  }
  // return longest found
  return longestFound;
}

console.log('output:', longestWordTwo([]));
console.log('output:', longestWordTwo(['cat']));
console.log('output:', longestWordTwo(['dog', 'cat', 'walker', 'dogwalker'])); //dogwalker
console.log('output:', longestWordTwo(['dogwalker', 'dog', 'cat', 'walker'])); //dogwalker
console.log('output:', longestWordTwo(['dogwalker', 'dog', 'catastrophicfailure', 'catastrophicfailure', 'walker'])); //dogwalker
console.log('output:', longestWordTwo(['dogcat', 'dog', 'cat', 'walker', 'walkerdog'])); //walkerdog
console.log('output:', longestWordTwo(['dog', 'cat', 'walker', 'dogcat', 'catdogwalker'])); //catdogwalker
console.log('output:', longestWordTwo(['dog', 'cat', 'dogcat', 'dogwalker', 'catdogwalker'])); //catdogwalker
