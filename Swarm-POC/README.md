# Swarm Example
  Swarm is a decentralized storage platform and content distribution service for   ethereum.Swarm forms the base layer of the Ethereum blockchain stack.
  Swarm is a peer-to-peer storage platform which is maintainced by the peers who contribute   their storage and bandwidth resources.

Please refer to below link for understanding swarm in detail.
  https://dickolsson.com/building-dapps-on-ethereum-part-4-decentralised-hosting-swarm/ 
 

### 1. Pre-requisites for executing the above example.
		* NPM ,Node, geth client are already installed in your environment.
		* Truffle Framework is available .
		* Swarm is installed and running .
			ubuntu@ubuntu-VirtualBox:~$ swarm version
			Swarm
			Version: 1.7.2-unstable
			Network Id: 0
			Go Version: go1.7.3
			OS: linux
			GOPATH=/home/ubuntu/go
			GOROOT=/usr/local/go
		* Make sure web security is disabled in Google chrome .
		

### 2. Follow the instructions from below link to set up the environment in case required. 
		* https://github.com/CocosoftAndroid/ethereum-poc/blob/master/README.md 


### 3. Follow the below instructions to install swarm. 
		* https://swarm-guide.readthedocs.io/en/latest/installation.html#installation 
		
Below are instructions to build and deploy the smart contract & Android APP

### 1. Run geth client(local blockchain RPC server) 
		* Run geth client - Open your terminal and run below command
			ex : geth --identity "miner1" --networkid 42 --datadir "/home/ubuntu/goethereum/miner1" --nodiscover --mine --rpc --shh --rpcaddr "0.0.0.0" --rpccorsdomain "*" --rpcport "8545" --port "30303" --unlock 0
			
		* Run geth attach and run mining 
			ex : geth -datadir /home/ubuntu/goethereum/miner1 attach ipc:/home/ubuntu/goethereum/miner1/geth.ipc

### 3. Command to start the swarm .
		* Run web3j dev server node from the directory where truffle is initiated .(By default node js server runs on localhost with 8080 port).
			ex: swarm --bzzaccount <account-address> --datadir "/home/ubuntu/goethereum/miner1" --ens-api /home/ubuntu/goethereum/miner1/geth.ipc  --verbosity 4 --maxpeers 0
		
### 2. Build & deploy the contract using below commands.
		* Copy the "Swarm-webApp" directory to your local machine .
		* Truffe commands to compile and deploy a contract
		   truffle compile
		   truffle migrate
	

### 3. Commands to run the webserver.
		* Run web3j dev server node from the directory where truffle is initiated .(By default node js server runs on localhost with 8080 port).
			ex: npm run dev
		* Open browser and type "http://localhost:8080" you should able to see Stock Photos page to Buy and view photos.
		

		

		

		
		
		
		

		
		
		
		
