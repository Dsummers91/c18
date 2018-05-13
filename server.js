const BN = require("bn.js");
const app = require('express')()
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider("http://localhost:8545");
let web3 = new Web3(provider);
const contract = require("truffle-contract");
const bodyParser = require('body-parser')
const FoodChainz = contract(require('./blockchain/build/contracts/FoodChainz.json'))
const tokens = require('./tokens.js');
const MessagingResponse =
require('dotenv').config()

const accountSid =  process.env.accountSid;
const authToken = process.env.authToken;
if (process.env.accountSid) {
	const client = require('twilio')(accountSid, authToken);
}

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
			if (process.env.accountSid) {
				client.messages
      		.create({
        		body: `Package has been shipped please confirm when package is at destination!`,
         		from: process.env.from,
         		mediaUrl: process.env.media.url,
         		to: process.env.to
       		})
      		.then(message => console.log(message.sid))
		}
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
  return foodChainz.contract.rejectShipment(req.body.tokens, {from: web3.eth.coinbase, gas: 5000000}, (err, resp) => {
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
app.post('/sms', (req, res) => {
 
  // Start our TwiML response.
  const twiml = new MessagingResponse();
 
  // Add a text message.
  const msg = twiml.message('Shipment Confirmed');
  foodChainz.contract.confirmShipment(tokensToQuery, {from: web3.eth.coinbase, gas: 5000000}, (err, resp) => {
  	res.writeHead(200, {'Content-Type': 'text/xml'});
  	res.end(twiml.toString());
	});
});

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
