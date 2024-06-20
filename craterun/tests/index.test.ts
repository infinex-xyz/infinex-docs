import { describe, expect, test } from 'vitest';
import { main } from '../src';

describe('Craterun Reward Test', function () {
  test('Craterun rewards are fully distributed & uniquely distributed', async function() {
    const rewards = await main();
    expect(Object.values(rewards).every(arr => new Set(arr).size === arr.length))

    expect(Object.values(rewards).flat().length).toBe(5_000_000);
  })
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
