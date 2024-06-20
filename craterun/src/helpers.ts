import { prizeRanges } from './constants';

// Index doesn't hold any significance (array will be rearranged as crates are opened)
// Value is the crates index in the prize ranges above
export function generateCrateIds() {
  const rewards = [] as number[];

  const totalCrates = prizeRanges.reduce((acc, prize) => acc + prize.amount, 0);

  for (let i = 0; i < totalCrates; i++) {
    rewards.push(i);
  }

  return rewards;
}

// Given a number in the prize range, return the prize
export function getPrizeInRange(n: number) {
  const totalCrates = prizeRanges.reduce((acc, prize) => acc + prize.amount, 0);
  if (n > totalCrates - 1 || n < 0) throw new Error('Invalid crate index');

  let lowerBound = 0;

  const prize = prizeRanges.find((prize) => {
    const upperBound = lowerBound + prize.amount;
    if (n >= lowerBound + 1 && n <= upperBound) {
      return true;
    }
    lowerBound = upperBound;
    return false;
  });

  return prize!.name;
}
