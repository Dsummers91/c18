const FoodChainz = artifacts.require('./FoodChainz.sol');


contract('FoodChainz', () => {
  let foodChainz;

  beforeEach(async() => {
    foodChainz = await FoodChainz.new();
  })

  it('should be able to create a shipment', async() => {
    await foodChainz.createShipment([2,3,4,5,6], web3.eth.coinbase)
    let tokensCreated = await foodChainz.tokensCreated();
    assert.equal(+tokensCreated, 5);
  });

  it('should be able to create a smaller shipment', async() => {
    await foodChainz.createShipment([2,3,4], web3.eth.coinbase)
    let tokensCreated = await foodChainz.tokensCreated();
    assert.equal(+tokensCreated, 3);
  });
});
