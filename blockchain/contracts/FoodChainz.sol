pragma solidity ^0.4.23;

import './tokens/ERC721BasicToken.sol';

contract FoodChainz is ERC721BasicToken() {
 
  constructor() {
    super._mint(msg.sender, 0);
  }

}
