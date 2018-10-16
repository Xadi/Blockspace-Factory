pragma solidity ^0.4.2;
import './LeasesFactory.sol';

contract Lease {

	address public leasesFactoryAddress;
	LeasesFactory public leasesFactory ;

   	address public landlord; 
   	address public tenant;
   	address public litigator;
   	string public physicalAddress;
   	string public hashId;
   	string public state;
   	bool public signature; 
   	address public index;
   	uint public rentPerMonth;
   	uint public depositToPay;
   	uint public depositPaid;
   	uint public totalRentToPay;
   	uint public rentPaid;
   	uint public durationInMonth;
   	uint public balanceToBeWithdrawn;

   	constructor(
   	    address _landlord,
   	    address _tenant, 
		address _litigator, 
		string _physicalAddress, 
		uint _rentPerMonth, 
		uint _deposit
   	    ) 
   	    public 
   	    { 
   	    
   	    leasesFactoryAddress = msg.sender;
   	    leasesFactory = LeasesFactory(leasesFactoryAddress);
   	    
   	    landlord = _landlord;
   	    tenant = _tenant;
		litigator = _litigator; 
		physicalAddress = _physicalAddress;
		index = address(this);
		rentPerMonth = _rentPerMonth;
		depositToPay = _deposit;
		
		state="created";
		durationInMonth = 1;
   	    signature = false;
   	    hashId = 'test';
   	    totalRentToPay = 1*_rentPerMonth;
   	    rentPaid=0;
   	    balanceToBeWithdrawn=0;
   	}  
    
    function signLease() 
		public
		returns(bool)
		{
			require(msg.sender == tenant);
			signature = true;
			state="signed";
			leasesFactory.leaseSignedEventCall(index);
			return true;
		}

	function payDeposit()
		public 
		payable
		returns(bool)
		{
			require(msg.sender == tenant);
			depositPaid += msg.value;
			state = "active";
			leasesFactory.depositFullEventCall(index);
			return true;
		}

	function payRent()
		public
		payable
		returns(bool)
		{
			require(msg.sender == tenant);
			rentPaid += msg.value;
		    balanceToBeWithdrawn += msg.value;
			leasesFactory.rentPaidMonthCall(index);
			if (rentPaid >= totalRentToPay) {
				state = "complete";
				tenant.transfer(depositPaid);
				depositPaid = 0;
			}
			return true;
		}

	function withdrawRent()
		public
		returns(bool)
		{
			require(msg.sender == landlord);
			address(landlord).transfer(balanceToBeWithdrawn);
			balanceToBeWithdrawn = 0;
		}

}