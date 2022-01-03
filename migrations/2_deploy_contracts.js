const Tether = artifacts.require('Tether');
const ClimbCoin = artifacts.require('ClimbCoin');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(Tether)
    const tether = await Tether.deployed()

    await deployer.deploy(ClimbCoin)
    const climbcoin = await ClimbCoin.deployed()

    await deployer.deploy(RWD)
    const rwd = await RWD.deployed()

    await deployer.deploy(DecentralBank)
    const decentralBank = await DecentralBank.deployed()

    await rwd.transfer(DecentralBank.address, '1000000000000000000000000')

    await tether.transfer(accounts[1], '1000000000000000000')

};

