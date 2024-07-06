export const CrateOpenerAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "_trustedForwarder",
        type: "address",
        internalType: "address",
      },
      {
        name: "_entropy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_entropyProvider",
        type: "address",
        internalType: "address",
      },
      {
        name: "_cratePoints",
        type: "address",
        internalType: "address",
      },
      {
        name: "_totalCrates",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "_entropyCallback",
    inputs: [
      {
        name: "sequence",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "provider",
        type: "address",
        internalType: "address",
      },
      {
        name: "randomNumber",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "acceptOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "authorizedKeepers",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "cratePoints",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IPoints",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "entropy",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IEntropy",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "entropyProvider",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getEntropyFee",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint128",
        internalType: "uint128",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "openingRequests",
    inputs: [
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    outputs: [
      {
        name: "userRandomBytes",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "crateHolder",
        type: "address",
        internalType: "address",
      },
      {
        name: "crateAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "randomNumber",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "processed",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pendingOwner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "remainingCrates",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "requestCrateOpening",
    inputs: [
      {
        name: "_crateHolder",
        type: "address",
        internalType: "address",
      },
      {
        name: "_crateAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_userRandomBytes",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "sequenceNumber",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "setAuthorizedKeeper",
    inputs: [
      {
        name: "_keeper",
        type: "address",
        internalType: "address",
      },
      {
        name: "_authorized",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "CrateOpeningRequested",
    inputs: [
      {
        name: "sequenceNumber",
        type: "uint64",
        indexed: true,
        internalType: "uint64",
      },
      {
        name: "userRandomBytes",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "crateHolder",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "crateAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "KeeperAuthorizationSet",
    inputs: [
      {
        name: "keeper",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "authorized",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "OwnershipTransferStarted",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "RandomNumberProcessed",
    inputs: [
      {
        name: "userRandomBytes",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "sequenceNumber",
        type: "uint64",
        indexed: true,
        internalType: "uint64",
      },
      {
        name: "crateHolder",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "randomNumber",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "crateAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "remainingCrates",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    name: "AlreadyInitialized",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    name: "InsufficientBalance",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    name: "NotEnoughCrates",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    name: "NullAddress",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    name: "ReentrancyGuardReentrantCall",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    name: "RequestAlreadyProcessed",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    name: "Unauthorized",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    name: "WrongFeeAmount",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    name: "ZeroValue",
    inputs: [],
    stateMutability: "nonpayable",
  },
] as const;
