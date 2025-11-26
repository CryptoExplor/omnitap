import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider } from 'wagmi';
import { base, baseSepolia, arbitrum, arbitrumSepolia, bsc, bscTestnet, celo, celoAlfajores } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Get project ID from environment
const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || 'YOUR_PROJECT_ID';

// Define networks
export const networks = [
  baseSepolia,
  base,
  arbitrumSepolia,
  arbitrum,
  bscTestnet,
  bsc,
  celoAlfajores,
  celo
];

// Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false
});

// Create query client
export const queryClient = new QueryClient();

// Create AppKit instance
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'OmniTap',
    description: 'Multichain Counter dApp',
    url: 'https://omnitap.vercel.app',
    icons: ['https://omnitap.vercel.app/logo.svg']
  },
  features: {
    analytics: true,
    email: false,
    socials: []
  }
});

export const config = wagmiAdapter.wagmiConfig;