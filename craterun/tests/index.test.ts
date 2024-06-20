import { describe, expect, test } from 'vitest';
import { main } from '../src';

describe('Craterun Reward Test', function () {
  test(
    'Craterun rewards are deterministic',
    async function () {
      let prevRewards = null as any;

      // Compare output 5 times to make sure the rewards are deterministic
      for (let i = 0; i < 5; i++) {
        const rewards = await main();
        if (prevRewards && rewards) {
          expect(rewards).toEqual(prevRewards);
        }
        prevRewards = rewards;
      }
    },
    { timeout: 30000 }
  );
});
