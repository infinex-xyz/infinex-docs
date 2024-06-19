import { Contract, Interface, JsonRpcProvider } from 'ethers';
import CrateOpenerAbi from './abi/crateOpenerAbi.json';
import dotenv from 'dotenv';

dotenv.config();

// Ranges of prizes
// e.g. indexes 0 - 2,500,000 is nothing, indexes 2,500,001 - 3,500,000 is sol, etc
export const prizeRanges = [
  {
    id: 1,
    name: 'nothing',
    amount: 2_500_000,
  },
  {
    id: 2,
    name: 'sol',
    amount: 1_000_000,
  },
  {
    id: 3,
    name: 'eth',
    amount: 1_000_000,
  },
  {
    id: 4,
    name: 'milady',
    amount: 500_000,
  },
];

export const CRATE_OPENER_ADDRESS =
  '0x0012C0aDDBE5d369be858E0186FdFCA1F1188300';

export const START_BLOCK_NUMBER = 11465276;

export const baseSepoliaProvider = new JsonRpcProvider(
  process.env.BASE_SEPOLIA_JSON_RPC || ''
);

export const crateOpenerContract = new Contract(
  CRATE_OPENER_ADDRESS,
  CrateOpenerAbi,
  baseSepoliaProvider
);

export const crateOpenerInterface = new Interface(CrateOpenerAbi);
