import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import LeasesFactory from '../../build/contracts/LeasesFactory.json'
import Lease from '../../build/contracts/Lease.json'
import CreateLeaseForm from './CreateLeaseForm'
import DisplayContracts from './DisplayContracts'
import DisplayTabs from './DisplayTabs'
import 'bootstrap/dist/css/bootstrap.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      accountBalance:0,
      totalLeasesCount: 0,
      ownedLeasesCount:0,
      leasesAddressesOwned:[],
      lastLoaded: 0,
    }

    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545')
    }

    this.web3 = new Web3(this.web3Provider)

    this.leasesFactory = TruffleContract(LeasesFactory)
    this.leasesFactory.setProvider(this.web3Provider)


    this.leaseContract = TruffleContract(Lease)
    this.leaseContract.setProvider(this.web3Provider)
    this.leaseContractABI = this.web3.eth.contract(this.leaseContract.abi.abi);

    this.getBalanceAccount = this.getBalanceAccount.bind(this)
    this.updateCount = this.updateCount.bind(this)
    this.loadLeasesAddresses = this.loadLeasesAddresses.bind(this)
    this.watchEvents = this.watchEvents.bind(this)

    this.createLease = this.createLease.bind(this)
    this.signLease = this.signLease.bind(this)
    this.payDeposit = this.payDeposit.bind(this)
    this.payRent = this.payRent.bind(this)
    this.withdrawRent = this.withdrawRent.bind(this)
  }

  componentDidMount() {
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account })
      this.leasesFactory.deployed().then((leasesFactoryInstance) => {
        this.leasesFactoryInstance = leasesFactoryInstance
        this.getBalanceAccount()
        this.watchEvents()
        this.loadLeasesAddresses()
        this.updateCount()
      })
    }) 
  }

  getBalanceAccount () {
    this.web3.eth.getBalance(this.state.account, (err, result) => {        
      var balance = web3.fromWei(result, "ether")
      this.setState({ accountBalance : balance })
    })
  }

  updateCount() {
    this.leasesFactoryInstance.totalLeasesCount().then((totalLeasesCount) => {
      this.setState({totalLeasesCount : totalLeasesCount})
    }) 
  }

  loadLeasesAddresses() {
    this.leasesFactoryInstance.ownershipContractCount(this.state.account).then((ownedLeasesCount) => {
      this.setState({ownedLeasesCount : ownedLeasesCount})
      var leasesAddresses = [];
      for (var i = 0; i < ownedLeasesCount ; i++) {
        this.leasesFactoryInstance.getLeaseAddressByOwnerByIndex(this.state.account, i).then((leaseAddress) => {
          leasesAddresses.push(leaseAddress);
        })
      }
      this.setState({ leasesAddressesOwned: leasesAddresses})
    }) 
  }

  watchEvents() {
    this.leasesFactoryInstance.rentPaidMonth({}, {
      fromBlock: 'latest'
    }).watch((error, event) => {
        this.updateLeaseByIndex(event.args.index)
        this.updateMoneyInSmartContract()
        this.getBalanceAccount()
    })

    this.leasesFactoryInstance.rentWithdrawn({}, {
      fromBlock: 'latest'
    }).watch((error, event) => {
        this.updateLeaseByIndex(event.args.index)
        this.updateMoneyInSmartContract()
        this.getBalanceAccount()
    })

    this.leasesFactoryInstance.leaseSignedEvent({}, {
      fromBlock: 'latest'
    }).watch((error, event) => {
        this.updateLeaseByIndex(event.args.index)
        this.getBalanceAccount()
    })

    this.leasesFactoryInstance.depositFullEvent({}, {
      fromBlock: 'latest'
    }).watch((error, event) => {
        this.updateLeaseByIndex(event.args.index)
        this.updateMoneyInSmartContract()
        this.getBalanceAccount()
    })

    this.leasesFactoryInstance.leaseCreatedEvent({}, {
      fromBlock: 'latest'
    }).watch((error, event) => {
      if ( event.args.index > this.state.lastLoadedIndex ) {
        this.loadLeaseByIndex(event.args.index)
        this.updateCount()
        this.getBalanceAccount()
      }
    })

  }

  createLease(_tenant, _litigator, _physicalAddress, _rent, _deposit ) {
      this.leasesFactoryInstance.createLease(  
        _tenant, 
        _litigator,
        _physicalAddress,  
        _rent,
        _deposit,
        { from: this.state.account })
  }

  signLease(_index) {
    this.leasesFactoryInstance.signLease( _index, { from: this.state.account } )
  }

  payDeposit(_index, _ethAmount) {
    this.leasesFactoryInstance.payDeposit( _index, {from: this.state.account, value: _ethAmount} )
  }

  payRent(_index, _ethAmount) {
    this.leasesFactoryInstance.payRent( _index, {from: this.state.account, value: _ethAmount} )
  }

  withdrawRent(_index) {
    this.leasesFactoryInstance.withdrawRent( _index, {from: this.state.account} )
  }

  render() {
    return (
      <div className='row'>
        <div className='col-lg-12 text-center' >
          <h1>Blockspace</h1>
          <table>
            <tbody>
              <tr>
                <td> Total Number of Leases handled by Blockspace: {this.state.totalLeasesCount.toString() } </td>
              </tr>
            </tbody>
          </table>

          <br/>
        
             <DisplayTabs 
                account={this.state.account} 
                accountBalance={this.state.accountBalance}
                leasesAddressesOwned={this.leasesAddressesOwned}
                signLease={this.signLease}
                payDeposit={this.payDeposit}
                createLease={this.createLease}
                payRent={this.payRent}
                withdrawRent={this.withdrawRent} />

        </div>
      </div>
    )
  }
}

ReactDOM.render(
   <App />,
   document.querySelector('#root')
)
