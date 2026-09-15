const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SELFToken", function () {
  const SUPPLY = ethers.parseEther("500000000");
  let token;
  let deployer, treasury, user1, user2;

  beforeEach(async function () {
    [deployer, treasury, user1, user2] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("SELFToken");
    token = await factory.deploy(treasury.address);
  });

  describe("Deployment", function () {
    it("sets name and symbol", async function () {
      expect(await token.name()).to.equal("SELF Token");
      expect(await token.symbol()).to.equal("SELF");
    });

    it("uses 18 decimals", async function () {
      expect(await token.decimals()).to.equal(18n);
    });

    it("mints the full supply to the treasury", async function () {
      expect(await token.totalSupply()).to.equal(SUPPLY);
      expect(await token.INITIAL_SUPPLY()).to.equal(SUPPLY);
      expect(await token.balanceOf(treasury.address)).to.equal(SUPPLY);
      expect(await token.balanceOf(deployer.address)).to.equal(0n);
    });

    it("reverts if treasury is the zero address", async function () {
      const factory = await ethers.getContractFactory("SELFToken");
      await expect(factory.deploy(ethers.ZeroAddress)).to.be.revertedWithCustomError(
        factory,
        "ZeroTreasury"
      );
    });

    it("has no public mint", async function () {
      const names = token.interface.fragments
        .filter((fragment) => fragment.type === "function")
        .map((fragment) => fragment.name);
      expect(names).to.not.include("mint");
    });
  });

  describe("Transfers", function () {
    it("transfers between accounts", async function () {
      const amount = ethers.parseEther("1000");
      await token.connect(treasury).transfer(user1.address, amount);
      expect(await token.balanceOf(user1.address)).to.equal(amount);
    });

    it("reverts when the sender has an insufficient balance", async function () {
      await expect(
        token.connect(user1).transfer(user2.address, ethers.parseEther("1"))
      ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
    });
  });

  describe("Allowances", function () {
    it("approves and transferFrom", async function () {
      const amount = ethers.parseEther("1000");
      await token.connect(treasury).approve(user1.address, amount);
      await token
        .connect(user1)
        .transferFrom(treasury.address, user2.address, amount);
      expect(await token.balanceOf(user2.address)).to.equal(amount);
    });

    it("reverts transferFrom without allowance", async function () {
      await expect(
        token
          .connect(user1)
          .transferFrom(treasury.address, user2.address, ethers.parseEther("1"))
      ).to.be.revertedWithCustomError(token, "ERC20InsufficientAllowance");
    });
  });
});
