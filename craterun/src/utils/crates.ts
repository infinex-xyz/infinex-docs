import { ok } from "node:assert";
import prand from "pure-rand";

export const TOTAL_CRATES = 5_000_000;
export const prizeRanges = [
  { id: "none", amount: 2500000 },
  { id: "boost_500", amount: 1691704 },
  { id: "boost_1000", amount: 600000 },
  { id: "boost_10_000", amount: 2000 },
  { id: "boost_100_000", amount: 200 },
  { id: "boost_1_000_000", amount: 5 },
  { id: "patron_ticket", amount: 200000 },
  { id: "patron_pass", amount: 5000 },
  { id: "patron_nft", amount: 1000 },
  { id: "w_10000", amount: 10 },
  { id: "pyth_10000", amount: 10 },
  { id: "eth_32", amount: 1 },
  { id: "sol_200", amount: 1 },
  { id: "jto_2000", amount: 10 },
  { id: "nansen_yearly_subscription", amount: 2 },
  { id: "steth_3", amount: 5 },
  { id: "echo_spots", amount: 20 },
  { id: "lil_pudgy", amount: 10 },
  { id: "sappy_seal", amount: 2 },
  { id: "ezeth_5", amount: 3 },
  { id: "blze_14m", amount: 5 },
  { id: "btrfly_35", amount: 4 },
  { id: "mew_2_6m", amount: 1 },
  { id: "mfer_500_000", amount: 1 },
  { id: "moutai_500_000", amount: 1 },
  { id: "bonk_450m", amount: 1 },
  { id: "mog_7bn", amount: 1 },
  { id: "mother_150_000", amount: 1 },
  { id: "wif_4444", amount: 1 },
  { id: "popcat_15000", amount: 1 },
] as const;

export type PrizeId = (typeof prizeRanges)[number]["id"];
export type PrizeCounts = Partial<Record<PrizeId, number>>;
export type Crate = [number, number];

/**
 * Generate a sequential array of crateId + prizeIndex tuples, e.g. [[0, 0], [1, 0], [2, 1], ... [n - 1, p - 1]]
 * where n is the total number of crates, and p is the total number of prize types.
 *
 * The index of each entry in the returned array doesn't hold any significance (array will be rearranged as crates are opened)
 * Value is a tuple of the crates index in the prize ranges, and the associated prize range index for easy rollups.
 **/
export function generateAllCrates() {
  const allCrates = [] as Crate[];

  for (let p = 0, i = 0; p < prizeRanges.length; p++) {
    for (let a = 0; a < prizeRanges[p].amount; a++, i++) {
      allCrates.push([i, p]);
    }
  }

  ok(
    allCrates.length === TOTAL_CRATES,
    `Expected allCrates.length == ${TOTAL_CRATES}`,
  );

  return allCrates;
}

/**
 * Generate n (= crateAmount) amount of psuedo-random numbers between 0 and remainingCrates
 * Psuedo-random numbers are generated with the randomNumber as the seed.
 */
export function generateEventCrateIndexes(
  randomNumber: `0x${string}`,
  crateAmount: bigint,
  remainingCrates: bigint,
) {
  // https://www.npmjs.com/package/pure-rand
  const prng = prand.xoroshiro128plus(Number(randomNumber));
  return Array.from({ length: Number(crateAmount) }).map((_, i) =>
    prand.unsafeUniformIntDistribution(
      0,
      Number(remainingCrates) - 1 - i,
      prng,
    ),
  );
}

/**
 * Generates list of crates (crate id, prize idx) tuples from the current state (`allCrates`) and an event.
 *
 * Mutates `allCrates` by removing seen crates.
 **/
export function getEventCrates(
  allCrates: Crate[],
  randomNumber: `0x${string}`,
  crateAmount: bigint,
  remainingCrates: bigint,
) {
  const crateIndexes = generateEventCrateIndexes(
    randomNumber,
    crateAmount,
    remainingCrates,
  );

  const currCrates = crateIndexes.map((idx) => {
    const crate = allCrates[idx];

    // Swap-and-pop to replace used crateId (ensure crateId isn't assigned twice)
    allCrates[idx] = allCrates[allCrates.length - 1];
    allCrates.pop();

    return crate;
  });

  return currCrates;
}
