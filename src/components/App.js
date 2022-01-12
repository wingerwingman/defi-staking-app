import React, {Component} from "react";
import './App.css';
import Navbar from './Navbar';
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json';
import RWD from '../truffle_abis/RWD.json';
import ClimbCoin from '../truffle_abis/ClimbCoin.json';
import DecentralBank from '../truffle_abis/DecentralBank.json';
import Main from './Main.js';
import ParticleSettings from './ParticleSettings.js'

class App extends Component {

    async UNSAFE_componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
            } else if(window.web3) {
                    window.web3 = new Web3(window.web3.currentProvider)
            } else {
                    window.alert('No ethereum browser detected! You can check out MetaMask!')
            }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.setState({account: accounts[0]})
        const networkId = await web3.eth.net.getId()
        
        const tetherData = Tether.networks[networkId]
        if(tetherData) {
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address)
            this.setState({tether})
            let tetherBalance = await tether.methods.balanceOf(this.state.account).call()
            this.setState({tetherBalance: tetherBalance.toString()})
            console.log({balance: tetherBalance}, 'tether')
        } else {
            window.alert('Error! Tether contract not deployed - no detected network!')
        }

        const rwdData = RWD.networks[networkId]
        if(rwdData) {
            const rwd = new web3.eth.Contract(RWD.abi, rwdData.address)
            this.setState({rwd})
            let rwdBalance = await rwd.methods.balanceOf(this.state.account).call()
            this.setState({rwdBalance: rwdBalance.toString()})
            console.log({balance: rwdBalance}, 'rwd')
        } else {
            window.alert('Error! RWD contract not deployed - no detected network!')
        }

        const decentralBankData = DecentralBank.networks[networkId]
        if(decentralBankData) {
            const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address)
            this.setState({decentralBank})
            let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call()
            this.setState({stakingBalance: stakingBalance.toString()})
            console.log({balance: stakingBalance}, 'staking')
        } else {
            window.alert('Error! Decentral Bank contract not deployed - no detected network!')
        }

        const climbCoinData = ClimbCoin.networks[networkId]
        if(climbCoinData) {
            const climbCoin = new web3.eth.Contract(ClimbCoin.abi, climbCoinData.address)
            this.setState({climbCoin})
            let climbCoinBalance = await climbCoin.methods.balanceOf(this.state.account).call()
            this.setState({climbCoinBalance: climbCoinBalance.toString()})
            console.log({balance: climbCoinBalance}, 'climb coin')
        } else {
            window.alert('Error! Climb Coin contract not deployed - no detected network!')
        }
        
        this.setState({loading: false})
    }

    stakeTokens = (amount) => {
        this.setState({loading: true})
        this.state.tether.methods.approve(this.state.decentralBank._address, amount).send({from: this.state.account}).on('transactionHash', (hash) => {
            this.state.decentralBank.methods.depositTokens(amount).send({from: this.state.account}).on('transactionHash', (hash) => {
                this.setState({loading: false})
            })
        })
    }

    unstakeTokens = () => {
        this.setState({loading: true})
            this.state.decentralBank.methods.unstakeTokens().send({from: this.state.account}).on('transactionHash', (hash) => {
                this.setState({loading: false})
            })
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
            tether: {},
            rwd: {},
            climbCoin: {},
            decentralBank: {},
            tetherBalance: '0',
            rwdBalance: '0',
            stakingBalance: '0',
            climbCoinBalance: '0',
            loading: true
        }
    }

    render () {
        let content 
        {this.state.loading ? content = 
        <h1 id='loader' class="centered" className='text-center' style={{margin: '30px', color: 'red', opacity:'.9'}}>
            Loading....</h1> : content = 
            <Main 
                tetherBalance = {this.state.tetherBalance}
                rwdBalance = {this.state.rwdBalance}
                climbCoinBalance = {this.state.climbCoinBalance}
                stakingBalance = {this.state.stakingBalance}
                stakeTokens = {this.stakeTokens}
                unstakeTokens={this.unstakeTokens}
        />}

        return (
            <div className='App' style={{position: 'relative'}}>
                <div style={{position: 'absolute'}}>
                    <ParticleSettings />
                </div>
                
                <Navbar account={this.state.account} />
            
                <div className='container-fluid mt-5' class="centered">
                    <div className='row'>
                        <main role='main' classNmae='col-lg-12 ml-auto mr-auto' sytle={{maxWidth:'600px', minHeight:'100vm'}}>
                            <div>
                                {content}
                            </div>
                        </main>
                    </div>
                </div>

            </div>
        )
    }
}

export default (App);