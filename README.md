#RUN

```
ganache-cli > /dev/null 2>&1 &
cd blockchain
truffle migrate --reset
cd ../
node server.js

```

Opens port 8080

hit these endpoits


GET /create - Mint 5 tokens

GET /tokens/current - the status of five tokens most recenty minted

GET /confirm - Confiems whatever tokens havent been rejected

POST /reject (@param tokens {Array}) rejects token

GET /complete Completes whatever tokens that have been confirmed and not rejected


# Testing

```
truffle test
```
