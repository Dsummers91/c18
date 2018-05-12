var ERC721BasicToken = artifacts.require("./ERC721BasicToken.sol");

module.exports = function(deployer) {
  deployer.deploy(ERC721BasicToken);
};
