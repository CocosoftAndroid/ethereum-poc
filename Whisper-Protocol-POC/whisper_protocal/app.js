var accounts;
var account;
var balance;
var switchRate = 10;
var myContractInstance;
var options = {
  from:'0X0',
  to: '0X0',
  target: 'OFF'
}

function initializeContract() {
  myContractInstance = SmartSwitch.deployed();
  $('#cf_address').html(myContractInstance.address);
  $('#cb_account').html(account);
  $('#cb_userAddress').html(account);
  options.from = account;
  options.to = myContractInstance.address;

  myContractInstance.numUsers.call.then(
    function(numUsers){
      $('#cf_numUsers').html(numUsers.toNumber());
      return myContractInstance.rate.call();
    }).then(function(rate){
      switchRate = rate.toNumber();
      $('#cf_rate').html(rate.toNumber());
      return myContractInstance.users.call(account);
    }).then(function(user){
      console.log(user);
      $('#cf_userAmountPaid').html(user[0].toNumber());
      $('#cf_usersAuthorizedTill').html(user[1].toNumber());
      return myContractInstance.isUserAuthorized.call(account);
    }).then(function(result){
      console.log(result);
      if(result == true){
        $('#cf_authStatus').html('Active');
        $('#toggle-event').removeAttr('disabled');
      } else {
        $('#cf_authStatus').html('Inactive');
        $('#toggle-event').html('disabled');
      }
      refreshBalance();
    });


}

function setStatus(message){
	$('#status').html(message);
};

function showTotal(){
	var numDays = $('#numDays').val();
	var subscriptionTotal = numDays * switchRate * 86400;
  var subscriptionTotalEth = web3.fromWei(subscriptionTotal,"ether");
	$('#subscriptionTotal').html(ticketAmount);
};

function refreshBalance(){
	$('#cb_balance').html(web3.fromWei(web3.eth.getBalance(web3.eth.coinbase), "ether").toFixed(5));
}

function buySubscription() {
  var numDays = parseFloat($("$numDays").val());
  var subscriptionTotal = numDays * switchRate * 86400;
  setStatus("Initiating transaction ....(please wait)");
  myContractInstance.buySubscription({
    from:web3.eth.coinbase,
    value: subscriptionTotal
  }).then(function(){
    return myContractInstance.numUsers.call();
  }).then (function(numUsers){
    $('#cf_numUsers').html(numUsers.toNumber());
    return myContractInstance.users.call(account);
  }).then(function(user){
    console.log(user);
    setStatus('');
    $('#cf_userAmountPaid').html(user[0].toNumber());
    $('#cf_usersAuthorizedTill').html(user[1].toNumber());
    return myContractInstance.isUserAuthorized.call(account);
  }).then(function(result){
    console.log(result);
    if(result == true){
      $('#cf_authStatus').html('Active');
      $('#toggle-event').html('disabled');
    }else {
      $('#cf_authStatus').html('Inactive');
      $('#toggle-event').html('disabled');
    }
    refreshBalance();
  });
}


function sendMessage(options) {
  var data = {
    from: options.from,
    target:options.target
  };
  var message = {
    topics: [web3.fromAscii(options.to)],
    payload: web3.fromAscii(JSON.stringify(data)),
    ttl: 50,
    workToProve: 100
  };
  console.log(messsage);
  web3.shh.post(message);
}

function turnON() {
  options.target = 'ON';
  $('#switchStatus').html('Switch ON');
  sendMessage(options);
}
function turnOFF() {
  options.target = 'OFF';
  $('#switchStatus').html('Switch OFF');
  sendMessage(options);
}

window.onload = function() {
  $('toggle-event').change(function(){
    if($(this).prop('checked') ==  true){
      turnON();
    } else {
      turnOFF();
    }
  });
  if (typeof web3 !== 'undefined') {
	    console.warn("Using web3 detected from external source like AWS")
	    // Use Mist/MetaMask's provider
	   // window.web3 = new Web3(web3.currentProvider);
	   window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	 //  window.web3 = new Web3(new Web3.providers.HttpProvider("http://10.1.10.85:8545"));
	   console.log("Connectiong to localhost - if->"+window.web3);
	  	//window.web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-34-210-156-191.us-west-2.compute.amazonaws.com:8000"));
	  } else {
		 // console.warn("Using web3 detected from external source like AWS")
	   // console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
	    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
	   // window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	// window.web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-34-210-156-191.us-west-2.compute.amazonaws.com:8000"));
	  // console.log("Connectiong to remote->"+window.web3);
	  	window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	  //	window.web3 = new Web3(new Web3.providers.HttpProvider("http://10.1.10.85:8545"));
	    console.log("Connected to localhost - else->"+window.web3);
	  }
	//Maintenance.setProvider(web3.currentProvider);
	Maintenance.setProvider(window.web3.currentProvider);

	web3.eth.getAccounts(function(err, accs){
		if(err !=null){
			alert('There was an error fetching your accounts.');
			return;
		}
		if(accs.length == 0){
			alert("Coundn't get any accounts!");
			return;
		}

		console.log('No of accounts->'+accs.length);
		accounts = accs;
		account = accounts[1];
		initializeContract();
});
}
