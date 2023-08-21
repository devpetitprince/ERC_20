pragma solidity ^0.8.9;

import './ERC20.sol';

contract MyToken is ERC20("Fish Token", "FISH") {
    address public minter;

    constructor () {
        minter = msg.sender;
    }

    function mint(address to, uint amount) external {
        require(msg.sender == minter, "only Minter");
        _mint(to, amount);
    }

    function burn(address to, uint amount) external {
        require(msg.sender == minter, "only Minter");
        _burn(to, amount);
    }
}