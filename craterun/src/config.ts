import dotenv from "dotenv";
import { Address } from "viem";

dotenv.config();

export const BASE_JSON_PRC =
  process.env.BASE_JSON_RPC ?? "https://mainnet.base.org";
export const CRATE_OPENER_ADDRESS =
  (process.env.CRATE_OPENER_ADDRESS as Address) ??
  "0x543A9ddd8CAEb1eEAdCD0A6641949d6f2ffE796a";

export const BLOCK_START = 16382094n;
export const BLOCK_CHUNK_SIZE = process.env.BLOCK_CHUNK_SIZE
  ? BigInt(process.env.BLOCK_CHUNK_SIZE)
  : 1000n;
