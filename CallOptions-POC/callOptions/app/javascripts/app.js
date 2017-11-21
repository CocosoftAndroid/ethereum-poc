/*
MIT License

Copyright (c) 2017 Arshdeep Bahga and Vijay Madisetti

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
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

import call_artifacts from '../../build/contracts/CallOption.json'

var callOption = contract(call_artifacts);



var accounts;
var account;
var balance;
var ticketPrice;
var contractInstance;



function setStatus(message) {
  $("#status").html(message);
};

function setStatus1(message) {
  $("#status1").html(message);
};

function setStatus2(message) {
  $("#status2").html(message);
};

function refreshVars(){
  callOption.deployed().then(function(contractInstance) {
  contractInstance.buyer.call().then(
      function(buyer) {
        $("#cf_buyer").html(buyer);
        return contractInstance.seller.call();
      }).then(
      function(seller) {
        $("#cf_seller").html(seller);
        return contractInstance.strikePrice.call();
      }).then(
      function(strikePrice) {
        $("#cf_strikePrice").html(strikePrice.toNumber());
        return contractInstance.premium.call();
      }).then(
      function(premium) {
        $("#cf_premium").html(premium.toNumber());
        return contractInstance.underlyingName.call();
      }).then(
      function(underlyingName) {
        $("#cf_underlyingName").html(underlyingName);
        return contractInstance.underlying.call();
      }).then(
      function(underlying) {
        $("#cf_underlying").html(underlying.toNumber());
        return contractInstance.startTime.call();
      }).then(
      function(startTime) {
        $("#cf_startTime").html(startTime.toNumber());
        return contractInstance.timeToExpiry.call();
      }).then(
      function(timeToExpiry) {
        $("#cf_timeToExpiry").html(timeToExpiry.toNumber());
        return contractInstance.isActive.call();
      }).then(
      function(isActive) {
        if(isActive){
          $("#cf_isActive").html("True");
        }else{
          $("#cf_isActive").html("False");
        }
        return contractInstance.isComplete.call();
      }).then(
      function(isComplete) {
        if(isComplete){
          $("#cf_isComplete").html("True");
        }else{
          $("#cf_isComplete").html("False");
        }
        setStatus("");
        setStatus1("");
        setStatus2("");
        refreshBalance();
      });
    });
}

function refreshBalance() {
  var balance = web3.fromWei(web3.eth.getBalance(web3.eth.coinbase),
                            "ether").toFixed(5);
  $("#cb_balance").html(balance);
  $("#cb_balance1").html(balance);
  $("#cb_balance2").html(balance);
}


window.initialize = function() {
  var buyer = $("#buyer").val();
  var strikePrice = parseFloat($("#strikePrice").val());
  var underlyingName = $("#underlyingName").val();
  var underlying = parseFloat($("#underlying").val());
  var premium = parseFloat($("#premium").val());
  var timeToExpiry = parseFloat($("#timeToExpiry").val());

  setStatus("Initiating transaction... (please wait)");
  callOption.deployed().then(function(contractInstance) {
  contractInstance.initialize(buyer, strikePrice,
      underlyingName, underlying, premium, timeToExpiry,
       {gas: 200000, from: accounts[0]}).then(
          function() {
            refreshVars();
          });
});
}


window.validate = function() {
  var amount = parseFloat($("#premiumAmount").val());
  console.log(amount);

  setStatus1("Initiating transaction... (please wait)");
   callOption.deployed().then(function(contractInstance) {
   contractInstance.validate({from: accounts[1],
                              value: amount}).then(
      function() {
        refreshVars();
      });
    });
}

window.exercise = function() {

  var amount = parseFloat($("#callAmount").val());
  console.log(amount);

  setStatus2("Initiating transaction... (please wait)");
   callOption.deployed().then(function(contractInstance) {
   contractInstance.exercise({from: accounts[1],
                              value: amount}).then(
          function() {
            refreshVars();
          });
        });
}

$( document ).ready(function(){
	if (typeof web3 !== 'undefined') {
	    console.warn("Using web3 detected from external source like AWS")

	   window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	 //  window.web3 = new Web3(new Web3.providers.HttpProvider("http://10.1.10.85:8545"));
	   console.log("Connectiong to localhost - if->"+window.web3);
	  	//window.web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-34-210-156-191.us-west-2.compute.amazonaws.com:8000"));
	  } else {

	  	window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	  //	window.web3 = new Web3(new Web3.providers.HttpProvider("http://10.1.10.85:8545"));
	    console.log("Connected to localhost - else->"+window.web3);
	  }

	callOption.setProvider(window.web3.currentProvider);

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
    console.log('account '+accounts[0])
    console.log('account '+accounts[1])
		account = accounts[0];
    callOption.deployed().then(function(contractInstance) {

    $("#cf_address").html(contractInstance.address);
    $("#cb_address").html(account);
    $("#cb_address1").html(account);
    $("#cb_address2").html(account);
    $("#qrcode").html("<img src=\"https://chart.googleapis.com/chart?cht=qr&chs=350&chl="+
      contractInstance.address+"\" height=\"350\"/>");
    refreshVars();

	});
});
});
