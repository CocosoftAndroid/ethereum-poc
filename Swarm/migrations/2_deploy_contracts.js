var StockPhoto  = artifacts.require("./StockPhotos.sol");

module.exports = function(deployer) {
  deployer.deploy(StockPhoto);
};
