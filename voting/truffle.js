// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
  "live": {
    network_id: 1, 
    host: 'ec2-34-210-156-191.us-west-2.compute.amazonaws.com',
    port: 8000,
   
    // optional config values
    // host - defaults to "localhost"
    // port - defaults to 8545
    // gas
    // gasPrice
    // from - default address to use for any transaction Truffle makes during migrations
  },
  "morden": {
    network_id: 2,        // Official Ethereum test network
    host: "178.25.19.88", // Random IP for example purposes (do not use)
    port: 80             
  },
  "staging": {
    network_id: 1337 // custom private network
    // use default rpc settings
  },
  "development": {
    host: 'localhost',
    port: 8545,
    network_id: '*'				
  }
}

 //networks: {
   // development: {
     // host: 'localhost',
     // port: 8545,
      //network_id: '*' // Match any network id
    //}
   // development: {
   //  host: 'ec2-34-210-156-191.us-west-2.compute.amazonaws.com',
   //  port: 8000,
   //  network_id: '*' // Match any network id
   // }
  //}
}
