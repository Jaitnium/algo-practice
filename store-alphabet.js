// three strings - the third one is the alphabet
// return which of the first two strings comes first


// assume the letters of the first two strings will ALWAYS be in the alphabet string
// what if the two strings are different lengths?
// what if one of the strings is empty?
// what if the two strings are equal?

const firstWord = (first, second, alphStr) => {

  // Base cases
  if(typeof(first) !== "string" || typeof(second) !== "string") return undefined;
  if(first === '') return second;
  else if (second === '') return first;

  // Create a dictionary from the alphabet string
  // where the value is the index found in alphStr
  const alph = {};
  alphStr.split('').forEach((ele, i) => { alph[ele] = i });

  // Compare letters, where the lower value is a letter that means the word comes first
  let i = 0;
  while (i < first.length && i < second.length) {
    if (alph[first[i]] < alph[second[i]]) return first;
    else if (alph[second[i]] < alph[first[i]]) return second;
    i++;
  }
  // One string is a substring of the other
  if(first.length < second.length) return first;
  else return second;
}

console.log(firstWord("aggc", "aggz", "zgac")); // aggz
console.log(firstWord("", "azgz", "zgac")); // azgz
console.log(firstWord("azgz", "", "zgac")); // azgz
console.log(firstWord("azg", "azgz", "zgac")); // azg