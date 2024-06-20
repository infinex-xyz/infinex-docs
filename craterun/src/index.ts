import {
  crateOpenerContract,
  baseProvider,
  START_BLOCK_NUMBER,
} from './constants';
import { generateCrateIds } from './helpers';
import { fetchEvents, calculateRewards } from './functions';

export async function main() {
  const RandomNumberProcessedEvent =
    crateOpenerContract.filters.RandomNumberProcessed();

  // Get current block number
  const END_BLOCK_NUMBER = await baseProvider.getBlockNumber();

  // Generate a sequential array of crateIds, e.g. [0, 1, 2, ... n - 1]
  const crateIdArray = generateCrateIds();

  // Fetch all RandomNumberProcessed events between START_BLOCK_NUMBER and END_BLOCK_NUMBER
  const events = await fetchEvents(
    RandomNumberProcessedEvent,
    START_BLOCK_NUMBER,
    END_BLOCK_NUMBER
  );

  // Calculate user rewards
  return calculateRewards(events, crateIdArray);
}

try {
  const rewards = await main();
  console.log(rewards);
} catch (e) {
  console.error(e);
}
