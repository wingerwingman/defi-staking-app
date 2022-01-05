const Tether = artifacts.require('Tether');
const ClimbCoin = artifacts.require('ClimbCoin');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(Tether)
    const tether = await Tether.deployed()

    await deployer.deploy(ClimbCoin)
    const climbCoin = await ClimbCoin.deployed()

    await deployer.deploy(RWD)
    const rwd = await RWD.deployed()

    await deployer.deploy(DecentralBank, rwd.address, tether.address, climbCoin.address)
    const decentralBank = await DecentralBank.deployed()

    await rwd.transfer(decentralBank.address, '1000000000000000000000000')

    await tether.transfer(accounts[1], '100000000000000000000')

    await climbCoin.transfer(accounts[1], '1000000000000000000000')

};

