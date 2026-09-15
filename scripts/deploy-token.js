const hre = require("hardhat");

const TREASURY = (
  process.env.TREASURY_ADDRESS || "0x8b2fE271c13C94c679b1fF69466C2D6d034b2e8c"
).trim();

async function main() {
  if (!hre.ethers.isAddress(TREASURY) || TREASURY === hre.ethers.ZeroAddress) {
    throw new Error("TREASURY_ADDRESS is missing or zero");
  }

  const explorer = hre.network.name === "mainnet" ? "https://etherscan.io" : null;

  console.log(`Deploying SELFToken on ${hre.network.name}`);
  console.log(`Treasury: ${TREASURY}`);

  const factory = await hre.ethers.getContractFactory("SELFToken");
  const token = await factory.deploy(TREASURY);
  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log("SELFToken:", address);
  if (explorer) {
    console.log(`${explorer}/address/${address}`);
  }

  const tx = token.deploymentTransaction();
  if (tx) {
    await tx.wait(5);
  }

  try {
    await hre.run("verify:verify", {
      address,
      constructorArguments: [TREASURY],
    });
    console.log("Verified on Etherscan");
  } catch (error) {
    console.log("Verification:", error.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
