// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GasSaver {
    function executeBatch(address[] calldata targets, bytes[] calldata data) public payable {
        require(targets.length == data.length, "Targets and data length mismatch");

        for (uint i = 0; i < targets.length; i++) {
            (bool success, ) = targets[i].call{value: msg.value}(data[i]);
            require(success, "Transaction failed");
        }
    }
}
