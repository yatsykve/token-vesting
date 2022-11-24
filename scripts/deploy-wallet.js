const hre = require("hardhat");

async function main() {
    const Contract = await hre.ethers.getContractFactory("TimeLockedWallet");
    const contract = await Contract.deploy("0x7000a7c9E8B87a67ae83253357b37db95D9F2EC7", "0x8e2d9df440a972c7930e597608529dc0a4a5a014");
    await contract.deployed();
    console.log(`Contract address is ${contract.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
