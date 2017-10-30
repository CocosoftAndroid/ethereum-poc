# Whisper Proctocal Example
Whisper is a communication protocal that allows decentralized applications(Dapps) on the blockchain network to communicate each other.
In the below example the users can subscribe to use the Switch for a certain period (1 day,1 week and 1 month) by paying the subscription fee (in Ether).
Once subscribed the user can control the switch ON and OFF from the Dapp itself .The Dapp sends a Whisper message when the user toggles the state of the switch from the Dapp itself.


### 1. Pre-requisites for executing the above example.
		* NPM ,Node, geth client are already installed in your environment.
		* Truffle Framework is available .
		* Raspberry pi is set up and LED switch is connected to it .
		

### 2. Follow the instructions from below link to set up the environment in case required. 
		* https://github.com/CocosoftAndroid/ethereum-poc/blob/master/README.md 

		
Below are instructions to build and deploy the smart contract & Android APP

### 1. Run geth client(local blockchain RPC server) 
		* Run geth client - Open your terminal and run below command
			ex : geth --identity "miner1" --networkid 42 --datadir "/home/anusha/goethereum/miner1" --nodiscover --mine --rpc --shh --rpcaddr "0.0.0.0" --rpccorsdomain "http://localhost:8080" --rpcport "8545" --port "30303" --unlock 0
			
		* Run geth attach and run mining 
			ex : geth -datadir /home/anusha/goethereum/miner1 attach ipc:/home/anusha/goethereum/miner1/geth.ipc
			
### 2. Build & deploy the contract using below commands.
		* Copy the "ProductLocation-webApp" directory to your local machine .
		* Truffe commands to compile and deploy a contract
		   truffle compile
		   truffle migrate
		* After sucessfull deployement ,make a note of deployed contract address ,this needs to be given in android code.

### 3. Commands to run the webserver.
		* Run web3j dev server node from the directory where truffle is initiated .(By default node js server runs on localhost with 8080 port).
			ex: npm run dev
		* Open browser and type "http://localhost:8080" you should able to SmartSwitch Subscribtion page and Switch ON/OFF checkbox.
		
### 4. Open truffle console and run below command to get the symKeyID .
		* Open truffle console with below command from the directory where truffle is initiated
			ex: truffle console
		* To get the symKeyId run the below command on truffle console.
			ex: web3.shh.addSymKey(web3.shh.getSymKey(web3.shh.newSymKey()))
		* Modify the symKeyID in app.js file in app/javascripts/ directory.
		
### 5. Steps to set up Raspberry pi 
		* Commands to install npm nodejs and web3 on raspberry pi.
			pi@raspberrypi:~/whisper $wget https://nodejs.org/dist/v4.2.4/node-v4.2.4-linux-armv6l.tar.gz
			pi@raspberrypi:~/whisper $sudo mv node-v4.2.4-linux-armv6l.tar.gz /opt
			pi@raspberrypi:~/whisper $cd /opt
			pi@raspberrypi:~/whisper $sudo tar -xzf node-v4.2.4-linux-armv6l.tar.gz
			pi@raspberrypi:~/whisper $sudo mv node-v4.2.4-linux-armv6l nodejs
			pi@raspberrypi:~/whisper $sudo rm node-v4.2.4-linux-armv6l.tar.gz
			pi@raspberrypi:~/whisper $sudo ln -s /opt/nodejs/bin/node /usr/bin/node
			pi@raspberrypi:~/whisper $sudo ln -s /opt/nodejs/bin/npm /usr/bin/npm
			pi@raspberrypi:~/whisper $sudo npm install web3
			pi@raspberrypi:~/whisper $sudo npm install mraa
			
			
		* Below are the node ,npm and web3 versions
			pi@raspberrypi:~/whisper $ node -v
			v4.8.2
			pi@raspberrypi:~/whisper $ npm -v
			2.14.12
			> web3.version.api
			'0.20.1'
			> mraa.getVersion()
			'v1.8.0'
			
		* Copy controller.js file to raspberry pi .
		* LED light setup:
			Red wire must be connected to GPIO4.
			Black wire must be Grounded.
		* Modify contract address(deployed contract address),geth URL(IP address where geth client is running),symKeyID(symKeyID passed while posting the whisper message to identify the sender) in controller.js file.
		* Run controller.js file on raspberry pi.
			ex: node controller.js
		

		

		
		
		
		

		
		
		
		
