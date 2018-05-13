pragma solidity ^0.4.23;

import './tokens/ERC721BasicToken.sol';

contract FoodChainz is ERC721BasicToken() {
  uint256 public tokensCreated;
  mapping(uint256 => Status) public status;

  enum Status {
    Uninitiated,
    Created,
    Confirmed,
    Completed,
    Rejected
  }

  event ShipmentCreated(uint256 token, address owner);
  event ShipmentConfirmed(uint256 token, address owner);
  event ShipmentCompleted(uint256 token, address owner);

  constructor() public {}

  function statusOf(uint256 _token) public view returns(uint256) {
    return uint256(status[_token]);
  }

  // max 5 containers per shipment
  function createShipment(uint256[5] _tokens, address _owner) public {
    for(uint256 i=0; i<_tokens.length; i++) {
      if(_tokens[i] == uint256(0)) { break; }
      status[_tokens[i]] = Status.Created;
      super._mint(_owner, _tokens[i]);
      tokensCreated++;
    }
  }

  function confirmShipment(uint256[5] _tokens) public {
    for(uint256 i=0; i<_tokens.length; i++) {
      if(_tokens[i] == uint256(0)) { break; }
      status[_tokens[i]] = Status.Confirmed;
    } 
  }

  function completeShipment(uint256[5] _tokens) public {
    for(uint256 i=0; i<_tokens.length; i++) {
      if(_tokens[i] == uint256(0)) { break; }
      status[_tokens[i]] = Status.Completed;
    } 
  
  }
  function rejectShipment(uint256[5] _tokens) public {
    for(uint256 i=0; i<_tokens.length; i++) {
      if(_tokens[i] == uint256(0)) { break; }
      status[_tokens[i]] = Status.Rejected;
    } 
  }
}
