import { defineChain } from 'viem';

// U2U Solaris Mainnet
export const u2uMainnet = defineChain({
  id: 39,
  name: 'U2U Solaris Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'U2U',
    symbol: 'U2U',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-mainnet.u2u.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'U2U Scan',
      url: 'https://u2uscan.xyz',
    },
  },
});

// U2U Network Nebulas Testnet
export const u2uTestnet = defineChain({
  id: 2484,
  name: 'U2U Network Nebulas',
  nativeCurrency: {
    decimals: 18,
    name: 'U2U',
    symbol: 'U2U',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-nebulas-testnet.u2u.xyz'],
      webSocket: ['wss://ws-nebulas-testnet.u2u.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'U2U Testnet Scan',
      url: 'https://testnet.u2uscan.xyz',
    },
  },
  testnet: true,
});

// Default to testnet
export const defaultChain = u2uTestnet;

