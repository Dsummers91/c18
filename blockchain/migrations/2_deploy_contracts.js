var FoodChainz = artifacts.require("./FoodChainz.sol");

module.exports = function(deployer) {
  deployer.deploy(FoodChainz);
};
