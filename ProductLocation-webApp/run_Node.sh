var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.0.104:8545"));
code = fs.readFileSync('productLocation.sol').toString()
solc = require('solc')
compiledCode = solc.compile(code)
abiDefinition = JSON.parse(compiledCode.contracts[':productLocation'].interface)
myContract = web3.eth.contract(abiDefinition)
byteCode = compiledCode.contracts[':productLocation'].bytecode
var waitTill = new Date(new Date().getTime() + seconds * 4000);
while(waitTill > new Date()){}
deployedContract = myContract.new({data: byteCode, from: web3.eth.accounts[0], gas: 1000000})
deployedContract.address
contractInstance = myContract.at(deployedContract.address)
contractInstance.addProdInfo('10','Iphone','USA',{from: web3.eth.accounts[0],gas:2000000})

contractInstance.addProdInfo('10','Iphone','IN',{from: web3.eth.accounts[0],gas:2000000})

contractInstance.addProdInfo('11','MOTO','USA',{from: web3.eth.accounts[0],gas:2000000})

contractInstance.getProductDetails.call('10')
