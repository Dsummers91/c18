pragma solidity ^0.4.23;

import './tokens/ERC721BasicToken.sol';

contract FoodChainz is ERC721BasicToken() {
  uint256 public tokensCreated;

  constructor() public {
  }

  // max 5 containers per shipment
  function createShipment(uint256[5] _tokens, address _owner) public {
    for(uint256 i=0; i<_tokens.length; i++) {
      if(_tokens[i] == uint256(0)) { break; }
      super._mint(_owner, _tokens[i]);
      tokensCreated++;
    }
  }
}
