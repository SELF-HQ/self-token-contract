// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

error ZeroTreasury();

/// @title SELF Token
/// @notice Fixed-supply ERC-20. Entire supply is minted once in the constructor.
contract SELFToken is ERC20 {
    uint256 public constant INITIAL_SUPPLY = 500_000_000 * 1e18;

    constructor(address treasury) ERC20("SELF Token", "SELF") {
        if (treasury == address(0)) revert ZeroTreasury();
        _mint(treasury, INITIAL_SUPPLY);
    }
}
