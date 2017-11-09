var EventReg = artifacts.require("./EventRegistration.sol");

module.exports = function(deployer) {
  deployer.deploy(EventReg,500,3000000000000000000, {gas: 990000});
};
