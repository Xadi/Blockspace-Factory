import React from 'react'
import DisplayActions from './DisplayActions'

class DisplayDetailContracts extends React.Component {

  render() {

      return (

        
        <table>
          <thead>
            <tr>
              <th>Landlord</th>
              <th>Tenant</th>
              <th>Litigator</th>
            </tr>
          </thead>
          <tbody >

                <tr key={this.props.lease.key}>
                  <td> {this.props.lease.landlord.substring(0,4) + "..." + this.props.lease.landlord.substring(this.props.lease.landlord.length-4,this.props.lease.landlord.length)} </td>
                  <td> {this.props.lease.tenant.substring(0,4) + "..." + this.props.lease.tenant.substring(this.props.lease.tenant.length-4,this.props.lease.tenant.length)} </td>
                  <td> {this.props.lease.litigator.substring(0,4) + "..." + this.props.lease.litigator.substring(this.props.lease.litigator.length-4,this.props.lease.litigator.length)} </td>
                  <td> Rent per month: {this.props.lease.rentPerMonth.toString() } ETH</td>
                  <td> Deposit: {this.props.lease.depositToPay.toString() } ETH</td>

                  <DisplayActions 
                    lease={this.props.lease}
                    type={this.props.type}
                    signLease={this.props.signLease}
                    payDeposit={this.props.payDeposit}
                    index={this.props.lease.key}
                    payRent={this.props.payRent}
                    withdrawRent={this.props.withdrawRent} /> 

                </tr>

          </tbody>
        </table> 
    
      );
    }

}

export default DisplayDetailContracts