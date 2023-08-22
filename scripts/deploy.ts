import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners()
  
  const tokenFactory = await ethers.getContractFactory("MyToken")
  const token = await tokenFactory.deploy();

  console.log(`The token ${await token.name()}(${await token.symbol()}) is deployed`);
  console.log(`Token Address is ${await token.getAddress()}`);
  console.log(`Token minter: ${await token.minter()}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
