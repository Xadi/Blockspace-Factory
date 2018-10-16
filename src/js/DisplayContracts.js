import React from 'react'
import DisplayDetailContracts from './DisplayDetailContracts'
import DisplayState from './DisplayState'

class DisplayContracts extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      displayDetails: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i, event) {
    const newDisplayDetails = [...this.state.displayDetails]
    newDisplayDetails[i] = !newDisplayDetails[i] 
    this.setState({ displayDetails: newDisplayDetails })
  }

  render() {

    return this.props.leases.map((lease) => {

      const overview = (
              <div>
                <br/>
                <div className = "leases" >
                  <br/>
                  <table onClick={this.handleClick.bind(this,lease.index)} >
                    <thead>
                      <tr >
                        <th> Contract ID: {lease.index } </th>
                        <th > {lease.physicalAddress} </th>
                        <DisplayState 
                          lease={lease}
                          index={lease.index}
                          signLease={this.props.signLease}
                          payDeposit={this.props.payDeposit}
                          payRent={this.props.payRent}
                          withdrawRent={this.props.withdrawRent} />
                      </tr>
                    </thead>
                  </table>
                  <br/>
                </div>
              </div>
          );

    const detail = (
                  <DisplayDetailContracts 
                        lease={lease}
                        type={this.props.type} 
                        signLease={this.props.signLease}
                        payDeposit={this.props.payDeposit}
                        index={lease.keydex}
                        payRent={this.props.payRent}
                        withdrawRent={this.props.withdrawRent} />
          );

          if (this.state.displayDetails[lease.index]) {
            return (
                <div key={lease.index}>
                  {overview}
                  {detail}
                </div>
              )
          }
          else {
            return (
              <div key={lease.index}>
                {overview}
              </div>
              )
          }
    })   
  }

}

export default DisplayContracts
