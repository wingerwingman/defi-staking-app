const Migrations = artifacts.require('Migrations');

module.exports = function deployer() {
    deployer.deplooy(Migrations)
}