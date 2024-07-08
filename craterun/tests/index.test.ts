import { describe, expect, test } from "vitest";

import { openCrates } from "../src/opener.js";
import { client } from "../src/utils/chain.js";
import { PrizeCounts, TOTAL_CRATES, prizeRanges } from "../src/utils/crates.js";

describe("Craterun Reward Test", function () {
  test("There are exactly 5_000_000 crates", function () {
    expect(
      Object.values(prizeRanges).reduce((acc, { amount }) => acc + amount, 0),
    ).toEqual(TOTAL_CRATES);
  });

  test(
    "Craterun rewards are fully distributed & uniquely distributed",
    async function () {
      const [addressCrates, remainingCrates] = await openCrates();
      const allCrateIds = Object.values(addressCrates).flatMap(
        (crates) => crates.crateIds,
      );
      const uniqueCrateIds = new Set(allCrateIds);

      expect(
        Object.values(addressCrates).reduce(
          (acc, crates) =>
            Object.values(crates.prizeCounts).reduce(
              (acc, count) => acc + count,
              acc,
            ),
          0,
        ),
      ).toBe(TOTAL_CRATES - remainingCrates);

      expect(allCrateIds.length).toBe(TOTAL_CRATES - remainingCrates);
      expect(allCrateIds.length).toBe(uniqueCrateIds.size);
    },
    { timeout: 1_000_000 },
  );

  test(
    "Craterun rewards are deterministic",
    async function () {
      const toBlock = await client.getBlockNumber();
      let prevPrizes: PrizeCounts | null = null;

      // Compare output 2 times to make sure the rewards are deterministic
      for (let i = 0; i < 2; i++) {
        const [prizeCounts] = await openCrates(toBlock);

        if (prevPrizes && prizeCounts) {
          expect(prizeCounts).toEqual(prevPrizes);
        }

        prevPrizes = prizeCounts;
      }
    },
    { timeout: 1_000_000 },
  );
});
