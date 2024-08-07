# Craterun

The following describes how crate rewards are distributed to user addresses transparently and verifiably. Running the provided script will give a summary of the distribution of all crates in the Infinex Craterun campaign. This script uses the same algorithm as the Infinex backend, ensuring that crate distribution is demonstrably fair.

## Overview
The overall flow of a crate opening is as follows:
1. When the user clicks the "Open" button to open a crate, this calls the `requestCrateOpening` function on the Base mainnet [`CrateOpener`](https://basescan.org/address/0x543a9ddd8caeb1eeadcd0a6641949d6f2ffe796a) contract.
1. After this call completes, [Pyth Entropy](https://docs.pyth.network/entropy) will generate a random number and call the `entropyCallback` function on the `CrateOpener` contract.
1. A `RandomNumberProcessed` event will be emitted by the `CrateOpener` contract. This event contains, among other things, the following:
    1. `randomNumber`: The random number generated by Pyth's VRF.
    1. `remainingCrates`: The number of remaining crates prior to this event being processed.
    1. `crateAmount`: The number of crates opened by this event.
1. Then, using the generated `randomNumber` as a seed, a set of pseudo-random numbers will be derived. This set of numbers will be used to draw the crates that the user has won.

---

The script provided in these docs read `RandomNumberProcessed` events on the `CrateOpener` contract to give a complete summary of crate distribution.
### How it works
1. `RandomNumberProcessed` events are fetched from the `CrateOpener` contract, and iterated through sequentially.
1. For each event, using the `randomNumber`, generate `crateAmount` crate indexes, where `crateAmount` is the amount of crates the user has requested to open. These indexes are generated using [xoroshiro128+](https://xorshift.di.unimi.it/xoroshiro128plus.c), seeded by the `randomNumber`. This ensures the generated indexes are deterministic.
1. The generated indexes are used to obtain tuples of crate ID + prize index pairs from a pre-computed sequential array (e.g., `[[0, 0], [1, 0], [2, 1], [3, 1], [4, 2], ..., [n - 1, p - 1]]`), where `n` is the total number of crates (5,000,000) and `p` is the total number of _different_ prizes (30). Each time a tuple is drawn from this array, it is swapped with the last element and popped, preventing it from being drawn again.
1. The prize index from each tuple is used to index into the `prizeRanges` array found [here](./src/utils/crates.ts), revealing the prize that has been won.

The result is a list of crate IDs and record of prize counts, per user.

## Get started

1. Install dependencies

```sh
pnpm install
```

2. Run the script as follows. If an address is omitted, prize counts for all accounts will be output.

```sh
pnpm --silent run open [account address]
```

Example:

```sh
$ pnpm --silent run open '0xB10916E8475B58F80684057ABDA331537E3FD3A8'
Replaying crate open events...
{
  "crateIds": [
    4103797,
    4929852,
    2109376,
    1058428,
    1810111,
    ...
  ],
  "prizeCounts": {
    "boost_500": 20,
    "patron_ticket": 1,
    "none": 24,
    "boost_1000": 7
  }
}
```

By default, the public Base mainnet RPC will be used. You can override this by setting the `BASE_JSON_RPC` environment variable.
