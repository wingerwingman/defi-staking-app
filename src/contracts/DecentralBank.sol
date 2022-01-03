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
    
    constructor(RWD _rwd, Tether _tether, ClimbCoin _climbcoin) public {
        rwd = _rwd;
        tether = _tether;
        climbcoin = _climbcoin;
    }
}