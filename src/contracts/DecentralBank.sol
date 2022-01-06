pragma solidity ^0.5.0;

import './RWD.sol';
import './Tether.sol';
import './ClimbCoin.sol';

contract DecentralBank {
    string public name = 'Decentral Bank';
    address public owner;
    Tether public tether;
    RWD public rwd;
    ClimbCoin public climbcoin;
    
    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaked;

    constructor(RWD _rwd, Tether _tether, ClimbCoin _climbcoin) public {
        rwd = _rwd;
        tether = _tether;
        climbcoin = _climbcoin;
    }

    function depositTokens(uint _amount) public {
        require(_amount > 0, 'Amount cannot be 0');

        tether.transferFrom(msg.sender, address(this), _amount);

        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaked[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

}