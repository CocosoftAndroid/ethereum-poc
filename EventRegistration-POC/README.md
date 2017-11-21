
 
### 1. Pre-requisites for executing the above example.

		* NPM ,Node, testrpc are already installed in your environment.
		* Truffle Framework is available .
	

### 2. Run geth client using below command (local blockchain RPC server). 

		* Run the geth client.
			ubuntu@ubuntu-VirtualBox:~/ethereum/EventRegistration$ geth --identity "miner1" --networkid 42 --datadir "/home/anusha/goethereum/miner1" --nodiscover --mine --rpc --shh --rpcaddr "0.0.0.0" --rpccorsdomain "*" --rpcport "8545" --port "30303" --unlock 0

### 3. Build & deploy the contract using below commands. 

		* Copy the "EventRegistration-webApp" directory to your local machine .
		* Truffe commands to compile and deploy a contract
			truffle compile
			truffle migrate .
			
### 4. Commands to run the webserver.

		* Run web3j dev server node from the directory where truffle is initiated .(By default node js server runs on localhost with 8080 port).
			ex: npm run dev
		* Open browser and type "http://localhost:8080" and buy the tickets by giving the Email ID for the event .	
		


		

		

		

		
		
		
		

		
		
		
		
