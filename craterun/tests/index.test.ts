import { describe, expect, test } from "vitest";
import { main } from "../src";
import dotenv from 'dotenv'

dotenv.config();

describe("Craterun Reward Test", function() {
  const { BASE_JSON_RPC, CRATE_OPENER_ADDRESS } = process.env;

  test(
    "Craterun rewards are fully distributed & uniquely distributed",
    async function() {

      const baseJsonRpc = BASE_JSON_RPC || "";
      const crateOpenerAddress = CRATE_OPENER_ADDRESS || "";

      const { rewardsMap, numRemainingCrates } = await main({
        baseJsonRpc,
        crateOpenerAddress
      });

      expect(
        Object.values(rewardsMap).every((arr) => new Set(arr).size === arr.length)
      );

      expect(Object.values(rewardsMap).flat().length).toBe(5_000_000 - numRemainingCrates);
    },
    { timeout: 20_000 }
  );

  test(
    "Craterun rewards are deterministic",
    async function() {
      let prevRewards = null as any;

      // Compare output 5 times to make sure the rewards are deterministic
      for (let i = 0; i < 5; i++) {
        const { rewardsMap } = await main({
          baseJsonRpc: BASE_JSON_RPC || "",
          crateOpenerAddress: CRATE_OPENER_ADDRESS || "",
        });

        if (prevRewards && rewardsMap) {
          expect(rewardsMap).toEqual(prevRewards);
        }
        prevRewards = rewardsMap;
      }
    },
    { timeout: 60_000 }
  );
});
