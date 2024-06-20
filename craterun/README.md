# Craterun Docs
The Infinex Craterun documentation providers an overview of how crate rewards are distributed to user addresses transparently and verifiably. Running the provided script will give a summary of the distribution of all crates in the Infinex Craterun campaign. This script uses the same algorithm as the Infinex backend, ensuring that crate distribution is demonstrably fair.

## Overview
The overall flow of a crate opening is as follows:
1. The user intiates the process by calling the `requestCrateOpening` function on the `CrateOpener` contract.
2. After the request is submitted, an automated Pyth service will generate a random number, triggering the `RandomNumberProcessed` event on the `CrateOpener` contract.
3. Then, using the generated `randomNumber` as the seed, a set of psuedo-random numbers will be derived. This set of numbers will be used to draw the crates that the user has won.

---

The script provided in these docs read `RandomNumberProcessed` events on the `CrateOpener` contract to give a complete summary of crate distribution.
### How it works
1. Fetch all `RandomNumberProcessed` events from the `CrateOpener` contract, and iterate through each log sequentially.
2. For each log, using the `randomNumber`, generate n amount of crate indexes, where n is the amount of crates the user has requested to open. These indexes are generated using [xoroshiro128+](https://xorshift.di.unimi.it/xoroshiro128plus.c), seeded by the `randomNumber`. This ensures the generated indexes are deterministic.
3. The generated indexes are used to obtain crate IDs from an array of sequential numbers (e.g., `[0, 1, 2, 3, 4, ..., n]`), where `n` is the total number of crates (5,000,000). We call this array `crateIdArray`. Each time a crate ID is drawn, it is swapped with the last crateId in `crateIdArray` and removed from being drawn again.
4.  Each crate ID corresponds to a position in the `prizesArray`, which defines the prizes and their associated crate ID ranges. 
For example:
- Crate IDs 0 to 250,000 hold nothing.
- Crate IDs 250,000 to 300,000 hold ETH.
- And so on.

The result is an array of crate IDs assigned to each address, representing the crates they won. The utility function `getPrizeInRange` maps each crate ID to a specific prize based on the predefined ranges.


## Get started
1. Install dependencies
`npm install` 
2. Run script
 `npm claim`