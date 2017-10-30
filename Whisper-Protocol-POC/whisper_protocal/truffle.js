// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
 // build: {
   // "index.html": "index.html",
    //"app.js": [
//	"javascripts/app.js"
  //   ],
    // "images/": "images/"
  //},
  networks: {
    development: {
      host: '0.0.0.0',
      port: 8545,
      network_id: '*' // Match any network id
    }
  }
}
