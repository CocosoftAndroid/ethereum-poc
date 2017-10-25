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

import StockPhotos_artifacts from '../../build/contracts/StockPhotos.json'

var StockPhotos = contract(StockPhotos_artifacts);

var accounts;
var account;
var balance;
var switchRate = 10;
var myContractInstance;
var photoContainerHTML;
var photosCount;

window.uploadPhoto =function() {
  setStatus("Uploading photo");
  var file = document.getElementById('fileUpload').files[0];
  $.ajax({
    url:"http://localhost:8500/bzzr:/",
    type: "POST",
    data: file,
    processData: false,
    success: function(result){
      console.log("result:: "+result);
      uploadThumbnail(result);
    },
    error: function(result){
      console.log(result);
    }
  });
}

function uploadThumbnail(photoID){
  var thumbFile = document.getElementById('thumbnailUpload').files[0];
  $.ajax({
    url:"http://localhost:8500/bzzr:/",
    type: "POST",
    data: thumbFile,
    processData: false,
    success: function(result){
      setStatus("Uploaded Photo.Hash: "+result);
      var htmlStr = "<img src=\"http://localhost:8500/bzzr:/"+result+"?content_type=image/jpeg\" width=\"300px\">";
      $("#uploadedPhoto").html(htmlStr);
      newPhoto(photoID,result);
    },
    error: function(result){
      console.log(result);
    }
  });
}

function refreshBalance(){
	$('#cb_balance').html(web3.fromWei(web3.eth.getBalance(web3.eth.coinbase), "ether").toFixed(5));
}


function setStatus(message){
	$('#status').html(message);
};

function newPhoto(photoID,thumbnailID){
  var title = $("#title").val();
  var tags = $("#tags").val();
  var price = parseFloat($("#price").val());
  StockPhotos.deployed().then(function(contractInstance) {
    contractInstance.newPhoto(photoID.toString(),thumbnailID.toString(),title.toString(),tags.toString(),price,{from:web3.eth.accounts[0],gas:2000000}).then(
      function(result){
        console.log(result);
        return contractInstance.numPhotos.call();
      }).then(function(numPhotos){
        console.log(numPhotos);
        $("#cf_numPhotos").html(numPhotos.toNumber());
        photosCount = numPhotos.toNumber();
        return contractInstance.photoExists.call(thumbnailID);
      }).then(function(exists){
        console.log(exists);
        if(exists){
          setStatus("Photo Submitted");
        }else {
          setStatus("Error in Submitting Photo")
        }
        refreshBalance();
      });
  });

}
 window.getPhotoWithIndex = function(index){
    StockPhotos.deployed().then(function(contractInstance) {
      contractInstance.getPhotoWithIndex.call(index).then(function(result){
        console.log(result);
          photoContainerHTML += "<img src=\"http://localhost:8500/bzzr:/"+result[0]+"?content_type=image/jpeg\" width=\"350px\" style=\"float: left;margin:0 20px 20px 0;\">";
          photoContainerHTML += "<h2>"+result[2]+"</h2>";
          photoContainerHTML += "<p>Tags: "+result[3]+"</p>";
          photoContainerHTML += "<p>Author Address: "+result[1]+"</p>";
          photoContainerHTML += "<p>Upload timestamp: "+result[4]+"</p>";
          photoContainerHTML += "<p>Downloads: "+result[6]+"</p>";
          photoContainerHTML += "<p>Price: "+result[5]+"</p>";

          photoContainerHTML += "<button class=\"btn btn-primary btn-lg\" onclick=\"buyPhoto('"+result[0]+"','"+result[5]+"');\">BUY</button> ";

          photoContainerHTML += "<br><br><br><br>";
          console.log(photoContainerHTML);
          $("#photosContainer").html(photoContainerHTML);


      });
    });
}

window.buyPhoto = function(thumbnailID,price){
  console.log(thumbnailID);
  console.log(price);
  StockPhotos.deployed().then(function(contractInstance) {
    contractInstance.buyPhoto(thumbnailID,{from:web3.eth.accounts[0],gas:2000000,value: parseFloat(price)}).then(
      function(result){
        return contractInstance.getPhotoWithID.call(thumbnailID);
      }).then(function(result){
        var photoURL = "http://localhost:8500/bzzr:/"+result+"?content_type=image/jpeg";
        console.log(photoURL);
        $("#downloadContainer").attr("href",photoURL);
        document.getElementById('downloadContainer').click();
      });

  });
}

window.getPhotos = function(){
  photoContainerHTML="";
  console.log("photo count :"+photosCount);
  for(var i=0;i<photosCount;i++){
    getPhotoWithIndex(i);
  }
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
	StockPhotos.setProvider(window.web3.currentProvider);

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


  StockPhotos.deployed().then(function(contractInstance){
    $('#cf_address').html(contractInstance.address);
    $('#cb_address').html(account);

    contractInstance.numPhotos.call().then(function(numPhotos){
      $('#cf_numPhotos').html(numPhotos.toNumber());
      photosCount = numPhotos.toNumber();

      refreshBalance();
    });
});
});
});
