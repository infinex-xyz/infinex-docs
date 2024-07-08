import {
  createPublicClient,
  http,
  getContract,
  GetContractEventsReturnType,
} from "viem";
import { base } from "viem/chains";
import { CrateOpenerAbi } from "../abis/CrateOpener.js";
import {
  BASE_JSON_PRC,
  BLOCK_CHUNK_SIZE,
  BLOCK_START,
  CRATE_OPENER_ADDRESS,
} from "../config.js";

// This event is emitted when our CrateOpener contract process a random number from pyth, effectively opening crates on chain.
export type RandomNumberProcessedEvent = GetContractEventsReturnType<
  typeof CrateOpenerAbi,
  "RandomNumberProcessed"
>[number];
export { CrateOpenerAbi };

export const client = createPublicClient({
  chain: base,
  transport: http(BASE_JSON_PRC),
});

export const crateOpener = getContract({
  abi: CrateOpenerAbi,
  address: CRATE_OPENER_ADDRESS,
  client,
});

export async function getCrateOpenerEvents(blockRange?: {
  fromBlock?: bigint;
  toBlock?: bigint;
}) {
  const fromBlock = blockRange?.fromBlock ?? BLOCK_START;
  const toBlock = blockRange?.toBlock ?? (await client.getBlockNumber());

  let events: RandomNumberProcessedEvent[] = [];

  for (let i = fromBlock; i <= toBlock; i += BLOCK_CHUNK_SIZE + 1n) {
    events.push(
      ...(await crateOpener.getEvents.RandomNumberProcessed(undefined, {
        fromBlock: i,
        toBlock: BigInt(
          Math.min(Number(i + BLOCK_CHUNK_SIZE), Number(toBlock)),
        ),
      })),
    );
  }

  return events;
}
