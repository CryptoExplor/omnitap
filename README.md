# 🌐 OmniTap - Multichain Counter dApp

**The ultimate multichain tap-to-earn counter with achievements, leaderboards, and referral rewards!**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://omnitap.vercel.app)

## ✨ Features

### 🎮 Core Gameplay
- ⚡ **No Cooldown** - Tap as fast as you want!
- 🌐 **5 Blockchains** - Base, Arbitrum, BSC, Celo, Monad
- 🔄 **Instant Actions** - Increment or decrement the global counter
- 💰 **Tiny Fees** - 0.000001 ETH/token per tap

### 🏆 Gamification
- 🎖️ **6 Badge Tiers** - Newcomer → Legendary (5000+ taps)
- 🏅 **11 Achievements** - Unlock special milestones
- 🔥 **Daily Streaks** - Keep your streak alive for bonuses
- 📊 **Top 100 Leaderboard** - Per chain + global rankings

### 💸 Rewards
- 👥 **10% Referral Rewards** - Earn from referred users' fees
- 🎁 **Streak Bonuses** - Extra rewards for consistency
- 💎 **NFT Badges** - Coming soon!

### 🔗 Multichain
- Unified leaderboard across all chains
- Seamless chain switching
- Same contracts, same rules, everywhere

## 🚀 Quick Start

### For Users

1. **Visit the dApp**: [omnitap.vercel.app](https://omnitap.vercel.app)
2. **Connect Wallet**: Use any wallet (MetaMask, Coinbase Wallet, WalletConnect)
3. **Select Chain**: Choose from Base, Arbitrum, BSC, Celo, or Monad
4. **Start Tapping**: Increment or decrement the counter!
5. **Earn Rewards**: Build streaks, climb the leaderboard, refer friends

### For Developers

```bash
# Clone repository
git clone https://github.com/yourusername/omnitap.git
cd omnitap

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your keys

# Deploy contracts (per chain)
npm run deploy:base
npm run deploy:arbitrum
npm run deploy:bsc
npm run deploy:celo

# Update src/config/contracts.json with deployed addresses

# Run locally
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

## 📁 Project Structure

```
omnitap/
├── contracts/              # Solidity smart contracts
│   ├── OmniTapCore.sol    # Main logic (no cooldown)
│   └── OmniTapExtensions.sol # Leaderboard & achievements
├── scripts/
│   └── deploy-all.js      # Multi-chain deployment script
├── deployments/           # Generated after deployment
│   ├── base.json
│   ├── arbitrum.json
│   ├── bsc.json
│   └── celo.json
├── src/
│   ├── config/
│   │   ├── chains.js      # Chain configurations
│   │   ├── contracts.json # Contract addresses & ABIs
│   │   └── constants.js   # App constants
│   ├── hooks/             # React hooks
│   ├── components/        # UI components
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── hardhat.config.js
└── vite.config.js
```

## 🔧 Configuration

### Supported Networks

| Network | Chain ID | Testnet | Mainnet |
|---------|----------|---------|---------|
| Base | 84532 / 8453 | ✅ | ✅ |
| Arbitrum | 421614 / 42161 | ✅ | ✅ |
| BSC | 97 / 56 | ✅ | ✅ |
| Celo | 44787 / 42220 | ✅ | ✅ |
| Monad | TBD | 🔜 | 🔜 |

### Badge Tiers

| Tier | Name | Threshold | Emoji |
|------|------|-----------|-------|
| 0 | Newcomer | 0 | 🆕 |
| 1 | Bronze | 10 | 🥉 |
| 2 | Silver | 50 | 🥈 |
| 3 | Gold | 100 | 🥇 |
| 4 | Platinum | 500 | 💿 |
| 5 | Diamond | 1,000 | 💎 |
| 6 | Legendary | 5,000 | 👑 |

## 🛠️ Deployment Guide

### 1. Get API Keys

**Reown (WalletConnect):**
- Visit https://cloud.reown.com
- Create project → Copy Project ID

**Block Explorers:**
- BaseScan: https://basescan.org/apis
- Arbiscan: https://arbiscan.io/apis
- BscScan: https://bscscan.com/apis
- CeloScan: https://celoscan.io/apis

### 2. Deploy Contracts

```bash
# Base Sepolia (Testnet)
npx hardhat run scripts/deploy-all.js --network baseSepolia

# Arbitrum Sepolia
npx hardhat run scripts/deploy-all.js --network arbitrumSepolia

# BSC Testnet
npx hardhat run scripts/deploy-all.js --network bscTestnet

# Celo Alfajores
npx hardhat run scripts/deploy-all.js --network celoAlfajores
```

After each deployment:
1. Deployment info saved to `deployments/<chain>.json`
2. Copy addresses + ABIs to `src/config/contracts.json`

### 3. Verify Contracts

```bash
npx hardhat verify --network baseSepolia  "100000000000000"
npx hardhat verify --network baseSepolia  
```

### 4. Update Frontend Config

Edit `src/config/contracts.json`:
```json
{
  "84532": {
    "chainName": "Base Sepolia",
    "core": {
      "address": "0xYourCoreAddress",
      "abi": [...]
    },
    "extensions": {
      "address": "0xYourExtensionsAddress",
      "abi": [...]
    }
  }
}
```

### 5. Deploy Frontend

```bash
# Build
npm run build

# Deploy to Vercel
vercel --prod

# Or use Vercel GitHub integration
git push origin main
```

## 🎯 How It Works

### Smart Contracts

**OmniTapCore.sol:**
- Increment/decrement counter
- No cooldown restriction
- Referral tracking
- Streak calculation
- Fee collection

**OmniTapExtensions.sol:**
- Top 100 leaderboard
- Achievement unlocking
- Badge tier calculation
- Network statistics

### Frontend Architecture

- **React 18** with hooks
- **Wagmi Core** for blockchain interactions
- **Reown AppKit** for wallet connections
- **Viem** for Ethereum utilities
- **Tailwind CSS** for styling

## 🐛 Troubleshooting

**Contracts won't deploy:**
- Ensure sufficient native token for gas
- Check RPC endpoint is working
- Verify private key is correct

**Wallet won't connect:**
- Clear browser cache
- Update wallet extension
- Try different wallet

**Chain switch fails:**
- Add network to wallet manually
- Check chain ID is correct
- Verify RPC URL works

**Transactions fail:**
- Ensure enough native token for fee + gas
- Check contract addresses are correct
- Verify you're on correct network

## 📱 Farcaster Mini App (Coming Soon)

OmniTap will be available as a Farcaster Mini App on Monad chain:
- Instant onboarding
- Frame-based UI
- Social features
- Cast integration

## 🗺️ Roadmap

- [x] Core counter functionality
- [x] Multichain deployment
- [x] Leaderboards
- [x] Achievements
- [x] Referral system
- [x] Daily streaks
- [ ] NFT badges
- [ ] Monad integration
- [ ] Farcaster Mini App
- [ ] Mobile app
- [ ] Team competitions
- [ ] Global unified leaderboard

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repo
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 🔗 Links

- **Live dApp**: https://omnitap.vercel.app
- **GitHub**: https://github.com/yourusername/omnitap
- **Twitter**: [@omnitap](https://twitter.com/omnitap)
- **Discord**: [Join community](https://discord.gg/omnitap)

## 💡 Support

- GitHub Issues: [Report bugs](https://github.com/yourusername/omnitap/issues)
- Discord: [Get help](https://discord.gg/omnitap)
- Email: support@omnitap.xyz

## Smart Contract Deployment

To deploy the contracts to all networks:
```
npx hardhat run scripts/deploy-all.js
```
