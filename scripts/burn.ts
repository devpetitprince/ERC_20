import { ethers } from "hardhat";

const toEther = (amount: any, unit = 'ether') => ethers.parseUnits(amount.toString(), unit)

async function main() {
    const [owner] = await ethers.getSigners()

    const token = await ethers.getContractAt("MyToken", "0xa800fccac5c68771618b0267fed83c37502fbc4b")

    await token.burn(owner.address, toEther(30))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});