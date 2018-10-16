import React from 'react'

class DisplayActions extends React.Component {

  constructor(props) {
    super(props);

    this.handleSignLease = this.handleSignLease.bind(this);
    this.handlePayDeposit = this.handlePayDeposit.bind(this);
    this.handleWithdrawRent = this.handleWithdrawRent.bind(this);
    this.handlePayRent = this.handlePayRent.bind(this);
  }

  handleSignLease(event) {
    event.preventDefault()
    this.props.signLease(this.props.index)
  }

  handlePayDeposit(event) {
    event.preventDefault()
    var temp = ( this.props.lease.depositToPay * Math.pow(10,18) )
    this.props.payDeposit(this.props.index, temp)
  }

  handlePayRent(event) {
    event.preventDefault()
    var temp = ( this.props.lease.rentPerMonth * Math.pow(10,18) )
    this.props.payRent(this.props.index, temp)
  }

  handleWithdrawRent(event) {
    event.preventDefault()
    this.props.withdrawRent(this.props.index)
  }

  render() {

    switch(this.props.type) {

      case "landlord":
        
          switch(this.props.lease.state) {
            case "created": {
              return null
            }
            case "signed": {
              return null
            }
            case "active": {
              if (this.props.lease.balanceToBeWithdrawn > 0) {
                return (
                    <td>
                      <button onClick={this.handleWithdrawRent} className='btn btn-primary'>handleWithdrawRent</button>
                    </td>
                  )
              }
            }
            default : 
              return null
          }

      case "tenant":  

          switch(this.props.lease.state) {
            case "created": {
              return (
                <td>
                  <button onClick={this.handleSignLease} className='btn btn-primary'>Sign</button>
                </td>
              )
            }
            case "signed": {
              return (
                <td>
                  <button onClick={this.handlePayDeposit} className='btn btn-primary'>Pay Deposit</button>
                </td>
              )
            }
            case "active": {
              return (
                <td>
                  <button onClick={this.handlePayRent} className='btn btn-primary'>Pay Rent</button>
                </td>
              )
            }
            case "complete": {
              return null
            }
            default : 
              return null
          }

      case "litigator":
        return null

    }
  }

}

export default DisplayActions
