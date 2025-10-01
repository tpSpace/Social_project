import { getDefaultConfig } from '@rainbow-me/rainbowkit';

// U2U Network Nebulas Testnet (Chain ID: 2484)
const u2uTestnet = {
  id: 2484,
  name: 'U2U Network Nebulas',
  nativeCurrency: {
    decimals: 18,
    name: 'U2U',
    symbol: 'U2U',
  },
  rpcUrls: {
    default: { http: ['https://rpc-nebulas-testnet.u2u.xyz'] },
    public: { http: ['https://rpc-nebulas-testnet.u2u.xyz'] },
  },
  blockExplorers: {
    default: { name: 'U2U Testnet Scan', url: 'https://testnet.u2uscan.xyz' },
  },
  testnet: true,
} as const;

export const wagmiConfig = getDefaultConfig({
  appName: 'Hulk-Hub',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'f8b26c35e4294c91a2d5f8b2a1d5c3e7',
  chains: [u2uTestnet],
  ssr: false,
});

