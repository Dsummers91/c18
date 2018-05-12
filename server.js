const BN = require("bn.js");
const app = require('express')()
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider("http://localhost:8545");
let web3 = new Web3(provider);
const contract = require("truffle-contract");
const bodyParser = require('body-parser')
const FoodChainz = contract(require('./blockchain/build/contracts/FoodChainz.json'))

FoodChainz.setProvider(provider);
let foodChainz;

app.use(bodyParser.json());

app.get('/test', async(req, res) => {
	let tokenCount = await foodChainz.tokensCreated();
	res.send({ tokenCount });
});

server = app.listen(process.env.PORT || 8080, async() => {
	foodChainz = await FoodChainz.deployed();
	console.log('listening on port: ', process.env.PORT || 8080);
})

module.exports = server;
