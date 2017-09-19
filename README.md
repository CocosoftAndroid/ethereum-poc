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
		* Copy the "ProductLocation-webApp" directory to your local machine .
		* Truffe commands to compile and deploy a contract
		   truffle compile
		   truffle migrate
		* After sucessfull deployement ,make a note of deployed contract address ,this needs to be given in android code.
		   
### 3. Steps to modify and run the android code 
		* Set the variable "privateNWUrl" to url of private network (eg : http://192.168.1.109:8545) 
		* Set the variable "productLocationContractAddress" to deployed contract address. 
		* Set the variable "privateKey" to your default ethereum account private key.
		* Run android app.
		* Add a product details to block chain network by giving RFID,product Name,Latitude & longitude(eg:47.6205099,-122.3514661)
		* Inorder to retrive the locations ,give RFID and click "Get Locations" button .
		* For viewing the location on Google Maps ,click on the particular location .
		
Steps to run the application on webserver instead of Android app.

		* Run web3j dev server node from the directory where truffle is initiated .(By default node js server runs on localhost with 8080 port).
			ex : npm run dev.
			
		* Go to the browser and type http://localhost:8080 to add and retrive the product location from web.
		

		
		
		
		

		
		
		
		
