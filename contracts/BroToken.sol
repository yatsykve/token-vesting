// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BroToken is ERC20 {
    constructor() ERC20("Bro Token", "BROT") {
        _mint(msg.sender, 42000 * 10 ** decimals());
    }
}
