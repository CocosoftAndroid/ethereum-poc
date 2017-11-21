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

import event_artifacts from '../../build/contracts/EventRegistration.json'

var EventReg = contract(event_artifacts);

var accounts;
var account;
var balance;
var ticketPrice;
var myContractInstance;


function setStatus(message) {
  $("#status").html(message);
};

window.showTotal =function(total) {
   var numTickets = $("#numTickets").val();
   var ticketAmount = numTickets*ticketPrice;
  $("#ticketsTotal").html(ticketAmount);
};

function refreshBalance() {
  $("#cb_balance").html(web3.fromWei(
    web3.eth.getBalance(account), "ether").toFixed(5));
}


window.buyTicket = function(buy) {
  let numTickets = parseFloat($("#numTickets").val());
  let ticketAmount = numTickets*ticketPrice;
  let ticketAmountWei = web3.toWei(ticketAmount, "ether");
  console.log('ticketAmountWei '+ticketAmountWei)
  let email = $("#email").val();
  console.log('email '+email)
  var amountAlreadyPaid;
  var amountPaidNow;
  var address;

  setStatus("Initiating transaction... (please wait)");
  EventReg.deployed().then(function(contractInstance) {
  contractInstance.getRegistrantAmountPaid.call(account).then(function(result) {
   amountAlreadyPaid = result.toNumber();

   console.log('amountAlreadyPaid :'+amountAlreadyPaid);

   return contractInstance.buyTicket(email,numTickets, {gas: 200000 ,from: account, value: ticketAmountWei});
    }).then(function(result) {

      return contractInstance.numTicketsSold.call();
    }).then(
    function(numTicketsSold) {
      console.log('numTicketsSold'+numTicketsSold);
      $("#cf_registrants").html(numTicketsSold.toNumber());
      return contractInstance.getRegistrantAmountPaid.call(account);
    }).then(
    function(valuePaid) {
      amountPaidNow = valuePaid.toNumber() - amountAlreadyPaid;
      console.log('valuePaid '+valuePaid)
      console.log('amountPaidNow '+amountPaidNow)
      console.log('ticketAmountWei '+ticketAmountWei)
      if (amountPaidNow == ticketAmountWei) {
        setStatus("Purchase successful");
      } else {
        setStatus("Purchase failed");
      }
      refreshBalance();
    });
  });
}

window.cancelTicket = function(cancel) {
    setStatus("Initiating transaction... (please wait)");
    EventReg.deployed().then(function(contractInstance) {
    contractInstance.getRegistrantAmountPaid.call(account).then(
    function(result) {
      if (result.toNumber() == 0) {
        setStatus("Buyer is not registered - no refund!");
      } else {
        contractInstance.refundTicket(account,{from: accounts[0]}).then(function() {
            return contractInstance.numTicketsSold.call();
          }).then(function(numTicketsSold) {
            $("#cf_registrants").html(numTicketsSold.toNumber());
            return contractInstance.getRegistrantAmountPaid.call(account);
          }).then(function(valuePaid) {
            if (valuePaid.toNumber() == 0) {
              setStatus("Refund successful");
            } else {
              setStatus("Refund failed");
            }
            refreshBalance();
          });
      }
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

	EventReg.setProvider(window.web3.currentProvider);

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

		EventReg.deployed().then(function(contractInstance) {
		$('#cf_address').html(contractInstance.address);
		$("#cb_address").html(account);
    contractInstance.numTicketsSold.call().then(function(numTicketsSold) {
        console.log('numRegistrants'+numTicketsSold);
        $("#cf_registrants").html(numTicketsSold.toNumber());
        return contractInstance.quota.call();
    }).then(
      function(quota) {
        console.log('quota'+quota);
        $("#cf_quota").html(quota.toNumber());
        return contractInstance.price.call();
    }).then(
      function(price) {
        console.log('price'+price);
        ticketPrice = web3.fromWei(price, "ether").toFixed(5);
        console.log('ticketPrice'+ticketPrice)
        $("#cf_price").html(ticketPrice);
        refreshBalance();
    });
		});
	});
});
