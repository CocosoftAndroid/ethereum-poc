# ethereum-poc
Ethereum poc on black chain technologies

Pre-requisites to build and deploy the smart contract & web3 DAPP

### 1. NPM and Node - Refer the below links for the installation instructions.
		* Mac - http://blog.teamtreehouse.com/install-node-js-npm-mac
		* Windows - http://blog.teamtreehouse.com/install-node-js-npm-windows
		* Ubuntu - https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/

### 2. Setup testrpc(local blockchain RPC server)
		* Go to node js terminal/command prompt - then run -> npm install -g ethereumjs-testrpc
		* Run testrpc - Open your terminal/node js command prompt and run -> testrpc
### 3. Install truffle DApp framework
		* Run -> npm install -g truffle
		* To install truffle with specific version, run -> npm install -g truffle@3.2.1 (Recommend)
### 4. Setup/Create new DApp(Ex: machine-maintenance, voting.....) using Truffle frame work. Follow the below instructions. Go to any of the directory
		* mkdir machine-maintenance
		* cd machine-maintenance
		* Run -> npm install -g webpack
		* Run -> truffle init webpack
		* Go to /app then modify the web-app files(html, css & javascript)
		* Go to /contracts then modify the contracts or create new solidity contract.
		* Go to /migrations then modify the initial_migration.js & deploy_contract.js files accordingly.
		* Go to truffle.js and modify the ethereum server networks(development, qa, staging,live, prod, etc.......)
		* Refer this link for more details https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-2-30b3d335aa1f
		
### 5. Truffle commands for the build & deploy
		* Compile -> truffle compile
		* Migrate(build & deploy) -> truffle migrate (by defualt this command deploy's to local testrpc server)
		* Test -> truffle test
		* Build Frontend -> npm run build
		* Run Linter -> npm run lint
		* Run Dev(web server -node) Server -> npm run dev - By default node js server runs on 8080 port.
		* To deploy remote server(private network on remote machine)
				> truffle migrate --network live
### 6. References
		* http://blog.teamtreehouse.com/install-node-js-npm-mac
		* http://blog.teamtreehouse.com/install-node-js-npm-windows
		* https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/
		* https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-2-30b3d335aa1f
		* https://github.com/trufflesuite/truffle-init-webpack
		* http://truffle.readthedocs.io/en/beta/advanced/configuration/#networks
		* http://truffle.readthedocs.io/en/beta/advanced/configuration/#networks
		* https://github.com/ethereum/go-ethereum/wiki/Installation-Instructions-for-Mac
		* https://github.com/ethereum/go-ethereum/wiki/JavaScript-Console
		
		
		
		
		
