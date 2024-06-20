import { EventLog, Log } from 'ethers';
import prand from 'pure-rand';
import { crateOpenerInterface } from '../constants';
import { getPrizeInRange } from '../helpers';

type RewardsArray = {
  [address: `0x${string}`]: number[];
};

// Calculate rewarded crates for each crate holder address
export function calculateRewards(
  events: (Log | EventLog)[],
  crateIdArray: number[]
): RewardsArray {
  const rewardsArray = {} as RewardsArray;

  for (const log of events) {
    const parsedLog = crateOpenerInterface.parseLog(log);
    if (!parsedLog) throw new Error(`Failed to parse log: ${log}`);

    const [
      userRandomBytes,
      crateHolderAddress,
      randomNumber,
      crateAmount,
      remainingCrates,
    ] = parsedLog.args;

    const indexes = generateCrateIndexes(
      randomNumber,
      Number(crateAmount),
      Number(remainingCrates)
    );

    // Assign prizes to crate holder addresses using the randomly generated indexes
    rewardsArray[crateHolderAddress] = [...indexes].map((index) => {
      const crateId = crateIdArray[index];

      // Swap-and-pop to replace used crateId (ensure crateId isn't assigned twice)
      crateIdArray[index] = crateIdArray[crateIdArray.length - 1];
      crateIdArray.pop();

      // return getPrizeInRange(crateId);
      return crateId;
    });
  }

  return rewardsArray;
}

// Generate n (= crateAmount) amount of psuedo-random numbers between 0 and remainingCrates
// Psuedo-random numbers are generated with the randomNumber as the seed.
export function generateCrateIndexes(
  randomNumber: `0x${string}`,
  n: number,
  remainingCrates: number
) {
  // https://www.npmjs.com/package/pure-rand
  const rng = prand.xoroshiro128plus(Number(randomNumber));

  const crateIndexes = new Set<number>();
  for (let i = 0; i < n; i++) {
    const index = prand.unsafeUniformIntDistribution(0, remainingCrates, rng);

    if (crateIndexes.has(index)) {
      i--;
      continue;
    }
    crateIndexes.add(index);
  }

  return crateIndexes;
}
