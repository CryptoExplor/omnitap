# 🎯 OmniTap - Complete Deployment Commands

Copy-paste ready commands for deploying your OmniTap dApp.

---

## 📦 Initial Setup

### 1. Clone and Install
```bash
# Clone repository
git clone https://github.com/yourusername/omnitap.git
cd omnitap

# Install dependencies
npm install

# Verify installation
npm list --depth=0
```

### 2. Setup Environment
```bash
# Copy environment template
cp .env.example .env

# Edit with your keys (use nano, vim, or code editor)
nano .env
```

Add these to `.env`:
```env
PRIVATE_KEY=your_private_key_here_without_0x
VITE_REOWN_PROJECT_ID=your_reown_project_id
BASESCAN_API_KEY=optional_for_verification
ARBISCAN_API_KEY=optional_for_verification
BSCSCAN_API_KEY=optional_for_verification
CELOSCAN_API_KEY=optional_for_verification
```

---

## 🔐 Get Your Keys

### Get Private Key from MetaMask
1. Open MetaMask
2. Click 3 dots → Account Details
3. Export Private Key
4. Enter password
5. Copy key (without 0x prefix)
6. **⚠️ NEVER SHARE THIS!**

### Get Reown Project ID
```bash
# Visit
open https://cloud.reown.com

# Steps:
# 1. Sign up/Login
# 2. Create New Project
# 3. Copy Project ID
```

---

## 💧 Get Testnet Tokens

### Base Sepolia
```bash
# Visit faucet
open https://www.coinbase.com/faucets/base-ethereum-goerli-faucet

# Or use command (if supported)
# Enter your wallet address
```

### Arbitrum Sepolia
```bash
open https://faucet.quicknode.com/arbitrum/sepolia
```

### BSC Testnet
```bash
open https://testnet.bnbchain.org/faucet-smart
```

### Celo Alfajores
```bash
open https://faucet.celo.org/alfajores
```

---

## 🚀 Deploy Smart Contracts

### Compile Contracts
```bash
# Clean previous builds
npx hardhat clean

# Compile all contracts
npx hardhat compile

# Verify compilation
ls artifacts/contracts/
```

### Deploy to Base Sepolia
```bash
# Deploy
npm run deploy:base-sepolia

# Or use hardhat directly
npx hardhat run scripts/deploy-all.js --network baseSepolia

# Expected output:
# ✅ OmniTapCore deployed to: 0x...
# ✅ OmniTapExtensions deployed to: 0x...
# 💾 Deployment saved to deployments/baseSepolia.json
```

### Deploy to Arbitrum Sepolia
```bash
npm run deploy:arbitrum-sepolia
# or
npx hardhat run scripts/deploy-all.js --network arbitrumSepolia
```

### Deploy to BSC Testnet
```bash
npm run deploy:bsc-testnet
# or
npx hardhat run scripts/deploy-all.js --network bscTestnet
```

### Deploy to Celo Alfajores
```bash
npm run deploy:celo-alfajores
# or
npx hardhat run scripts/deploy-all.js --network celoAlfajores
```

### Deploy to All Networks (Sequential)
```bash
# Create a deploy-all script or run manually
npm run deploy:base-sepolia && \
npm run deploy:arbitrum-sepolia && \
npm run deploy:bsc-testnet && \
npm run deploy:celo-alfajores
```

---

## ✅ Verify Contracts

### Base Sepolia
```bash
# Set variables (replace with your addresses)
CORE_ADDRESS="0xYourCoreAddress"
EXTENSIONS_ADDRESS="0xYourExtensionsAddress"
FEE="100000000000000"

# Verify Core
npx hardhat verify --network baseSepolia $CORE_ADDRESS $FEE

# Verify Extensions
npx hardhat verify --network baseSepolia $EXTENSIONS_ADDRESS $CORE_ADDRESS
```

