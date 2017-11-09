Solar charging Station 
	SolarCharging Station implementation is a case study of a hybrid of a Dapp and a web-app for a system of solar charging stations.Here server runs a full ethereum node and also a REST web API which is used by solar charge mobile application.Mobile application allows users to send transactions to the solar charging stations.Mobile application uses the Solarcharge REST API . Each Solar charge has an IOT device that controls the station.

### 1. Pre-requisites for executing the above example.

			* NPM ,Node, testrpc are already installed in your environment.
			* Truffle Framework is available .
			* Raspberry pi is set up and LED switch is connected to it .


### 2. Run testrpc (local blockchain RPC server). 
		* Run the testrpc.
			ubuntu@ubuntu-VirtualBox:~/ethereum/SolarCharge$ testrpc -h 0.0.0.0

### 3. Build & deploy the contract using below commands. 
		* Copy the "SolorCharge-webApp" directory to your local machine .
		* Truffe commands to compile and deploy a contract
			truffle compile
			truffle migrate .
		* After sucessfull deployement ,make a note of deployed contract address ,this needs to be given in python webAPI . 
		* Open truffle console and add station details manually to the network with below command.
			ubuntu@ubuntu-VirtualBox:~/ethereum/SolarCharge$ truffle console
			truffle(development)> SolarCharge.deployed().then(function(contractInstance) {contractInstance.addStation('<station ID','<Rate>','<Address>').then(function(v) {console.log(v)})})
			undefined
			truffle(development)> { tx: '0x99456c668fff34dac6bdbe69981f7537b6bbab4b49148397514fc0454f',
			  receipt: 
			   { transactionHash: '0x99456c668fff34dac6bdbe69981f1c8944753bab4b49148397514fc0454f',
				 transactionIndex: 0,
				 blockHash: '0x81ed2791dc981e6520c04fefb6163012f7a2f0f51d84c880f10e2b0c45f37',
				 blockNumber: 10,
				 gasUsed: 99054,
				 cumulativeGasUsed: 99054,
				 contractAddress: null,
				 logs: [] },
			  logs: [] }

		
### 4. Run python webApi server in your system. 
		* Copy the restserver.py to your local machine .
		* In order to connect to blockchain network from python webAPI modify your private network ip address and port address in python code that runs on your local machine.
			ubuntu@ubuntu-VirtualBox:~/SolarCharge $ ls
			restserver.py
			Ex: c = EthJsonRpc('192.168.0.102' ,8545)
		* Modify the deployed contract address with above copied address .
			Ex: contract_addr = '0x23a889569179b76d2c82e6cb281a17135c1c8'
		* Run the restserver.py .
			Ex:ubuntu@ubuntu-VirtualBox:~/ethereum/SolarCharge$ python restserver.py 
			EthereumJS TestRPC/v1.0.1/ethereum-js
			Starting Balance = 0
			 * Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)
			 * Restarting with stat
			EthereumJS TestRPC/v1.0.1/ethereum-js
			Starting Balance = 0
			 * Debugger is active!
			 * Debugger PIN: 129-599-014

### 5. Commands to run the webserver. 
		* Run web3j dev server node from the directory where truffle is initiated .(By default node js server runs on localhost with 8080 port).
			ex: npm run dev
		* Open browser and type "http://localhost:8080" and Register the user using your gmail ID and name . Also buy solarcoins using the ethers present in your account.	
		
		
### 6. Follow below steps to setup LED light on raspberry pi .
		* Red wire must be connected to GPIO4.
		* Black wire must be Grounded.
		* Copy the attached the controllerBBBREST.py file to the raspberry pi device.
			pi@raspberrypi:~/SolarCharge $ ls -lrt
			-rwxrwxrwx 1 pi pi 841 Aug 21 21:57 controllerBBBREST.py
		* Run python code on raspberry pi.
			pi@raspberrypi:~/SolarCharge $ ls
			controllerBBBREST.py
			pi@raspberrypi:~/SolarCharge $ python controllerBBBREST.py
		
### 7. Build & deploy the cordova framework. 
		* Copy the "SolorCharge-cordova" directory to your local machine .
		* open command line argument and go to "SolorCharge-cordova" directory and run below commands.
			#Install Cordova
			sudo npm install -g cordova
			#Install jQuery Mobile
			sudo npm install -g jquery-mobile
			#Install nativeDroid2
			sudo npm install -g bower
			bower install nativeDroid2
			#Create Cordova app project
			cordova create solarcharge
			cd solarcharge
			#Add Android platform to the project
			cordova platform add android --save
			#Install cordova plugins
			cordova plugin add cordova-plugin-googleplus
			cordova plugin add cordova-plugin-barcodescanner
			#Build application
			cordova build android
		* Open emulator and run below command to install the cordova apk to the device.
			ex : cordova run android.
		* Click "Login with Google"  and login with registered gmail ID ,you should see the details along with amount paid and available solar coins.
		* Inorder to charge the mobile scan the barcode of the device and enter the required minutes to charge the device and confirm the transaction.


### 8. Go to raspberry pi and check whether LED switch is ON after confirming the transaction and switch OFF after specified time is completed .
		ex: pi@raspberrypi:~/solarstation $ python controllerBBBREST.py
		Swicth ON
		Switch OFF
		
















