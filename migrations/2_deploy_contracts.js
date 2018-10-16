var LeasesFactory = artifacts.require("./LeasesFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(LeasesFactory);
};
