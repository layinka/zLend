import { Chain } from "viem"


export const dChainTestnet = {
    id: 2713017997578000,
    name: 'DChain Testnet',
    network: 'dchain',
    nativeCurrency: {
      decimals: 18,
      name: 'ETH',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: ['https://dchaintestnet-2713017997578000-1.jsonrpc.testnet.sagarpc.io'] },
      default: { http: ['https://dchaintestnet-2713017997578000-1.jsonrpc.testnet.sagarpc.io'] },
    },
    blockExplorers: {
      etherscan: { name: 'Saga', url: 'https://dchaintestnet-2713017997578000-1.testnet.sagaexplorer.io' },
      default: { name: 'Saga', url: 'https://dchaintestnet-2713017997578000-1.testnet.sagaexplorer.io/' },
    },
    contracts: {
      multicall3: {
        address: '0x2F91F4B170F0D4897FdD24A94833F3485ed3372a',
        blockCreated: 1559859,
      },
    },
  } as  Chain
  
  export const ganache = {
    id: 1337,
    name: 'Ganache',
    network: 'ganache',
    nativeCurrency: {
      decimals: 18,
      name: 'ETH',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: ['http://127.0.0.1:7545'] },
      default: { http: ['http://127.0.0.1:7545'] },
    },
    // blockExplorers: {
    //   etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    //   default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    // },
    // contracts: {
    //   multicall3: {
    //     address: '0xca11bde05977b3631167028862be2a173976ca11',
    //     blockCreated: 11_907_934,
    //   },
    // },
  } as  Chain

