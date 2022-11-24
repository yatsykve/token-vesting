require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const privateKey = process.env.PRIVATE_KEY;
const polygonscanApikey = process.env.POLYGONSCAN_API_KEY;
const alchemyAppId = process.env.ALCHEMY_APP_ID;

module.exports = {
    networks: {
        mumbai: {
            url: `https://polygon-mumbai.g.alchemy.com/v2/${alchemyAppId}`,
            accounts: [privateKey]
        },
        polygon: {
            url: `https://polygon-mainnet.g.alchemy.com/v2/${alchemyAppId}`,
            accounts: [privateKey]
        }
    },
    solidity: "0.8.17",
    etherscan: {
        apiKey: polygonscanApikey
    }
};
