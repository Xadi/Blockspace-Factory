import React from 'react'
import Tabs from 'react-bootstrap/lib/Tabs'
import Tab from 'react-bootstrap/lib/Tab'
import DisplayContracts from './DisplayContracts'
import CreateLeaseForm from './CreateLeaseForm'

class DisplayTabs extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: 1,
    };
  }

  handleSelect(key) {
    this.setState({ key });
  }

  componentDidMount() {
    this.props.leasesAddressesOwned
  }

  render() {
    return (
      <div >
        <br/>
        <table>
          <tbody>
            <tr>
              <th> Your account: {this.props.account} </th>
              <th> Your balance: {this.props.accountBalance.toString()} ETH </th>
            </tr>
          </tbody>
        </table>
        <br/>
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="controlled-tab-example"
        >
          <Tab  eventKey={1} title="Landlord Contracts">
            <br/>
            <CreateLeaseForm account={this.props.account} createLease={this.props.createLease} />
            {/*<DisplayContracts 
                  leases={this.props.leasesLandlord}
                  signLease={this.props.signLease}
                  payDeposit={this.props.payDeposit}
                  type="landlord"
                  payRent={this.payRent}
                  withdrawRent={this.withdrawRent} />*/}
          </Tab>
          <Tab  eventKey={2} title="Tenant Contracts">
           {/* <DisplayContracts 
                  leases={this.props.leasesTenant}
                  signLease={this.props.signLease}
                  payDeposit={this.props.payDeposit}
                  type="tenant"
                  payRent={this.props.payRent}
                  withdrawRent={this.props.withdrawRent} />*/}
          </Tab>
          <Tab  eventKey={3} title="Litigator Contracts" >
            {/*<DisplayContracts 
                  leases={this.props.leasesLitigator}
                  signLease={this.props.signLease}
                  payDeposit={this.props.payDeposit}
                  type="litigator"
                  payRent={this.props.payRent}
                  withdrawRent={this.props.withdrawRent} />*/}
          </Tab>
        </Tabs>
        <br/>
      </div>
    );
  }

}

export default DisplayTabs