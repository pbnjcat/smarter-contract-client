// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SmarterContract {
    // Map with key as the participant's wallet addresses
    // bool is if they've signed the contract or not
    mapping(address => bool) public users;
    uint256 public contractCreationDate;

    // The URL to the encrypted file in 0G storage
    string public generatedContractURL;

    uint256 public contractDeadline;

    uint256 private constant TWO_HOURS_IN_SECS = 7200;

    constructor(address _counterParty, string memory _generatedContractURL) {
        contractCreationDate = block.timestamp;
        users[msg.sender] = false;
        users[_counterParty] = false;
        generatedContractURL = _generatedContractURL;
        contractDeadline = contractCreationDate + TWO_HOURS_IN_SECS;
    }

    function sign() public {
        require(!users[msg.sender], "User has already signed");
        users[msg.sender] = true;
    }
}
