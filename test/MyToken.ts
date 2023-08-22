import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";

import { ethers } from "hardhat";
const toEther = (amount: any, unit = "ether") =>
  ethers.parseUnits(amount.toString(), unit);
const fromEther = (amount: any, unit = "ether") =>
  ethers.formatUnits(amount.toString(), unit);

describe("Test MyToken", function () {
  async function initTest() {
    const [owner, user] = await ethers.getSigners();

    const myToken = await ethers.deployContract("MyToken");

    await myToken.waitForDeployment();

    return { myToken, owner, user };
  }

  describe("Deployment", () => {
    it("Check token meta data", async () => {
      const { myToken, owner } = await initTest();

      expect(await myToken.minter()).to.equal(owner.address);
      expect(await myToken.name()).to.equal("Fish Token");
      expect(await myToken.symbol()).to.equal("FISH");
    });
  });

  describe("Mint", () => {
    it("Only Minter can mint", async () => {
      const { myToken, user } = await loadFixture(initTest);

      await expect(myToken.connect(user).mint(user.address, toEther(1))).to.be
        .reverted;
    });
    it.only("Mint exact amount", async () => {
      const { myToken, owner, user } = await loadFixture(initTest);

      const mintAmount = toEther(100);

      const beforeUserAmount = await myToken.balanceOf(user.address);
      await myToken.connect(owner).mint(user.address, mintAmount);
      const afterUserAmount = await myToken.balanceOf(user.address);
      expect(afterUserAmount - beforeUserAmount).eq(mintAmount);
    });
  });
});