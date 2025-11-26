const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Starting OmniTap deployment...\n");
  
  // Get network info
  const network = hre.network.name;
  const chainId = hre.network.config.chainId;
  
  console.log(`📍 Network: ${network}`);
  console.log(`🔗 Chain ID: ${chainId}\n`);
  
  // Get deployer
  const [deployer] = await hre.ethers.getSigners();
  console.log(`👤 Deployer: ${deployer.address}`);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log(`💰 Balance: ${hre.ethers.formatEther(balance)} ETH\n`);
  
  // Initial fee: 0.00001 ETH
  const initialFee = hre.ethers.parseEther("0.00001");
  console.log(`💵 Initial fee: ${hre.ethers.formatEther(initialFee)} ETH per action\n`);
  
  // ==================== Deploy Core ====================
  console.log("📦 Deploying OmniTapCore...");
  const OmniTapCore = await hre.ethers.getContractFactory("OmniTapCore");
  const core = await OmniTapCore.deploy(initialFee);
  await core.waitForDeployment();
  const coreAddress = await core.getAddress();
  
  console.log(`✅ OmniTapCore deployed to: ${coreAddress}`);
  
  // Wait for confirmations
  console.log("⏳ Waiting for block confirmations...");
  await core.deploymentTransaction().wait(5);
  console.log("✅ Confirmations received\n");
  
  // ==================== Deploy Extensions ====================
  console.log("📦 Deploying OmniTapExtensions...");
  const OmniTapExtensions = await hre.ethers.getContractFactory("OmniTapExtensions");
  const extensions = await OmniTapExtensions.deploy(coreAddress);
  await extensions.waitForDeployment();
  const extensionsAddress = await extensions.getAddress();
  
  console.log(`✅ OmniTapExtensions deployed to: ${extensionsAddress}`);
  
  // Wait for confirmations
  console.log("⏳ Waiting for block confirmations...");
  await extensions.deploymentTransaction().wait(5);
  console.log("✅ Confirmations received\n");
  
  // ==================== Generate Deployment Info ====================
  console.log("📝 Generating deployment artifacts...");
  
  // Read ABIs
  const coreArtifact = await hre.artifacts.readArtifact("OmniTapCore");
  const extensionsArtifact = await hre.artifacts.readArtifact("OmniTapExtensions");
  
  const deployment = {
    network: network,
    chainId: chainId,
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      core: {
        address: coreAddress,
        abi: coreArtifact.abi,
        constructorArgs: [initialFee.toString()]
      },
      extensions: {
        address: extensionsAddress,
        abi: extensionsArtifact.abi,
        constructorArgs: [coreAddress]
      }
    }
  };
  
  // Create deployments directory
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }
  
  // Save deployment info
  const deploymentPath = path.join(deploymentsDir, `${network}.json`);
  fs.writeFileSync(deploymentPath, JSON.stringify(deployment, null, 2));
  
  console.log(`✅ Deployment saved to: deployments/${network}.json\n`);
  
  // ==================== Summary ====================
  console.log("=" .repeat(60));
  console.log("🎉 DEPLOYMENT SUCCESSFUL!");
  console.log("=" .repeat(60));
  console.log(`Network: ${network} (Chain ID: ${chainId})`);
  console.log(`Core: ${coreAddress}`);
  console.log(`Extensions: ${extensionsAddress}`);
  console.log("=" .repeat(60));
  console.log("\n📋 Next Steps:");
  console.log("1. Verify contracts on block explorer:");
  console.log(`   npx hardhat verify --network ${network} ${coreAddress} "${initialFee}"`);
  console.log(`   npx hardhat verify --network ${network} ${extensionsAddress} ${coreAddress}`);
  console.log("\n2. Update src/config/contracts.json with addresses and ABIs");
  console.log("\n3. Test the contracts:");
  console.log(`   - Visit block explorer to interact`);
  console.log(`   - Or use frontend after updating config\n`);
  
  // ==================== Test Contract ====================
  console.log("🧪 Testing deployed contracts...\n");
  
  try {
    // Test Core
    const count = await core.count();
    console.log(`✅ Initial counter: ${count}`);
    
    const fee = await core.fee();
    console.log(`✅ Fee: ${hre.ethers.formatEther(fee)} ETH`);
    
    const totalUsers = await core.totalUsers();
    console.log(`✅ Total users: ${totalUsers}`);
    
    // Test Extensions
    const [addresses, scores] = await extensions.getTopN(10);
    console.log(`✅ Leaderboard size: ${addresses.length}`);
    
    console.log("\n✅ All tests passed!\n");
  } catch (error) {
    console.error("❌ Error testing contracts:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });