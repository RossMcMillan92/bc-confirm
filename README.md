# Bitcoin Confirmations
Notifies the user when a bitcoin transaction has had a certain amount of confirmations. Uses [blockr.io](blockr.io) API.

![Bitcoin Confirmation Example](https://raw.githubusercontent.com/RossMcMillan92/bitcoin-confirmations/master/images/example.png)

## Installation
```
> git clone https://github.com/RossMcMillan92/bitcoin-confirmations
> cd bitcoin-confirmations
> npm install
> node index.js
```

## Usage
```
> node index.js <transaction-hash>
```

```<transaction-hash>```: Hash of the Bitcoin transaction.

#### Optional arguments

```
> node index.js <transaction-hash> <target-confirmations> <timeout-length>
```

```<target-confirmations>```: Amount of confirmations to reach before being notified. Default: 3.

```<timeout-length>```: Timeout between pings. Default: 60s.
