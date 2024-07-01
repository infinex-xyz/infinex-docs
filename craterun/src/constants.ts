import { Contract, Interface, JsonRpcProvider } from "ethers";
import CrateOpenerAbi from "../abis/crateOpenerAbi.json";

export function init({
  crateOpenerAddress,
  baseJsonRpc,
}: {
  crateOpenerAddress: string;
  baseJsonRpc: string;
}) {
  const baseProvider = new JsonRpcProvider(baseJsonRpc);

  const crateOpenerContract = new Contract(
    crateOpenerAddress,
    CrateOpenerAbi,
    baseProvider
  );

  return {
    baseProvider,
    crateOpenerContract
  }
}

export const START_BLOCK_NUMBER = 16382094;
export const CRATE_OPENER_ADDRESS = '0x543A9ddd8CAEb1eEAdCD0A6641949d6f2ffE796a'


// Ranges of prizes
export const prizeRanges = [
  { id: 'none', amount: 2500000 },
  { id: 'boost_500', amount: 1691704 },
  { id: 'boost_1000', amount: 600000 },
  { id: 'boost_10_000', amount: 2000 },
  { id: 'boost_100_000', amount: 200 },
  { id: 'boost_1_000_000', amount: 5 },
  { id: 'patron_ticket', amount: 200000 },
  { id: 'patron_pass', amount: 5000 },
  { id: 'patron_nft', amount: 1000 },
  { id: 'w_10000', amount: 10 },
  { id: 'pyth_10000', amount: 10 },
  { id: 'eth_32', amount: 1 },
  { id: 'sol_200', amount: 1 },
  ...Array.from({ length: 69 }).map(
    (_, i) =>
      ({
        id: `community_${i + 1}`,
        amount: 1,
      }) as const
  ),
] as const;


export const crateOpenerInterface = new Interface(CrateOpenerAbi);
