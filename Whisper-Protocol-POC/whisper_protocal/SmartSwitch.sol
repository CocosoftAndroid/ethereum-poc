contract SmartSwitch {
  struct User {
    uint amountPaid;
    uint authorizedTill;
  }
  address public owner;
  uint public numUsers;
  uint public rate;
  mapping (address => User) public users;
  function SmartSwitch() {
    owner = msg.sender;
    numUsers = 0;
    rate = 1000000000000;
  }
  function buySubscription() payable public {
    uint duration = (msg.value/rate);
    if(users[msg.sender].amountPaid > 0){
      users[msg.sender].amountPaid+= msg.value;
      users[msg.sender].authorizedTill += duration;
    }
    else {
      User u = users[msg.sender];
          u.amountPaid = msg.value;
          u.authorizedTill = now+duration;
          numUsers = numUsers+1;
    }
  }
  function isUserAuthorized(address userAddr) returns(bool){
    if(users[userAddr].authorizedTill>now){
      return true;
    }
    else{
      return false;
    }
  }
  function destroy() {
    if(msg.sender == owner)
      suicide(owner);
  }
}
