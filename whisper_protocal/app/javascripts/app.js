import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

/*
 * When you compile and deploy your Maintenance contract,
 * truffle stores the abi and deployed address in a json
 * file in the build directory. We will use this information
 * to setup a Maintenance abstraction. We will use this abstraction
 * later to create an instance of the Maintenance contract.
 * Compare this against the index.js from our previous tutorial to see the difference
 * https://gist.github.com/maheshmurthy/f6e96d6b3fff4cd4fa7f892de8a1a1b4#file-index-js
 */

import SmartSwitch_artifacts from '../../build/contracts/SmartSwitch.json'

var SmartSwitch = contract(SmartSwitch_artifacts);

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

window.buySubscription = function(buy) {
  let numDays = $("#numDays").val();
  //var numDays = parseFloat($("$numDays").val());
  var subscriptionTotal = numDays * switchRate * 86400;
  setStatus("Initiating transaction ....(please wait)");
  console.log("subscriptionTotal "+subscriptionTotal);
  console.log("account"+account);
  SmartSwitch.deployed().then(function(contractInstance) {
  contractInstance.buySubscription({
    from:account,
    value: subscriptionTotal
  }).then(function(){
    return contractInstance.numUsers.call();
  }).then (function(numUsers){
    $('#cf_numUsers').html(numUsers.toNumber());
    return contractInstance.users.call(account);
  }).then(function(user){
    console.log(user);
    setStatus('');
    $('#cf_userAmountPaid').html(user[0].toNumber());
    $('#cf_usersAuthorizedTill').html(user[1].toNumber());
    return contractInstance.isUserAuthorized.call(account);
  }).then(function(result){
    console.log(result);
    if(result == true){
      $('#cf_authStatus').html('Active');
      $('#toggle-event').removeAttr('disabled');
    }else {
      $('#cf_authStatus').html('Inactive');
      $('#toggle-event').attr('disabled');
    }
    refreshBalance();
  });
});
}



function setStatus(message){
	$('#status').html(message);
};

window.showTotal = function(total){
	let numDays = $("#numDays").val();
  console.log('inside showTotal func');
	var subscriptionTotal = numDays * switchRate * 86400;
  console.log('subscriptionTotal  '+subscriptionTotal);
  var subscriptionTotalEth = web3.fromWei(subscriptionTotal,"ether");
  console.log('subscriptionTotalEth'+subscriptionTotalEth);
	$('#subscriptionTotal').html(subscriptionTotalEth);
}

function refreshBalance(){
	$('#cb_balance').html(web3.fromWei(web3.eth.getBalance(web3.eth.coinbase), "ether").toFixed(5));
}




function sendMessage(options) {
  console.log("web3 version:",web3.version.api);
  var identity ='62b530fa3249f6a54fd34b5d0e20fb2aeea566c2fa0e3559d5d9caf0758f8604';// web3.shh.addSymKey(web3.shh.getSymKey(web3.shh.newSymKey()))
  var data = {
    from: options.from,
    target:options.target
  };
  var message = {
    symKeyId: identity,
    topic: web3.fromAscii('whis'),
    payload: web3.fromAscii(JSON.stringify(data)),
    ttl: 50,
    workToProve: 100,
    powTime: 5,
    powTarget:0.2
  };
  console.log(message);
  var result = web3.shh.post(message);
  if(result == true)
  {
    console.log("posted the message:",result);
  }
  else {
    console.log("posted the message:",result);
  }
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




$( document ).ready(function(){
  $('#toggle-event').change(function(){
    if($(this).prop('checked') ==  true){
      console.log('Switch on ');
      turnON();
    } else {
      console.log('Switch off');
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
	  	window.web3 = new Web3(new Web3.providers.HttpProvider("http://0.0.0.0:8545"));
	  //	window.web3 = new Web3(new Web3.providers.HttpProvider("http://10.1.10.85:8545"));
	    console.log("Connected to localhost - else->"+window.web3);
	  }
	//Maintenance.setProvider(web3.currentProvider);
	SmartSwitch.setProvider(window.web3.currentProvider);

	web3.eth.getAccounts(function(err, accs){
		if(err !=null){
			alert('There was an error fetching your accounts.'+err);
			return;
		}
		if(accs.length == 0){
			alert("Coundn't get any accounts!");
			return;
		}

		console.log('No of accounts->'+accs.length);
		accounts = accs;
		account = accounts[0];
    console.log('No of accounts->'+account);


  SmartSwitch.deployed().then(function(contractInstance){
    $('#cf_address').html(contractInstance.address);
    $('#cb_address').html(account);
    $('#cf_userAddress').html(account);
    options.from = account;
    options.to = contractInstance.address;
    contractInstance.numUsers.call().then(function(numUsers){
      $('#cf_numUsers').html(numUsers.toNumber());
      return contractInstance.rate.call();
    }).then(function(rate){
      switchRate = rate.toNumber();
      $('#cf_rate').html(rate.toNumber());
      return contractInstance.users.call(account);
    }).then(function(user){
      $('#cf_userAmountPaid').html(user[0].toNumber());
      $('#cf_usersAuthorizedTill').html(user[1].toNumber());
      return contractInstance.isUserAuthorized.call(account);
    }).then(function(result){
      console.log(result);
      if(result == true){
        $('#cf_authStatus').html('Active');
        $('#toggle-event').removeAttr('disabled');
      } else {
        $('#cf_authStatus').html('Inactive');
        $('#toggle-event').attr('disabled');
      }
      refreshBalance();
    });
  });


});
});
