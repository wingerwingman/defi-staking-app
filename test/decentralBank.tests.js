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

    describe('Yield Farming', async () => {
        it('rewards tokens for staking', async () => {
            let result 
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('100'), 'customer mock wallet balance before staking')
            
            await tether.approve(decentralBank.address, tokens('100'), {from: customer})
            await decentralBank.depositTokens(tokens('100'), {from: customer})

            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('0'), 'customer mock wallet balance after staking')
            
            result = await tether.balanceOf(decentralBank.address)
            assert.equal(result.toString(), tokens('100'), 'decentral bank mock wallet balance after customer staking')
            
            result = await decentralBank.isStaked(customer)
            assert.equal(result, true, 'Customer is staking')

            await decentralBank.issueTokens({from: owner})

            await decentralBank.issueTokens({from: customer}).should.be.rejected;

            await decentralBank.unstakeTokens({from: customer})

            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('100'), 'customer mock wallet balance after unstaking')
            
            result = await tether.balanceOf(decentralBank.address)
            assert.equal(result.toString(), tokens('0'), 'decentral bank mock wallet balance after customer unstaked')
            
            result = await decentralBank.isStaked(customer)
            assert.equal(result, false, 'Customer is no longer staking after unstaking')
        })
    })

})
