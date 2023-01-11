//--- Day 2: Rock Paper Scissors ---

// Rock(A) is worth 1 point, Paper(B) is 2, Scissors(C) is 3
// Round loss is 0, tie is 3, won is 6
// Total round score for a round is chosen 'shape' + round outcome
// Total score is the sum of all individual round scores

// Given a list of input
// Return the total score if the strategy guide is followed
const parseInput = (input) => {
  const entries = input.split('\n');
  // Filter any empty strings
  return entries.filter((ele) => ele.length);
}

//The score of a particular pair as specified by the rules
const score = { A: { A: 4, B: 8, C: 3 }, B: { A: 1, B: 5, C: 9 }, C: { A: 7, B: 2, C: 6 } };
const translate = { X: 'A', Y: 'B', Z: 'C' };

// Determine the highest score using the strategy guide
const strategyGuideSolution = (entries) => {

  const tally = { A: { X: 0, Y: 0, Z: 0 }, B: { X: 0, Y: 0, Z: 0 }, C: { X: 0, Y: 0, Z: 0 } };
  // Create an object with three keys: A, B, C
  // The values are an object where the keys are X, Y, Z
  // And those values are their number of occurences
  entries.forEach((ele) => {
    if (ele.length !== 0) {
      let pair = ele.split(' ');
      tally[pair[0]][pair[1]]++;
    }
  });

  const calculateScore = (X, Y, Z) => {
    // Given a pair of choices, multiply their occurence by the corresponding score for X
    // (ie. If the player chose the param X the score is 4 * total AX games = total AX score)
    let XTotal = score['A'][X] * tally['A']['X'] + score['B'][X] * tally['B']['X'] + score['C'][X] * tally['C']['X'];
    // Given a pair of choices, multiply their occurence by the corresponding score for Y
    let YTotal = score['A'][Y] * tally['A']['Y'] + score['B'][Y] * tally['B']['Y'] + score['C'][Y] * tally['C']['Y'];
    // Given a pair of choices, multiply their occurence by the corresponding score for Z
    let ZTotal = score['A'][Z] * tally['A']['Z'] + score['B'][Z] * tally['B']['Z'] + score['C'][Z] * tally['C']['Z'];
    return XTotal + YTotal + ZTotal;
  }

  const total = [];
  // If the player chose 'X' as paper, 'Y' as rock, and 'Z' as scissors
  total.push(calculateScore('A', 'B', 'C'));
  // If the player chose 'X' as paper, 'Z' as rock, and 'Y' as scissors
  total.push(calculateScore('A', 'C', 'B'));

  // If the player chose 'Z' as paper, 'Y' as rock, and 'X' as scissors
  total.push(calculateScore('C', 'B', 'A'));
  // If the player chose 'Z' as paper, 'X' as rock, and 'Y' as scissors
  total.push(calculateScore('C', 'A', 'B'));

  // If the player chose 'Y' as paper, 'X' as rock, and 'Z' as scissors
  total.push(calculateScore('B', 'A', 'C'));
  // If the player chose 'Y' as paper, 'X' as rock, and 'Z' as scissors
  total.push(calculateScore('B', 'A', 'C'));

  return Math.max(...total);
}

// Determine the highest score using the strategy guide
const strategyGuideSolutionTwo = (entries) => {
  let total = 0;

  // Given the option the elf chose and the desired outcome for the round
  // Return the resulting score
  const targetScore = (elfChoice, target) => {
    // If the desired outcome is a loss
    if (target === 'X') {
      // Elf chose rock
      if (elfChoice === 'A') {
        // Choose scissors
        return score[elfChoice]['C'];
      }
      // Elf chose paper
      if (elfChoice === 'B') {
        // Choose rock
        return score[elfChoice]['A'];
      }
      // Elf chose scissors
      else {
        // Choose paper
        return score[elfChoice]['B'];
      }
    }
    // If the desired outcome is a draw
    else if (target === 'Y') {
      let playerChoice = elfChoice;
      return score[elfChoice][playerChoice];
    }
    // The desired outcome is a win (Z)
    else {
      // Elf chose rock
      if (elfChoice === 'A') {
        // Choose paper
        return score[elfChoice]['B'];
      }
      // Elf chose paper
      if (elfChoice === 'B') {
        // Choose scissors
        return score[elfChoice]['C'];
      }
      // Elf chose scissors
      else {
        // Choose rock
        return score[elfChoice]['A'];
      }
    }
  }

  // No longer choosing X, Y, or Z. X is loss, Y is draw, Z is win
  for (let entry of entries) {
    pair = entry.split(' ');
    total += targetScore(pair[0], pair[1]);
  }
  return total;
}

