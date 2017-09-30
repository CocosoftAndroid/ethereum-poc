var mraa = require('mraa');
var Web3 = require('web3');
var gethURL = 'http://192.168.0.106:8545';
var provider = new Web3.providers.HttpProvider(gethURL);
var web3 = new Web3(provider);
var switchStatus='OFF';
var turnedON=false;
var relayPin = new mraa.Gpio(7);

var abi = [ { constant: true,
    inputs: [],
    name: 'numUsers',
    outputs: [ {"name":"","type":"uint256"} ],
    payable: false,
    stateMutability: 'view',
    type: 'function' },
  { constant: false,
    inputs: [],
    name: 'buySubscription',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function' },
  { constant: true,
    inputs: [],
    name: 'rate',
    outputs: [ [Object] ],
    payable: false,
    stateMutability: 'view',
    type: 'function' },
  { constant: false,
    inputs: [],
    name: 'destroy',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function' },
  { constant: false,
    inputs: [ {"name":"userAddr","type":"address"} ],
    name: 'isUserAuthorized',
    outputs: [ {"name":"","type":"bool"}],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function' },
  { constant: true,
    inputs: [],
    name: 'owner',
    outputs: [ [Object] ],
    payable: false,
    stateMutability: 'view',
    type: 'function' },
  { constant: true,
    inputs: [ [Object] ],
    name: 'users',
    outputs: [ [Object], [Object] ],
    payable: false,
    stateMutability: 'view',
    type: 'function' },
  { inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor' } ];

var contractAddress = '0xd0fe2d180583ea53011a0985ccebfc013e3d3cad'; //deployed contract Instance
var myContract = web3.eth.contract(abi);
var myContractInstance = myContract.at(contractAddress);
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}



function turnON() {
  console.log("Switching ON");
  switchStatus='ON';
  relayPin.write(1);
}


function turnOFF() {
  console.log("Switching OFF");
  switchStatus='OFF';
  relayPin.write(0);
}

function setup() {
  console.log("web3 version:", web3.version.api);
  console.log("MRAA Version:",mraa.getVersion());
  relayPin.dir(mraa.DIR_OUT);
  turnOFF();
  web3.shh.newMessageFilter({
    "symKeyID":'62b530fa3249f6a54fd34b5d0e20fb2aeea566c2fa0e3559d5d9caf0758f8604', //identity of the sender
    "topics": [web3.fromAscii("whis")]
  }).watch(function(err,message){
    if(err){
    console.log("filter error message ",err);
  }else {
    var data = {};
    console.log("Message",message);


    try{
      data = JSON.parse(web3.toAscii(message.payload));
      console.log("Payload",data);
    } catch(error){
      return;
    }
    var result = myContractInstance.isUserAuthorized.call(data.from);
    if(result == true){
      if(data.target == 'ON'){
        turnON();
      }else if(data.target == 'OFF'){
        turnOFF();
      }
    }
  }
  });
}

function loop() {
  console.log("inside loop function");
  if(switchStatus == 'ON' && turnedON == false){
    console.log("Switch is now ON");
    turnedON = true;
  }else if(switchStatus == 'OFF' && turnedON == true){
    console.log("Switch is now OFF");
    turnedON = false;
  }
}
setup();
setInterval(loop,2000);
