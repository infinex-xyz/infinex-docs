import { DeferredTopicFilter, EventLog, Log } from 'ethers';
import { crateOpenerContract } from '../constants';

// Fetch all RandomNumberProcessed events from the CrateOpener contract
export async function fetchEvents(
  RandomNumberProcessedEvent: DeferredTopicFilter,
  START_BLOCK_NUMBER: number,
  END_BLOCK_NUMBER: number
) {
  const events = [] as (Log | EventLog)[];

  // rpc can only query 10,000 blocks / 5 hours of logs per call
  for (let i = START_BLOCK_NUMBER; i < END_BLOCK_NUMBER; i += 10000) {
    const randomNumberProcessedEvents = await crateOpenerContract.queryFilter(
      RandomNumberProcessedEvent,
      i,
      i + 10000
    );

    events.push(...randomNumberProcessedEvents);
  }

  return events;
}
