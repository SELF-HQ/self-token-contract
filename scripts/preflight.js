const hre = require("hardhat");

async function main() {
  const treasury = (
    process.env.TREASURY_ADDRESS || "0x8b2fE271c13C94c679b1fF69466C2D6d034b2e8c"
  ).trim();
  const [deployer] = await hre.ethers.getSigners();
  const network = await hre.ethers.provider.getNetwork();
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  const code = await hre.ethers.provider.getCode(treasury);

  console.log("network:", network.name, Number(network.chainId));
  console.log("deployer:", deployer.address);
  console.log("ETH:", hre.ethers.formatEther(balance));
  console.log("treasury:", treasury);
  console.log("treasury is contract:", code !== "0x");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