### Arbitrum Sepolia
```bash
# Replace addresses
CORE_ADDRESS="0xYourCoreAddress"
EXTENSIONS_ADDRESS="0xYourExtensionsAddress"

npx hardhat verify --network arbitrumSepolia $CORE_ADDRESS "100000000000000"
npx hardhat verify --network arbitrumSepolia $EXTENSIONS_ADDRESS $CORE_ADDRESS
```

### Verification for All Networks
```bash
# Base Sepolia
npx hardhat verify --network baseSepolia <CORE> "100000000000000"
npx hardhat verify --network baseSepolia <EXT> <CORE>

# Arbitrum Sepolia
npx hardhat verify --network arbitrumSepolia <CORE> "100000000000000"
npx hardhat verify --network arbitrumSepolia <EXT> <CORE>

# BSC Testnet
npx hardhat verify --network bscTestnet <CORE> "100000000000000"
npx hardhat verify --network bscTestnet <EXT> <CORE>

# Celo Alfajores
npx hardhat verify --network celoAlfajores <CORE> "100000000000000"
npx hardhat verify --network celoAlfajores <EXT> <CORE>
```

---

## 📝 Update Frontend Config

### Extract Deployment Info
```bash
# View deployed addresses
cat deployments/baseSepolia.json | jq '.contracts.core.address'
cat deployments/baseSepolia.json | jq '.contracts.extensions.address'

# Or view entire file
cat deployments/baseSepolia.json
```

### Update contracts.json
```bash
# Edit config file
code src/config/contracts.json
# or
nano src/config/contracts.json
```

Copy addresses and ABIs from `deployments/<network>.json` to `src/config/contracts.json`

### Quick Update Script
```bash
# Create a node script to auto-update
cat > update-config.js << 'EOF'
const fs = require('fs');
const deployments = {
  '84532': require('./deployments/baseSepolia.json'),
  '421614': require('./deployments/arbitrumSepolia.json'),
  '97': require('./deployments/bscTestnet.json'),
  '44787': require('./deployments/celoAlfajores.json')
};

const config = {};
Object.entries(deployments).forEach(([chainId, deployment]) => {
  config[chainId] = {
    chainName: deployment.chainName,
    core: deployment.contracts.core,
    extensions: deployment.contracts.extensions
  };
});

fs.writeFileSync('src/config/contracts.json', JSON.stringify(config, null, 2));
console.log('✅ Config updated!');
EOF

# Run it
node update-config.js
```

---

## 🎨 Frontend Development

### Local Development
```bash
# Start dev server
npm run dev

# Open browser (usually auto-opens)
open http://localhost:3000

# Watch logs
# Ctrl+C to stop
```

### Test Locally
```bash
# With dev server running, test:
# 1. Connect wallet
# 2. Switch networks
# 3. Increment counter
# 4. Check stats
# 5. View leaderboard
```

### Build for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview

# Build output in /dist folder
ls -la dist/
```

---

## 🌐 Deploy Frontend to Vercel

### Method 1: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow prompts:
# - Link to existing project? No
# - Project name: omnitap
# - Directory: ./
# - Settings OK? Yes

# Add environment variable
vercel env add VITE_REOWN_PROJECT_ID

# Your app is live! 🎉
```

### Method 2: GitHub + Vercel (Recommended)
```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/omnitap.git
git push -u origin main

# 2. Go to Vercel
open https://vercel.com/new

# 3. Import repository
# - Click "Import Project"
# - Select your GitHub repo
# - Add environment variable: VITE_REOWN_PROJECT_ID
# - Click "Deploy"

# Done! Auto-deploys on every push
```

### Update Deployment
```bash
# Make changes
# Commit and push
git add .
git commit -m "Update feature"
git push

# Vercel auto-deploys!
# Or manually trigger:
vercel --prod
```

---

## 🧪 Testing Commands

### Test Contracts Locally
```bash
# Start local node
npx hardhat node

# In another terminal, deploy to local
npx hardhat run scripts/deploy-all.js --network localhost

# Run tests
npx hardhat test

# Run specific test
npx hardhat test test/OmniTapCore.test.js
```

