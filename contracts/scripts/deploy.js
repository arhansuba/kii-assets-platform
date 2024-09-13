const hre = require("hardhat");

async function main() {
  console.log("Deploying contracts...");

  // Deploy AssetToken contract
  const AssetToken = await hre.ethers.getContractFactory("AssetToken");
  const assetToken = await AssetToken.deploy();
  await assetToken.deployed();
  console.log("AssetToken deployed to:", assetToken.address);

  // Deploy Marketplace contract
  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(assetToken.address);
  await marketplace.deployed();
  console.log("Marketplace deployed to:", marketplace.address);

  // Verify contracts on Etherscan (if not on a local network)
  if (hre.network.name !== "localhost" && hre.network.name !== "hardhat") {
    console.log("Waiting for block confirmations...");
    await assetToken.deployTransaction.wait(5);
    await marketplace.deployTransaction.wait(5);

    console.log("Verifying contracts...");
    await hre.run("verify:verify", {
      address: assetToken.address,
      constructorArguments: [],
    });

    await hre.run("verify:verify", {
      address: marketplace.address,
      constructorArguments: [assetToken.address],
    });
  }

  console.log("Deployment and verification completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });