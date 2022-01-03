const Tether = artifacts.require('Tether');
const ClimbCoin = artifacts.require('ClimbCoin');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function(deployer) {
    await deployer.deploy(Tether)

    await deployer.deploy(ClimbCoin)

    await deployer.deploy(RWD)

    await deployer.deploy(DecentralBank)
    
};