### Interact with Deployed Contracts
```bash
# Open Hardhat console
npx hardhat console --network baseSepolia

# Inside console:
> const Core = await ethers.getContractFactory("OmniTapCore");
> const core = await Core.attach("YOUR_CORE_ADDRESS");
> await core.count(); // Get current count
> await core.fee(); // Get fee
> await core.totalUsers(); // Get total users
```

### Frontend Tests
```bash
# Install testing libraries (if needed)
npm install -D @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm run test

# Or create a quick test
curl http://localhost:3000 # Should return 200
```

---

## 📊 Monitoring & Maintenance

### Check Deployment Status
```bash
# Check if contracts are deployed
curl -s https://api-sepolia.basescan.org/api\?module=contract\&action=getabi\&address=YOUR_ADDRESS

# View on explorer
open https://sepolia.basescan.org/address/YOUR_ADDRESS
```

### View Logs
```bash
# Vercel logs
vercel logs

# Or in dashboard
open https://vercel.com/dashboard
```

### Update Contract Fee
```bash
npx hardhat console --network baseSepolia

> const core = await ethers.getContractAt("OmniTapCore", "YOUR_ADDRESS");
> await core.setFee(ethers.parseEther("0.0001")); // New fee
```

---

## 🔄 Redeploy / Update

### Update Smart Contracts
```bash
# Make changes to contracts
# Compile
npx hardhat compile

# Deploy new version
npm run deploy:base-sepolia

# Update frontend config with new addresses
node update-config.js

# Redeploy frontend
vercel --prod
```

### Update Frontend Only
```bash
# Make changes to components
# Test locally
npm run dev

# Build
npm run build

# Deploy
vercel --prod
```

---

## 🗑️ Clean Up

### Remove Deployments
```bash
# Clean Hardhat artifacts
npx hardhat clean

# Remove deployments
rm -rf deployments/
rm -rf cache/

# Fresh start
npm run compile
```

### Reset Local Dev
```bash
# Clear node modules
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Rebuild
npm run build
```

---

## 💡 Pro Tips

### Speed Up Deployments
```bash
# Use faster RPC endpoints in hardhat.config.js
# Consider using Infura, Alchemy, or QuickNode

# Parallel deployments (advanced)
npm run deploy:base-sepolia & \
npm run deploy:arbitrum-sepolia & \
wait
```

### Batch Verification
```bash
# Create verify-all.sh
cat > verify-all.sh << 'EOF'
#!/bin/bash
networks=("baseSepolia" "arbitrumSepolia" "bscTestnet" "celoAlfajores")
for network in "${networks[@]}"; do
  echo "Verifying on $network..."
  npx hardhat verify --network $network $CORE_ADDRESS "100000000000000"
  npx hardhat verify --network $network $EXT_ADDRESS $CORE_ADDRESS
done
EOF

chmod +x verify-all.sh
./verify-all.sh
```

### Environment Management
```bash
# Multiple environments
cp .env .env.testnet
cp .env .env.mainnet

# Load specific env
source .env.testnet && npm run deploy:base-sepolia
```

---

## ✅ Deployment Verification Checklist

```bash
# Run these to verify everything works
echo "Checking deployments..."

# 1. Contracts deployed
ls deployments/*.json

# 2. Frontend built
ls dist/index.html

# 3. Environment configured
grep -q "VITE_REOWN_PROJECT_ID" .env && echo "✅ Reown configured"

# 4. Dependencies installed
npm list @wagmi/core @reown/appkit viem

# 5. Config updated
grep -q "0x" src/config/contracts.json && echo "✅ Contracts configured"

echo "✅ All checks passed!"
```

---

## 🎉 You're Done!

Your OmniTap dApp should now be fully deployed and operational!

**Test your deployment:**
1. Visit your Vercel URL
2. Connect wallet
3. Select a network
4. Tap the counter!

**Share your dApp:**
```bash
echo "My OmniTap is live at: $(vercel --prod | tail -n1)"
```

---

*Need help? Check DEPLOYMENT_GUIDE.md for detailed explanations*
