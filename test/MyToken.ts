import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";

const { ethers } = require("hardhat");
const toEther = (amount: any, unit = 'ether') => ethers.parseUnits(amount.toString(), unit);
const fromEther = (amount: any, unit = 'ether') => ethers.formatUnits(amount.toString(), unit)

describe("Test MyToken", function () {
  async function initTest() {
    const [owner, user] = await ethers.getSigners();

    const tokenFactory = await ethers.getContractFactory("MyToken");
    const myToken = await tokenFactory.deploy();

    return { myToken, owner, user }
  }

  describe("Deployment", async () => {
    it("Check token meta data", async () => {
      const {myToken, owner} = await loadFixture(initTest);

      expect(await myToken.minter()).to.equal(owner.address);
      expect(await myToken.name()).to.eql("Whale Token");
      expect(await myToken.symbol()).to.equal("WHLE");

    });
  });

  describe("Mint", async () => {
    it.only("Only Minter can mint", async () => {
      const {myToken, owner, user} = await loadFixture(initTest);
      
      await expect (myToken.connect(user).mint(user.address, toEther(1))).to.be.reverted
    })
    it.only("Mint exact amount", async () => {
     const {myToken, owner, user} = await loadFixture(initTest);

     const mintAmount = toEther(100)
     const beforeUserAmount = await myToken.balanceof(user.address)
     await myToken.connect(owner).mint(user.address, mintAmount)
     const afterUserAmount = await myToken.balanceof(user.address)

     expect(afterUserAmount.sub(beforeUserAmount)).to.equal(mintAmount)
    })
  })
});
