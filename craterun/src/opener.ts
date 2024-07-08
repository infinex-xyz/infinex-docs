import { ok, equal } from "node:assert";
import type { Address } from "viem";

import { getCrateOpenerEvents } from "./utils/chain.js";
import {
  PrizeCounts,
  TOTAL_CRATES,
  generateAllCrates,
  getEventCrates,
  prizeRanges,
} from "./utils/crates.js";

export async function openCrates(toBlock?: bigint) {
  // generate all crates
  const allCrates = generateAllCrates();

  // fetch all events from the chain up until now
  const events = await getCrateOpenerEvents({ toBlock });

  // replay the crate open events
  const addressCrates = events.reduce(
    (
      addressCrates,
      { args: { crateAmount, remainingCrates, randomNumber, crateHolder } },
    ) => {
      ok(
        !!crateAmount && !!remainingCrates && !!randomNumber && !!crateHolder,
        "Parsed incomplete event",
      );

      // get the opened crates for this event
      const crates = getEventCrates(
        allCrates,
        randomNumber,
        crateAmount,
        remainingCrates,
      );

      equal(
        Number(remainingCrates - crateAmount),
        allCrates.length,
        `Expected crate amount differs`,
      );

      // concat with existing crate ids for this address
      const nextCrateIds = [
        ...(addressCrates[crateHolder]?.crateIds ?? []),
        ...crates.map(([crateId]) => crateId),
      ];

      // aggregate this event's prize counts with the addresses' existing prize counts
      const nextPrizeCounts = crates.reduce((counts, [_, prizeIdx]) => {
        const prizeId = prizeRanges[prizeIdx].id;
        return {
          ...counts,
          [prizeId]: (counts[prizeId] ?? 0) + 1,
        };
      }, addressCrates[crateHolder]?.prizeCounts ?? {});

      // aggregate with all addresses
      return {
        ...addressCrates,
        [crateHolder]: {
          crateIds: nextCrateIds,
          prizeCounts: nextPrizeCounts,
        },
      };
    },
    {} as Record<Address, { prizeCounts: PrizeCounts; crateIds: number[] }>,
  );

  const latestEvent = events[events.length - 1];
  const remainingCrates =
    latestEvent.args.remainingCrates && latestEvent.args.crateAmount
      ? Number(latestEvent.args.remainingCrates - latestEvent.args.crateAmount)
      : TOTAL_CRATES;

  return [addressCrates, remainingCrates] as const;
}
