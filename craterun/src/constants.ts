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

export const TOTAL_NUM_CRATES = 5_000_000;
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
  { id: 'jto_2000', amount: 10 },
  { id: 'nansen_yearly_subscription', amount: 2 },
  { id: 'steth_3', amount: 5 },
  { id: 'echo_spots', amount: 20 },
  { id: 'lil_pudgy', amount: 10 },
  { id: 'sappy_seal', amount: 2 },
  { id: 'ezeth_5', amount: 3 },
  { id: 'blze_14m', amount: 5 },
  { id: 'btrfly_35', amount: 4 },
  { id: 'mew_2_6m', amount: 1 },
  { id: 'mfer_500_000', amount: 1 },
  { id: 'moutai_500_000', amount: 1 },
  { id: 'bonk_450m', amount: 1 },
  { id: 'mog_7bn', amount: 1 },
  { id: 'mother_150_000', amount: 1 },
  { id: 'wif_4444', amount: 1 },
  { id: 'popcat_15000', amount: 1 },
] as const;


export const crateOpenerInterface = new Interface(CrateOpenerAbi);