let list = `
B Z
C Z
C Z
A Y
B Z
C Y
C Z
C Y
C X
A Z
B Z
C Z
A Y
C Z
B X
C Y
C Z
C X
C X
C Y
C Y
C X
A Y
C Y
C Y
C X
C Z
C X
A X
C Z
C Y
C Z
C Z
C Z
A Z
C Z
B Z
A Y
A X
A Y
C Z
A Y
C Z
A Z
C Y
C Y
C Y
A X
C X
C X
C Y
A X
A Y
C X
A X
C Z
A Y
C Z
C Y
A Y
C Z
A X
A Y
A X
C X
C Z
A X
B Z
C Z
C Y
C X
C X
C Z
C X
C Z
A X
C Y
A Y
C Y
C Z
C X
B X
B Z
C Z
C X
A X
B Z
A Y
A Y
B Z
A Y
C Y
B Z
B X
C X
C X
C X
A X
A Z
A Y
A Y
C Y
C Z
C Z
C Z
A Y
C X
A Y
A X
C X
C X
A X
A Y
A X
A X
A Y
C Y
A Y
A Y
A X
C X
B Z
A X
C Y
C X
C Z
C Z
C Z
C Z
C Y
C X
C X
A X
A Y
A X
C Z
C X
C Y
C Y
C Z
C Z
B Z
C Z
C Y
C X
C Y
A X
A Y
C X
B Z
B Y
C Z
C Y
C X
A Y
C Y
B Z
A Z
C X
C Z
C Y
C X
C Z
A X
A Y
C Y
C Y
A Y
A X
A X
C X
C X
C Z
A Y
A Y
C Y
C Z
A X
A Y
C X
C X
C Y
C X
C Z
C X
C Z
C Z
C Z
C Z
A Y
B Z
C Y
C Z
A Z
C X
C X
A X
A Z
C Z
C X
C Z
A X
B Z
B Z
A X
C X
C X
B Z
B Z
B Z
C Z
C X
A Y
C Z
A X
C Y
C Z
C Z
C X
C X
C Z
C Y
C Y
C X
C X
A X
C Y
A X
C Y
C X
B X
B Z
C X
C X
B X
C Z
C Y
A X
C Z
C Z
C Z
C Y
C X
A Y
A Z
C Z
B Z
C Z
C X
A Y
C X
C X
A X
C X
C Z
A X
C Z
C Y
C Y
C Y
C Z
A X
C Y
C X
C Z
A X
C Z
C X
C X
C X
A Y
C Z
A Y
C Z
C Y
C Z
A Y
C X
C X
C X
C Y
C Z
C X
C Y
C X
A X
C X
C Y
C X
C Z
C X
B Z
C X
B Z
B X
C X
C X
C X
B X
A Y
A Y
A X
B Z
C X
A Z
C Y
C X
C X
C Y
A Y
A Z
C X
A Y
C Z
C X
C X
C Y
C Y
A Z
A X
C Z
C X
C Z
B Y
A Y
C Z
A Y
C Z
A X
C Y
C Y
C X
A Y
C X
C X
B X
C Z
C X
C Y
C Z
C Z
C Y
C Y
C Y
C X
B Z
C X
C X
C Y
C Y
C Z
B Z
C X
C Y
B Z
C Z
A Y
C X
C X
A Y
C Y
C Z
C X
A Y
A Y
C Z
C Z
C Z
A X
C X
C Z
C Z
C Z
A Y
A X
C X
C Z
C X
C X
C Y
A Y
C X
C Y
C Z
C Y
A X
C X
C X
C Z
A X
B X
C Y
A X
C Y
C Y
C X
C Z
B X
C X
C Z
A Y
C Z
C X
A X
C Y
A X
C Z
A X
C X
C Y
C X
C Z
C X
C X
C Y
A X
C Y
A Y
C Z
C X
C X
A X
A Z
C X
C X
C Y
B Z
A X
A X
C X
B Z
C Z
A Y
C Y
C Z
C X
A Z
C Y
A X
C Y
C Z
C Z
C X
C Y
C X
C Y
C Y
C X
A Y
B X
C X
A X
A Y
C Y
C Z
C Y
C X
A Y
C Z
C X
C X
A Z
C Y
C Z
A X
C X
C Z
A Y
A X
B X
C Z
B Z
C X
A Z
C Z
A X
A Y
C X
A X
B Z
C X
C Y
C Z
C Y
C Y
C Z
C X
B X
C Y
B Y
C Z
A Y
A Y
C Y
C Z
A X
C Z
C Y
B Z
C X
A X
C X
C X
C Y
C Y
C Z
A Y
C Z
A X
A Y
C X
C Y
C Z
C X
A X
B Z
C Z
A X
C X
C X
C X
B Z
C Z
C Y
B Z
A X
C Z
C Y
A X
C X
B Z
C Y
C X
C Z
C Z
C Z
C X
C Y
B X
A X
B Z
C X
C Y
C Z
C X
C Z
C Z
C Z
C Y
A X
C X
C Z
A X
C X
C Z
B X
C Z
B Z
A Y
A X
C Z
C Z
C Y
C Z
C Y
C Z
A Y
B Z
A Y
C X
A X
A X
A X
B Z
C Z
B Y
C Y
A Y
A Y
C Z
A Y
C Z
C Z
A Y
C Z
C Z
C Z
A Y
C Z
C Z
C Z
C Z
A Y
C Y
A Y
C Y
C X
C X
C Z
C X
C Z
C Y
A X
C Z
B X
C Z
A X
C Z
C Z
C Y
C Z
C Y
C X
C Y
B X
C Z
C X
C Y
A Y
C X
C Z
C X
C Z
C X
A Z
C Z
C X
C X
B Z
C Z
C X
A X
C Y
A Y
C X
C Z
C Z
A Y
A X
B Y
C Y
C Y
C Y
C X
A X
C Z
C Y
C Z
C X
C Z
C Z
C Y
B X
C X
C Z
C X
C X
C Y
A X
B Z
A X
C X
C Z
B Z
A Y
C Y
B Z
C X
A Z
A X
C Z
C Z
C X
A Y
B Y
C X
C Z
B Y
A Y
A Y
C X
A X
C Y
C X
C X
C Z
A X
A X
A X
B Z
C Y
C Z
C X
A X
B Z
C Z
C Z
C X
C X
C X
C X
C Z
C Y
C Z
C Z
C Z
A Y
C Z
C X
C Y
C X
B Y
A Y
C Z
C X
C Z
A X
A X
C Y
C Y
C X
C Z
C Z
C Z
C X
C Z
C X
C Y
C X
C X
C Y
C Y
B Z
C Z
C Z
B Z
C Y
C Z
C Y
B Z
C X
C Z
C Y
C Z
A Y
C Z
B Z
C Z
C X
C X
A Z
C Z
C X
A Y
A Z
A X
C Y
C X
C Z
C X
C X
C Y
C X
C Z
C X
C Y
C Y
C Z
C Y
C Y
C Y
A Z
A Y
C Z
C Y
C Z
C X
A X
C Z
C Z
A Y
C Z
C X
C X
C X
C Z
C X
C Z
C Y
A Z
C Z
C Y
C Z
C X
C Y
C Y
C X
C X
C Z
A Y
C Y
B Z
A Y
C Y
C X
C Z
C X
C Y
C Z
A Y
A X
C Z
B Y
C Y
A X
C Y
C Z
B Z
C Y
C Z
C Z
B Z
C X
A Y
C Z
C X
B Y
B Z
C Z
B Z
C X
A X
A X
B Z
C Z
C Z
C Z
C Y
A Y
C Z
B X
C Y
A Z
C Y
C Y
A Y
C X
C Y
B Z
C X
C X
C X
B Z
C X
B Z
A X
C Y
C Y
A X
C X
A Y
C X
A X
C Z
A X
C X
C X
A Y
C Z
C Z
C X
C X
B Z
A Y
C Y
C X
A Y
C Z
A X
C X
B Z
C X
C X
B X
B X
B Z
C Z
C X
A Y
B Z
B Y
C X
C Z
A Y
C Z
C X
C X
B Z
C X
A Y
A X
A Z
C Z
C Y
B Z
C X
A X
C X
A X
C X
C X
C Z
A X
B Z
C Z
C X
C X
A X
C Z
C X
C X
C Z
C Y
C X
A X
C X
C X
C X
A X
C Z
C Z
C Y
B Z
C X
A Y
C Z
C X
C Y
B X
A X
C X
B Z
C Y
B X
A Y
B X
C Z
C Y
C X
C Z
A Y
A Y
C X
A X
C X
C X
A Y
A X
B X
C Y
A Y
C X
C Z
A Y
C Z
B Z
C Z
A X
C Y
C Y
C Y
A Y
A Z
A Y
C X
C X
A Y
C Y
A X
C Y
A Y
C X
C Y
B Z
C Z
C Z
B X
C Y
B X
A Y
A Y
A X
A Y
C Z
C Z
C Y
B Z
A Z
C X
C Z
A X
C X
C X
C Z
C Y
C X
A Y
C Z
B Z
A Y
A X
C Y
B X
C Z
A Y
C X
C Y
C X
A X
C Z
C Z
C X
C Z
A X
C X
C X
A Z
B Z
A X
C Y
C X
A X
C X
C Z
C Y
A Y
C X
A Y
A X
C Y
A Y
C X
A Y
C X
B Z
C X
C X
C X
C Z
C Z
C Z
B Z
C X
B Z
C X
A X
A Y
A Y
A X
C Y
A X
C Y
A Y
B Z
C X
C X
C Y
C X
C Z
A X
A Y
C Z
A X
C X
C X
B X
C X
A Y
C X
C Z
B Z
A X
B Z
C Y
C Z
C Y
C Y
C X
C Z
C Z
C Z
A X
C X
A X
A Y
A X
C Z
C Z
A Z
C Y
B Z
A X
C Z
C Z
C X
C X
A X
A Z
C Z
C X
C X
C Y
C Y
C Y
A Y
A Y
C Z
A X
C Z
C X
A X
C Y
C Z
C Y
A X
A Y
A X
C Z
B Z
C Z
A X
C X
C Y
C X
C X
C Y
C Z
C Z
C Y
C X
A Y
C Y
C Z
B Z
C Y
C Y
A X
C Z
B Z
C X
B Z
B Z
C Z
C X
C Z
A X
C Z
C X
A Y
A X
A Y
C Z
C Z
C Z
C Z
C X
B Z
C Y
C X
B Z
C X
A X
A Y
C X
A Z
A Y
A X
C Y
C Z
C Y
C Z
B Z
C Y
C X
A Y
B Z
C Z
C Z
C Y
C X
C Z
A Y
C Y
A Y
C Z
B Z
C Z
A X
C Z
C Z
C Y
C X
C Y
A X
C Y
C Z
C X
A X
B Z
C Y
C X
C Z
C Y
A X
C X
A Y
A Y
C X
C Z
C Y
B Z
B X
C Y
C X
C X
C Z
C Y
C X
C Z
C Y
A X
B Y
A X
A Y
C X
A X
A X
A X
C Y
B X
B Z
C Z
C X
C Z
A Y
C Y
C X
B Z
A X
C X
A Y
C X
C X
C X
B Z
C Z
C X
B X
C Z
C Y
C X
C Y
C Z
C Z
C Z
A X
C X
C X
C X
B Z
C Z
A Y
C X
B Z
B Z
A Y
A Y
B Z
C X
C Y
A X
C Y
C X
C Y
C Y
C X
B Z
C Z
C Z
C Z
C Y
A Y
C Z
C Y
A X
C X
C Z
C Y
A Y
C Z
C X
B Z
C X
C Z
C Z
C Y
A X
A Y
C Z
A Y
C Z
C X
C Z
C Z
A X
A X
C X
B Z
B Z
C Y
A Y
C X
C X
C Z
C Z
A Y
C Y
C Z
A X
C X
C Y
A Y
C X
C X
A Z
C X
C Y
C Z
C X
B Z
C X
A X
C Z
C Z
A X
C Z
C Y
C Z
C Z
A Y
C X
C X
C X
C Y
C Z
C X
C X
C Y
B Z
A X
C X
A Y
B Z
A Y
A X
A X
B X
C Y
A Y
C Y
C Z
A X
C X
A Y
A Y
C Z
C X
C Z
C Z
C Z
C Z
A Y
A Y
A X
C X
A Y
C Y
A X
C X
C X
C X
B Z
C Z
B Z
A X
C Z
C Z
C Y
C X
C X
C X
C Y
A Z
B X
B Z
C X
B Z
A X
A Y
C Z
B Y
C X
C X
A Y
C Y
C Y
C Z
C X
A X
B Z
C X
A X
A X
C X
A X
C Y
B X
C Z
C Z
C Z
C Z
C X
C Z
C X
C Z
C Z
A X
C Z
C X
B Z
A Y
C Z
B Z
C Y
C X
C X
C Z
C Y
C X
C Z
C X
B X
C Z
A Y
C X
B Z
A Y
A X
C X
C X
B Z
C Y
C Z
C X
C Z
C Z
C Z
B X
C X
C X
C Y
B Z
A Y
C Y
C Z
A Z
A Y
C Z
C Y
C Y
A X
B Z
B Z
C X
A X
C Z
B Z
C Z
C Y
C Z
C Y
A X
C X
C Y
C X
B X
C Y
A Y
C X
C Z
A Z
C Y
A X
C Z
C Y
B Z
C Y
C Z
A Y
C Z
C X
A Y
C X
C Z
C X
B Z
C X
A X
C Z
C Z
C X
C Z
C X
C Z
C Z
A Z
A X
B Z
B X
C Z
C X
B Z
C X
C Y
C Z
C Z
A X
A X
C Y
B Z
A X
C X
C Z
A Z
A Z
C Z
C Y
C X
C Y
C Z
A Z
A X
A Y
C X
C Z
A Y
C Y
A Y
A X
C Z
C X
C Z
C X
B Z
A Y
C X
A X
C X
B X
C X
A X
C X
A X
C Y
A Y
C X
A Y
C X
C Z
C X
B Z
A X
C Z
A X
C Z
C Z
C Y
C Z
C Y
C X
A Y
C X
A X
C Z
C X
A Y
C Y
C X
C X
C Z
C X
C Y
C X
C X
C X
C X
A Y
A Y
A Y
C Z
C X
B Y
B Y
A Y
C Z
C X
A Y
C Z
C Y
C X
C Z
A X
C Z
C Z
C Y
A X
A X
C Z
C X
C X
C X
C Z
C Z
A Y
C Y
A X
B Z
C Z
C Y
C Z
A X
C Z
C X
C X
A Y
C Z
C X
C Z
C Z
A Y
C Y
C Z
A X
C Y
C Z
A X
C X
A X
C X
C Z
C X
C Z
C Z
C Y
C Y
A Y
C Y
A X
C Y
C X
C Z
C X
A X
C X
A X
A Y
A X
C Z
A X
C Y
C X
A Y
C Z
C Z
C X
B X
C Z
C Y
A Y
B Z
C Y
C X
B Z
C X
A Y
A X
A X
A X
C X
A X
C X
C Z
C X
A X
C Y
A Y
C X
C Z
C X
C Z
C Y
C X
A X
C X
C Y
A Y
A X
B Z
C Y
B Z
C Y
C X
A Y
C X
C Z
C X
C Y
A X
C Y
C Y
C Z
C Y
C X
C Z
C X
C X
C X
C Z
C X
A Y
A Y
C X
C Z
B Z
C X
C Y
C X
C X
C Z
C Z
C X
C X
A Z
A X
C X
B Z
C Z
C Y
C Z
C X
C X
C X
C Z
C X
A X
A X
C Z
C X
A Z
C X
A X
A X
C Z
A X
A Y
C Z
A Z
A Y
C Y
C X
A Y
A X
C Z
C X
A Y
B Z
C Z
A X
C Z
C X
A X
A Y
C Z
C Y
C Z
C Z
B Z
C X
C Z
C Z
C Y
C X
C Z
C X
C X
B Z
B Z
A Y
B X
B Z
C Z
A Z
C Y
C X
C Z
C X
C X
A X
C X
A Y
B X
C Z
C Y
C X
C Z
C Y
C Y
C X
B Z
C X
B Z
C Y
C Y
C Y
C X
C X
A X
A X
A X
C Z
A X
C Z
C X
C Y
C Z
C Y
A Y
C Y
A X
A Y
C Y
C Z
C Z
A Y
C X
C X
A X
C Y
C X
C Y
A X
C X
C Y
C Z
C Z
B Z
A Y
C X
B Z
C Y
A X
C Z
C X
C Z
B X
C Z
C Z
C Z
C X
C Z
C Z
C X
C Z
C Z
B X
A X
C Y
C Z
A Y
C Y
C Z
C Z
C X
A Y
A X
C Y
C Y
A Y
C Z
C X
C X
C X
A Y
C X
B X
C Z
C Z
C X
C Z
C X
A Y
A Z
C Z
C Z
B X
C Y
A Z
A Y
C Z
C X
C Z
C X
A X
A Y
C Y
A X
C Z
C X
C Z
B X
C X
C Z
B Z
C Z
C Y
C Y
A X
C Z
C X
C Y
C Z
C Z
A Y
C Z
C Y
C Y
A X
B Z
C Z
A X
C Y
C Y
C Z
A X
C X
C Z
C X
C X
C Z
C Y
C X
C Z
B Z
C Y
A X
A X
C X
C Z
A X
C X
B Z
C Y
C Z
C Y
C X
C Z
B Y
C X
C Z
A X
C X
A X
C X
C Z
B Z
C Z
C Z
A Z
C Y
C X
A X
C Z
A X
A Y
C X
C Z
C Y
A Y
C Y
C X
A X
C X
C Y
C X
C X
C Z
C Z
C X
C Z
A X
A X
C X
C Z
B Z
A X
C X
C Z
C Y
C X
B Z
C X
C X
C X
B X
C Y
A Y
C Z
A Z
A Y
A Y
C Y
B Z
C Z
C Y
C X
C Z
C X
B Z
B X
A X
A Z
A Y
C Z
C Y
C Y
C X
B Y
C Y
C X
C X
B X
C Y
C Z
B Z
C X
C Y
A Y
C Z
C X
C Z
A X
C Z
A X
A Y
C Y
A Y
C Y
C Z
A X
C Y
C Y
C X
B X
C Z
C X
C Z
C Z
C Z
C X
C Z
C Y
C X
C Y
C X
C X
C X
C X
A Y
C X
A Y
C X
C Z
A X
A Z
C Z
C X
C X
C X
C X
B Z
C Z
C Z
C Y
C X
C Z
C X
B Z
B Z
C Z
C Z
C X
C X
C Z
B Z
C X
A Y
C X
C Z
C X
C Y
C Z
C Z
C X
C Z
A Y
A Y
C X
C Z
C Z
C X
C X
B Z
C X
C Z
C Z
C X
C Z
A X
C Z
B Z
C Z
A Y
C Z
C X
C X
B Z
A Y
C Z
A Y
C Y
A Z
C X
A X
C X
A Y
C Z
C X
C Z
C Z
C X
C Z
A X
B Z
C Y
C Z
C Z
C X
C Z
B Z
C Y
C Z
C Z
A X
B Z
A X
B Z
C X
C Z
A Z
A Z
C X
A X
A X
B Z
A Y
A Y
A Z
C X
C Z
C Z
C X
C X
C X
A X
C X
C Z
C Y
C Z
C X
C Z
C X
A X
A Y
C X
A X
C X
B Z
B Z
B X
C X
A X
B X
C X
A Y
C Z
C Y
C Z
C X
A X
A Y
C Z
B Z
C X
B Z
C Z
B Z
A X
A X
C Y
B Z
C X
B Z
A Y
C Z
A Y
C Z
C X
A Z
C Z
C Z
B Z
A Y
B Z
C Y
C X
A Y
A X
A X
C X
C Y
B Z
C X
C Z
C Z
A X
A Y
C X
C Y
B Z
C Z
C X
A X
C Z
C X
C X
B Z
C Y
A Y
A X
C Z
B Z
C X
C Z
A Y
C X
B Z
C Y
B X
C X
C X
C Y
A Y
A X
C Y
C Y
C Z
C Y
C Y
C X
B X
C X
A Y
C Z
C Z
A Y
C Z
C Z
C Z
C Z
C Z
C Y
A Y
C Z
A X
C Y
C Z
C X
C Z
C X
A Z
C X
A Y
B Y
B Z
A Y
A Y
C Z
C X
B Z
B X
B Y
C X
C Z
B Z
A X
C X
C X
C Y
A X
C Z
C Y
A Y
A X
A X
B X
A Y
C Y
C Z
C Z
C X
C X
A X
C Z
A Z
A Y
A X
C X
A Y
B Z
C X
C Z
C Y
C Z
C Z
C X
C Z
A X
A Y
C X
C X
C X
C Z
C Y
C Z
B Z
C Z
B Z
A Y
A X
C Z
C X
C Z
C X
A X
C Z
C Z
C X
C X
C Z
A Y
A Z
A Y
C Z
C Z
C X
C Y
C X
C Y
A X
C X
A Y
B Z
B Z
C X
C X
C Z
C X
A Y
A Z
A Y
C X
C Z
A Y
C Y
C Z
B Z
A X
C X
C Z
C Z
A Y
A Y
A Y
A Y
C X
B Z
A Z
B X
A X
B X
C Z
C Z
C Z
B Z
A Y
C Z
C Y
C X
C Y
A Y
C X
C Y
C Y
A X
C Y
C X
C X
C X
C X
A Y
A Y
C X
C Z
C Z
A Y
C Z
A Y
C Z
C Z
C X
C X
C Z
C Y
C Z
A X
A X
C Y
B Z
A X
B Z
B Z
C X
C Z
C Y
A X
C Z
C Y
C Z
C Y
A Y
B X
C Y
C Y
C X
C X
C Z
C Z
C X
A Y
C Z
B Z
C Y
C X
C Y
C Z
C X
A X
A Y
C Z
B Z
C X
C Z
C X
C Z
C X
A X
C Z
A X
B Z
C X`;

let entries = parseInput(list);
console.log(strategyGuideSolution(entries));
console.log(strategyGuideSolutionTwo(entries));