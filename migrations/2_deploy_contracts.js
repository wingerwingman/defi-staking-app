const Tether = artifacts.require('Tether');
const ClimbCoin = artifacts.require('ClimbCoin');

module.exports = async function(deployer) {
    await deployer.deploy(Tether)

    await deployer.deploy(ClimbCoin)
};

