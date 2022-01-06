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
        owner = msg.sender;
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

    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, 'staking balance should be more than 0');

        tether.transfer(msg.sender, balance);

        stakingBalance[msg.sender] = 0;

        isStaked[msg.sender] = false;
    }

    function issueTokens() public {
        require(msg.sender == owner, 'Caller must be the owner');

        for (uint i = 0; i < stakers.length; i++){
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient] / 9;
            if(balance > 0) {
                rwd.transfer(recipient, balance);
            }
            
        }
    }

}