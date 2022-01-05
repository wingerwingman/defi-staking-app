const Tether = artifacts.require('Tether');
const ClimbCoin = artifacts.require('ClimbCoin');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank', ([owner, customer]) => {

    let tether, rwd, climbCoin, decentralBank

    function tokens(number) {
        return web3.utils.toWei(number, 'ether')
    }

    before(async () => {
        tether = await Tether.new()
        rwd = await RWD.new()
        climbCoin = await ClimbCoin.new()
        decentralBank = await DecentralBank.new(rwd.address, tether.address, climbCoin.address)

        await rwd.transfer(decentralBank.address, tokens('1000000'))

        await tether.transfer(customer, tokens('100'), {from: owner})
        await climbCoin.transfer(customer, tokens('1000'), {from: owner})
    })

    describe('Mock Tether Deployment', async () => {
        it('matches names successfully', async() => {
            const name = await tether.name()
            assert.equal(name, 'Tether')
        })
    })

    describe('Mock RWD Deployment', async () => {
        it('matches names successfully', async() => {
            const name = await rwd.name()
            assert.equal(name, 'Reward Token')
        })
    })

    describe('Mock ClimbCoin Deployment', async () => {
        it('matches names successfully', async() => {
            const name = await climbCoin.name()
            assert.equal(name, 'Climb Coin')
        })
    })

    describe('Decentral Bank Deployment', async () => {
        it('matches names successfully', async() => {
            const name = await decentralBank.name()
            assert.equal(name, 'Decentral Bank')
        })

        it('contract has tokens', async () => {
            let balance = await rwd.balanceOf(decentralBank.address)
            assert.equal(balance, tokens('1000000'))
        })
    })

})
