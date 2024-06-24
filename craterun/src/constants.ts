import { Contract, Interface, JsonRpcProvider } from "ethers";
import CrateOpenerAbi from "../abis/crateOpenerAbi.json";
import dotenv from "dotenv";

dotenv.config();

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

export const START_BLOCK_NUMBER = 11465276;

// Ranges of prizes
// e.g. indexes 0 - 2,500,000 is nothing, indexes 2,500,001 - 3,500,000 is sol, etc
export const prizeRanges = [
  {
    id: 1,
    name: "nothing",
    amount: 2_500_000,
  },
  {
    id: 2,
    name: "sol",
    amount: 1_000_000,
  },
  {
    id: 3,
    name: "eth",
    amount: 1_000_000,
  },
  {
    id: 4,
    name: "milady",
    amount: 500_000,
  },
];

export const crateOpenerInterface = new Interface(CrateOpenerAbi);
