A call Option is a financial derivative instrument that specifies a financial contract between a buyer and seller . The financial contract gives the right,but not the obligation, to buy a certain asset or financial instrument(the underlying) from the seller at a certain time(the expiration date) for a certain price(the strike price). The buyer pays a fee(premium) for this right. 
	Seller : Initializes call(Sets buyer address,underlying,strike price,premium and expiry date.
	Buyer : Validates call by paying the premium. Buyer also have the option to exercise the call before its expiry.
	Scenario 1: For example
				* current price = 80 
				* price after 3 months = 150 
				* option is exercised .
				* Buyer pays the call amount = underlying*strikePrice = 100*100 = 10000
				* Buyers Net Gain = 150*100-100*100 - 1000(premium paid by buyer) = 4000 
	Scenario 2 : For example
				* current price = 80 
				* price after 3 months = 50 
				* option is not exercised .
				* Buyers Net Loss = premium paid by buye = 1000 
				
 
### 1. Pre-requisites for executing the above example.

		* NPM ,Node, testrpc are already installed in your environment.
		* Truffle Framework is available .
	
### 2. Run geth client using below command (local blockchain RPC server)and create an account using below commands. 

		* Run the geth client.
			ubuntu@ubuntu-VirtualBox:~/ethereum/$ geth --identity "miner1" --networkid 42 --datadir "/home/anusha/goethereum/miner1" --nodiscover --mine --rpc --shh --rpcapi="db,eth,net,web3,personal,web3" --rpcaddr "0.0.0.0" --rpccorsdomain "*" --rpcport "8545" --port "30303" --unlock 0
		* Create an account.
			ubuntu@ubuntu-VirtualBox:~$geth --datadir "/home/ubuntu/goethereum/miner1" -dev account new 
			Your new account is locked with a password. Please give a password. Do not forget this password.
			Passphrase: 
			Repeat passphrase: 
			Address: {81c44bcc6c8a7fe3ed3280fef83f28f0386cd8c7}
		* Go to geth console and transfer some ethers from some other account or start mining to get some ethers .
			ubuntu@ubuntu-VirtualBox:~/ethereum$ geth --datadir "/home/anusha/goethereum/miner1"  -dev attach ipc:/home/anusha/goethereum/miner1/geth.ipc
			Welcome to the Geth JavaScript console!

			instance: Geth/miner1/v1.6.7-stable-ab5646c5/linux-amd64/go1.8.1
			coinbase: 0xb16b52862a1d25fb5da0d8d8ea9bce2775f1424c
			at block: 22696 (Tue, 21 Nov 2017 14:09:24 PST)
			datadir: /home/anusha/goethereum/miner1
			modules: admin:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 shh:1.0 txpool:1.0 web3:1.0

			> eth.sendTransaction({from: eth.coinbase, to: "<created account address", value: web3.toWei(10, "ether")})
			Unlock the account with below command.
			> web3.personal.unlockAccount('<account', "<password>", 15000)

### 3. Build & deploy the contract using below commands. 

		*  Create an directory and run init truffle (truffle unbox webpack) and copy the "CallOption-webApp" directory files to your local machine .
		* Truffe commands to compile and deploy a contract
			truffle compile
			truffle migrate .
		Note : Gas Limit to provide for any transaction is 4712300 or less . 
		
### 4. Commands to run the webserver.

		* Run web3j dev server node from the directory where truffle is initiated .(By default node js server runs on localhost with 8080 port).
			ex: npm run dev
		* Open browser and type "http://localhost:8080" and initialize the call option and buyer can validate and exercise the call option.	
		
		


		

		

		

		
		
		
		

		
		
		
		
