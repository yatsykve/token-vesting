// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TimeLockedWallet is Ownable {

    struct LockBoxStruct {
        uint amount;
        uint unlockTime;
        bool paid;
    }

    address public _tokenAddress;
    LockBoxStruct[] public _lockBoxes;

    constructor(address owner, address tokenAddress) {
        require(!Address.isContract(owner), "Owner should be externally-owned account and not a contract");
        _transferOwnership(owner);
        _tokenAddress = tokenAddress;
    }

    function lock(uint amount, uint numberOfPeriods, uint firstUnlockTime, uint periodDuration) public {
        require(firstUnlockTime > block.timestamp, "Unlock time should be in the future");

        ERC20 token = ERC20(_tokenAddress);
        require(amount <= token.allowance(msg.sender, address(this)), "This contract should be approved to spend :amount of tokens");
        require(token.transferFrom(msg.sender, address(this), amount), "Token transfer failed");

        uint periodAmount = amount / numberOfPeriods;
        for (uint i = 0; i < numberOfPeriods; i++) {
            LockBoxStruct memory box;
            box.amount = periodAmount;
            box.unlockTime = firstUnlockTime + i * periodDuration;
            box.paid = false;
            _lockBoxes.push(box);
        }
        LockBoxStruct storage lastBox = _lockBoxes[numberOfPeriods - 1];
        lastBox.amount = lastBox.amount + amount % numberOfPeriods;
    }

    function lockedAmount() public view returns (uint amount) {
        for (uint i = 0; i < _lockBoxes.length; i++) {
            LockBoxStruct memory box = _lockBoxes[i];
            if (box.paid == false) {
                amount = amount + box.amount;
            }
        }
        return amount;
    }

    function readyToWithdraw() public view returns (uint amount) {
        for (uint i = 0; i < _lockBoxes.length; i++) {
            LockBoxStruct memory box = _lockBoxes[i];
            if (box.unlockTime <= block.timestamp && box.paid == false) {
                amount = amount + box.amount;
            }
        }
        return amount;
    }

    function withdraw() public onlyOwner {
        for (uint i = 0; i < _lockBoxes.length; i++) {
            LockBoxStruct storage box = _lockBoxes[i];
            if (box.unlockTime <= block.timestamp && box.paid == false) {
                box.paid = true;
                ERC20 token = ERC20(_tokenAddress);
                SafeERC20.safeTransfer(token, owner(), box.amount);
                return;
            }
        }
        revert("Nothing to withdraw");
    }

}
