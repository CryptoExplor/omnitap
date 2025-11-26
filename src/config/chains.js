// Chain configurations
const chains = [
  {
    id: 1,
    name: 'Ethereum',
    symbol: 'ETH',
    rpcUrl: process.env.ETH_RPC_URL || '',
    blockExplorer: 'https://etherscan.io',
    color: '#627eea'
  },
  {
    id: 8453,
    name: 'Base',
    symbol: 'ETH',
    rpcUrl: process.env.BASE_RPC_URL || '',
    blockExplorer: 'https://basescan.org',
    color: '#29b487'
  },
  {
    id: 42161,
    name: 'Arbitrum',
    symbol: 'ETH',
    rpcUrl: process.env.ARBITRUM_RPC_URL || '',
    blockExplorer: 'https://arbiscan.io',
    color: '#2c374b'
  },
  {
    id: 56,
    name: 'Binance Smart Chain',
    symbol: 'BNB',
    rpcUrl: process.env.BSC_RPC_URL || '',
    blockExplorer: 'https://bscscan.com',
    color: '#f0b90b'
  },
  {
    id: 42220,
    name: 'Celo',
    symbol: 'CELO',
    rpcUrl: process.env.CELO_RPC_URL || '',
    blockExplorer: 'https://celoscan.io',
    color: '#fcff52'
  },
  {
    id: 12345,
    name: 'Monad',
    symbol: 'MON',
    rpcUrl: process.env.MONAD_RPC_URL || '',
    blockExplorer: 'https://monadscan.io',
    color: '#ff6b35'
  },
];

export default chains;