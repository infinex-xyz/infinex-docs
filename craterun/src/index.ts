import {
  crateOpenerContract,
  baseSepoliaProvider,
  START_BLOCK_NUMBER,
} from './constants';
import { generateCrateIds } from './helpers';
import { fetchEvents, calculateRewards } from './functions';

export async function main() {
  const RandomNumberProcessedEvent =
    crateOpenerContract.filters.RandomNumberProcessed();

  const END_BLOCK_NUMBER = await baseSepoliaProvider.getBlockNumber();
  const crateIdArray = generateCrateIds();

  const events = await fetchEvents(
    RandomNumberProcessedEvent,
    START_BLOCK_NUMBER,
    END_BLOCK_NUMBER
  );

  return calculateRewards(events, crateIdArray);
}

try {
  const rewards = await main();
  console.log(rewards);
} catch (e) {
  console.error(e);
}
