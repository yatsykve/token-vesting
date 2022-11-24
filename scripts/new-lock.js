const hre = require("hardhat");

async function main() {
    const Token = await hre.ethers.getContractFactory("BroToken");
    const token = await Token.attach('0x8e2d9df440a972c7930e597608529dc0a4a5a014');

    const Contract = await hre.ethers.getContractFactory("TimeLockedWallet");
    const walletAddress = "0xd4F3d4f46d53B43F203B48c11e0DdF9D2264d962";
    const contract = await Contract.attach(walletAddress);

    let amount = (Math.floor(Math.random() * 1000) + 1) * 1000000000000000000;
    let firstUnlockTime = Math.floor(new Date().getTime() / 1000) + 3 * 60;
    console.log("amount", amount.toString(), "time", firstUnlockTime);

    const txAppr = await token.approve(walletAddress, amount.toString());
    const receiptAppr = await txAppr.wait();

    let tx = await contract.lock(amount.toString(), 1, firstUnlockTime, 1 * 60);
    const receipt = await tx.wait();
    console.log(receipt);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
