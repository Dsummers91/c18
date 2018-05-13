const BN = require("bn.js");
const app = require('express')()
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider("http://localhost:8545");
let web3 = new Web3(provider);
const contract = require("truffle-contract");
const bodyParser = require('body-parser')
const FoodChainz = contract(require('./blockchain/build/contracts/FoodChainz.json'))
const tokens = require('./tokens.js');

FoodChainz.setProvider(provider);
let foodChainz;
let tokensToQuery;

app.use(bodyParser.json());

app.get('/test', async(req, res) => {
	res.send({ tokenCount });
});

app.get('/explorer', (req, res) => {
  foodChainz.allEvents({}, {fromBlock: 0, toBlock: 'latest'}).get((err, events) => {
    res.send(events);
  });
});

app.get('/create', async (req, res) => {
	let tokenCount = +(await foodChainz.tokensCreated());
  let tokenArray = new Array(5).fill(tokenCount).map((item, index) => {return item+index+1});
  tokensToQuery = tokenArray;
  return foodChainz.contract.createShipment(tokenArray, web3.eth.coinbase, {from: web3.eth.coinbase, gas: 5000000}, (err, resp) => {
    res.send({ tx: resp });
  });
});


app.get('/confirm', (req, res) => {
  return foodChainz.contract.confirmShipment(tokensToQuery, {from: web3.eth.coinbase, gas: 5000000}, (err, resp) => {
    res.send({ tx: resp });
  });
});

app.get('/complete', (req, res) => {
  return foodChainz.contract.completeShipment(tokensToQuery, {from: web3.eth.coinbase, gas: 5000000}, (err, resp) => {
    res.send({ tx: resp });
  });
});

app.post('/reject', (req, res) => {
  console.log(req.body.tokens);
  return foodChainz.contract.rejectShipment([11, 12], {from: web3.eth.coinbase, gas: 5000000}, (err, resp) => {
    res.send({ tx: resp });
  });
});

app.get('/tokens/current', async(req, res) => {
  result = [];
  for(var i=0; i < tokensToQuery.length; i++) {
  	result.push({
			tokenId: tokensToQuery[i],
			status: getStatus(+(await foodChainz.statusOf(tokensToQuery[i]))),
			metadata: tokens(tokensToQuery[i])
  	})
	}
  res.send(result);
});

app.get('/tokens/:tokenId', (req, res) => {
  res.send(tokens(req.params.tokenId));
});

server = app.listen(process.env.PORT || 8080, async() => {
	foodChainz = await FoodChainz.deployed();
	console.log('listening on port: ', process.env.PORT || 8080);
})


function getStatus(id) {
  let statuses =  [
		'Uninitiated',
 	  'Created',
    'Confirmed',
    'Completed',
  	'Rejected'
	];
	return statuses[id];
}
module.exports = server;
