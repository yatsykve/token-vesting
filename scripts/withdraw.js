const hre = require("hardhat");

async function main() {
    const contractFactory = await hre.ethers.getContractFactory("TimeLockedWallet");
    const contract = contractFactory.attach("0xd4F3d4f46d53B43F203B48c11e0DdF9D2264d962");

    console.log("lockedAmount: ", (await contract.lockedAmount()).toString());
    console.log("readyToWithdraw: ", (await contract.readyToWithdraw()).toString());

    console.log("withdraw: ", await contract.withdraw());
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

