import { EventLog, Log } from 'ethers';
import prand from 'pure-rand';
import { TOTAL_NUM_CRATES, crateOpenerInterface } from '../constants';

type RewardsMap = {
  [address: `0x${string}`]: number[];
};

type RewardsResult = {
  rewardsMap: RewardsMap
  numRemainingCrates: number
}

// Calculate rewarded crates for each crate holder address
export function calculateRewards(
  events: (Log | EventLog)[],
  crateIdArray: number[],
): RewardsResult {
  const rewardsMap = {} as RewardsMap;
  let numRemainingCrates: number = TOTAL_NUM_CRATES;

  for (const log of events) {
    const parsedLog = crateOpenerInterface.parseLog(log);
    if (!parsedLog) throw new Error(`Failed to parse log: ${log}`);

    const [
      _userRandomBytes,
      _sequenceNumber,
      crateHolderAddress,
      randomNumber,
      crateAmount,
      remainingCrates,
    ] = parsedLog.args;

    // Calculate the number of remaining crates _after_ the crate opening event
    numRemainingCrates = (Number(remainingCrates) - Number(crateAmount))

    // Generate n (= crateAmount) amount of psuedo-random numbers between 0 and remainingCrates
    const indexes = generateCrateIndexes(
      randomNumber,
      Number(crateAmount),
      Number(remainingCrates)
    );

    if (!rewardsMap[crateHolderAddress]) rewardsMap[crateHolderAddress] = [];

    // Assign crates to crate holder addresses using the randomly generated indexes
    rewardsMap[crateHolderAddress] = [...rewardsMap[crateHolderAddress], ...[...indexes].map((index) => {
      const crateId = crateIdArray[index];

      // Swap-and-pop to replace used crateId (ensure crateId isn't assigned twice)
      crateIdArray[index] = crateIdArray[crateIdArray.length - 1];
      crateIdArray.pop();

      return crateId;
    })];
  }

  return { rewardsMap, numRemainingCrates };
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

  const crateIndexes = [] as number[];
  for (let i = 0; i < n; i++) {
    // remainingCrates - 1 - i ensures that the index is within the remaining range
    // remainingCrates should always be > n (the amount of crates the user wants to open)
    const index = prand.unsafeUniformIntDistribution(0, remainingCrates - 1 - i, rng);

    crateIndexes.push(index);
  }

  return crateIndexes;
}
