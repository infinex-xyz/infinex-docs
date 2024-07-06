import { openCrates } from "./opener.js";
import { getAddress } from "viem";

process.stderr.write("Replaying crate open events...\n");

const [addressPrizes] = await openCrates();
const accountAddress = process.argv[2] ? getAddress(process.argv[2]) : null;

const result = accountAddress ? addressPrizes[accountAddress] : addressPrizes;

if (!result) {
  process.stderr.write(`Prizes for address not found: ${accountAddress}\n`);
  process.exit(1);
}

process.stdout.write(JSON.stringify(result, null, 2));
