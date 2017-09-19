# ethereum-poc
Ethereum Android poc for retriving the product Location based on RFID's on block chain technologies


### 1. Pre-requisites for executing the above example.
		* NPM ,Node, ethereumjs-testrpc are already installed in your environment.
		* Truffle Framework is available .
		* Android is installed and runing in your system.

### 2. Follow the instructions from below link to set up the environment in case required. 
		* https://github.com/CocosoftAndroid/ethereum-poc/blob/master/README.md 

		
Below are instructions to build and deploy the smart contract & Android APP

### 1. Run testrpc(local blockchain RPC server) 
		* Run testrpc - Open your terminal/node js command prompt and run -> testrpc
			ex : testrpc -h <hostname>
### 2. Build & deploy the contract using below commands.
		* Copy the "Product Location" directory to your local machine .
		* Truffe commands to compile and deploy a contract
		   truffle compile
		   truffle migrate
		* After sucessfull deployement ,make a note of deployed contract address ,this needs to be given in android code.
		   
### 3. Make sure to modify the below variables in android code 
		* Set the variable "privateNWUrl" to url of private network (eg : http://192.168.1.109:8545) 
		* Set the variable "productLocationContractAddress" to deployed contract address. 
		* Set the variable "privateKey" to your default ethereum account private key.
		* Run android app.
		
		

		
		
		
		

		
		
		
		
