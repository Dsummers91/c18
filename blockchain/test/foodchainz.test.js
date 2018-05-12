const FoodChainz = artifacts.require('./FoodChainz.sol');


contract('FoodChainz', () => {
  let foodChainz;

  beforeEach(async() => {
    foodChainz = await FoodChainz.new();
  })

  it('should be able to create a shipment', async() => {
    await foodChainz.createShipment([2,3,4,5,6], web3.eth.coinbase)
    let tokensCreated = await foodChainz.tokensCreated();
    let tokenStatus = await foodChainz.statusOf(2);
    assert.equal(+tokensCreated, 5);
    assert.equal(+tokenStatus, 1)
  });

  it('should be able to create a smaller shipment', async() => {
    await foodChainz.createShipment([2,3,4], web3.eth.coinbase)
    let tokensCreated = await foodChainz.tokensCreated();
    assert.equal(+tokensCreated, 3);
  });

  it('should be able to confirm a smaller shipment', async() => {
    await foodChainz.createShipment([2,3,4], web3.eth.coinbase)
    await foodChainz.confirmShipment([2,3,4]);
    let tokensCreated = await foodChainz.tokensCreated();
    let tokenStatus = await foodChainz.statusOf(2);
    assert.equal(+tokensCreated, 3);
    assert.equal(+tokenStatus, 2)
  });

  it('should be able to complete a smaller shipment', async() => {
    await foodChainz.createShipment([2,3,4], web3.eth.coinbase)
    await foodChainz.confirmShipment([2,3,4]);
    await foodChainz.completeShipment([2,3,4]);
    let tokensCreated = await foodChainz.tokensCreated();
    let tokenStatus = await foodChainz.statusOf(2);
    assert.equal(+tokensCreated, 3);
    assert.equal(+tokenStatus, 3)
  });
});
