import "../stylesheets/app.css";


import {
  default as Web3
} from 'web3';
import {
  default as contract
} from 'truffle-contract'

/*
 * When you compile and deploy your Voting contract,
 * truffle stores the abi and deployed address in a json
 * file in the build directory. We will use this information
 * to setup a Voting abstraction. We will use this abstraction
 * later to create an instance of the Voting contract.
 * Compare this against the index.js from our previous tutorial to see the difference
 * https://gist.github.com/maheshmurthy/f6e96d6b3fff4cd4fa7f892de8a1a1b4#file-index-js
 */

import productLocation_artifacts from '../../build/contracts/productLocation.json'
var prodLoc = contract(productLocation_artifacts);


var accounts;
var account;
var myContractInstance;
var htmlString;
var prodCnt = 0;
var cnt = 0;



function initializeContract() {
  myContractInstance = prodLoc.deployed();

  //registerMachine();
  //myContractInstance.methods.getMachineDetails.call().then('Testing->'+console.log);

  console.log('myContractInstance->' + myContractInstance);

  console.log('myContractInstance.address->' + myContractInstance.creator);
  console.log('myContractInstance.address@@@@@@@@@@@->' + myContractInstance);
  $('#cf_address').html(myContractInstance.address);
  //$('#cf_address').html(myContractInstance.address);
  //console.log('myContractInstance.address->'+myContractInstance.address);
  $('#cf_address').html(account);
  console.log('account.address->' + account);
  //	$('#cf_machines').html(myContractInstance.numMachines);
  //	console.log('cf_machines->'+myContractInstance.numMachines);

}

function setStatus(message) {
  $('#status').html(message);
}


window.addProdInfo = function(prod) {


  let rfID = $("#r_rfID").val();
  let productName = $("#r_productName").val();
  let location = $("#r_location").val();


  try {
    $("#msg").html("Adding the Location information has been submitted. The block count will increment as soon as the Location is added on the blockchain. Please wait.")
    $("#r_rfID").val("");
    $("#r_productName").val("");
    $("#r_location").val("");


    prodLoc.deployed().then(function(contractInstance) {
      contractInstance.addProdInfo(rfID, productName, location, {
        gas: 140000,
        from: web3.eth.accounts[0]
      }).then(
        function(result) {
          console.log('Add location details->' + result);
          contractInstance.prodCnt.call().then(function(m) {
            console.log('product count ' + m);
            console.log('prodCnt' +prodCnt);
            if (m.toNumber() > prodCnt) {
              cnt = m.toNumber();
              console.log('Location information added!');
              $("#msg").html("Location information added Successfully!");

            } else {
              console.log('Couldnt add product location');
              $("#msg").html("Failed! Try again......");
            }
          });
        });
    });
  } catch (err) {
    console.log(err);
  }
}
window.getProductDetails = function(prod) {
  var rfID = $("#s_rfID").val();;

  console.log('New Onclick rfID->' + rfID);
  htmlString = '<table class="table"><tr></tr><th>LOCATIONS</th></tr>';


  prodLoc.deployed().then(function(contractInstance)  {
    contractInstance.getrfIdCount.call(rfID).then(function(m) {
      console.log('resultNew-M->' + m);
      if (m.toNumber()) {
          cnt = m.toNumber();
          for (var i = 0; i < cnt; i++) {
            contractInstance.getProductDetails.call(rfID, i).then(function(m) {
              console.log('resultNew-M->' + m);
              if (m.toString()) {
              htmlString = htmlString + '<tr><td>' + m.toString() + '</td></tr>';
              console.log('Locations retrived');

              } else {
                console.log('Failed in Location details');
              }
              if(i == cnt)
              {
                contractInstance.getProductName.call(rfID).then(function(p){
                  var pName = '<tr></tr><td>PRODUCT NAME';
                  pName = pName +': '+ p.toString() +'</td></tr>' ;
                $("#p_name").html(pName);
                $("#loc").html(htmlString);
                console.log('inside if loop '+htmlString);
              });
              }

            });

          }
      } else {
        $("#p_name").html("");
        $("#loc").html("Locations not found");
        console.log('Failed to get the count');
      }

    });


  });


}


$(document).ready(function() {
  $("#r_purchaseDate").val($.now());
  $("#s_timeStamp").val($.now());

  if (typeof web3 !== 'undefined') {

    window.web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.0.104:8545"));

    console.log("Connectiong to localhost - if->" + window.web3);
    //window.web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-34-210-156-191.us-west-2.compute.amazonaws.com:8000"));
  } else {

    window.web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.0.104:8545"));
    //	window.web3 = new Web3(new Web3.providers.HttpProvider("http://10.1.10.85:8545"));
    console.log("Connected to localhost - else->" + window.web3);
  }
  //prodLoc.setProvider(web3.currentProvider);
  prodLoc.setProvider(window.web3.currentProvider);

  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert('There was an error fetching your accounts.');
      return;
    }
    if (accs.length == 0) {
      alert("Coundn't get any accounts!");
      return;
    }

    console.log('No of accounts->' + accs.length);
    accounts = accs;
    account = accounts[1];
    //initializeContract();

    prodLoc.deployed().then(function(contractInstance) {
      $('#cf_address').html(contractInstance.address);
      contractInstance.prodCnt.call().then(function(s){
				prodCnt = s.toNumber();
        console.log('product count '+prodCnt);
			});
      console.log('account.address->' + account);
      web3.eth.defaultAccount = web3.eth.coinbase;
      console.log('defaultAccount->' + web3.eth.defaultAccount);



    });
  });

});
