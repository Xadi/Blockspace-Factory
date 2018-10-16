pragma solidity ^0.4.2;
import './Lease.sol';

contract LeasesFactory {

    mapping (address => address[]) public ownerToLeasesAddresses;
    mapping (address => uint) public ownershipContractCount;

    uint public totalLeasesCount;

    event leaseCreatedEvent (
        address index
    );

    event leaseSignedEvent (
    	address index
    );

    event depositFullEvent (
    	address index 
    );

    event rentPaidMonth (
    	address index
    );	

    event rentWithdrawn (
    	address index
    );
    
    function leaseCreatedEventCall(address _index) public {
        emit leaseCreatedEvent(_index);
    }
    
    function leaseSignedEventCall(address _index) public {
        emit leaseSignedEvent(_index);
    }
    
    function depositFullEventCall(address _index) public {
        emit depositFullEvent(_index);
    }
    
    function rentPaidMonthCall(address _index) public {
        emit rentPaidMonth(_index);
    }
    
    function rentWithdrawnCall(address _index) public {
        emit rentWithdrawn(_index);
    }

	constructor() public {
	}

    // Create a new Lease -- deploy a new Lease contract
	function createLease(
						address _tenant, 
						address _litigator, 
						string _physicalAddress, 
						uint _rentPerMonth, 
						uint _deposit
                        ) 
		public 
		returns(bool) 
		{
		    // Deploy a new Lease Contract, store its adress
    		address newLease = new Lease(
    		    msg.sender,  
				_tenant, 
				_litigator, 
				_physicalAddress, 
				_rentPerMonth, 
				_deposit);
				
            // keep track of Leases Ethereum adresses
			ownerToLeasesAddresses[msg.sender].push(newLease);
			ownershipContractCount[msg.sender]++;
			emit leaseCreatedEvent(newLease);
			totalLeasesCount++;
			return true;
		}

	function getLeaseAddressByOwnerByIndex(address _owner, uint _index)
		public
		view
		returns(address) {

			return ownerToLeasesAddresses[_owner][_index];

	}
 
}

