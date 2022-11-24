const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Lock = await hre.ethers.getContractFactory("BroToken");
    const lock = await Lock.deploy();
    await lock.deployed();
    console.log(`Bro token is deployed to ${lock.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
