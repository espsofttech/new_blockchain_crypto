var express = require("express");
var router = express.Router();
var axios = require("axios");
const Web3 = require("web3");
const web3 = new Web3();
const ethUtil = require("ethereumjs-util");
const ethereum_address = require("ethereum-address");

web3.setProvider(
    new web3.providers.HttpProvider(
      "https://mainnet.infura.io/v3/0148422f7f26401b9c90d085d2d3f928"
    )
);

var abi = [{
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{
        "name": "",
        "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_spender",
        "type": "address"
    }, {
        "name": "_value",
        "type": "uint256"
    }],
    "name": "approve",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_from",
        "type": "address"
    }, {
        "name": "_to",
        "type": "address"
    }, {
        "name": "_value",
        "type": "uint256"
    }],
    "name": "transferFrom",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{
        "name": "",
        "type": "uint8"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "cap",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_to",
        "type": "address"
    }, {
        "name": "_amount",
        "type": "uint256"
    }],
    "name": "mint",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_spender",
        "type": "address"
    }, {
        "name": "_subtractedValue",
        "type": "uint256"
    }],
    "name": "decreaseApproval",
    "outputs": [{
        "name": "success",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_owner",
        "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
        "name": "balance",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{
        "name": "",
        "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_to",
        "type": "address"
    }, {
        "name": "_value",
        "type": "uint256"
    }],
    "name": "transfer",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_spender",
        "type": "address"
    }, {
        "name": "_addedValue",
        "type": "uint256"
    }],
    "name": "increaseApproval",
    "outputs": [{
        "name": "success",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "_owner",
        "type": "address"
    }, {
        "name": "_spender",
        "type": "address"
    }],
    "name": "allowance",
    "outputs": [{
        "name": "remaining",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "newOwner",
        "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "to",
        "type": "address"
    }, {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
    }],
    "name": "Mint",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
    }, {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "owner",
        "type": "address"
    }, {
        "indexed": true,
        "name": "spender",
        "type": "address"
    }, {
        "indexed": false,
        "name": "value",
        "type": "uint256"
    }],
    "name": "Approval",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "from",
        "type": "address"
    }, {
        "indexed": true,
        "name": "to",
        "type": "address"
    }, {
        "indexed": false,
        "name": "value",
        "type": "uint256"
    }],
    "name": "Transfer",
    "type": "event"
}]

router.post("/transfer", async function (request, response) {

    let fromAddress = request.body.from_address;
    let privateKey = request.body.from_private_key;
    let toAddress = request.body.to_address;
    let tokenValue = request.body.value;
    let contractAddress = request.body.contract_address;

    try {

        let bufferedKey = ethUtil.toBuffer(privateKey);

        if (
            ethereum_address.isAddress(fromAddress) &&
            ethereum_address.isAddress(fromAddress) &&
            ethUtil.isValidPrivate(bufferedKey)
        ) {

            const contract = await new web3.eth.Contract(abi, contractAddress);
            let count = await web3.eth.getTransactionCount(fromAddress);

            const decimal = [];
            await contract.methods.decimals().call((req, res) => {
                decimal.push(res);
            });
            console.log(decimal[0]);
            if (decimal[0] != 0) {
                tokenValue = tokenValue * 10 ** decimal[0];
            }
            
            console.log(tokenValue);

            web3.eth.defaultAccount = fromAddress;

            console.log("0000000");
            const tx_builder = await contract.methods.transfer(toAddress, tokenValue);

            console.log("11211212");
            let encoded_tx = tx_builder.encodeABI();

            let gasPrice = await web3.eth.getGasPrice();

            let gasLimit = 300000;

            console.log("gasg limit : ", gasLimit);

            let transactionObject = {
                nonce: web3.utils.toHex(count),
                from: fromAddress,
                gasPrice: web3.utils.toHex(gasPrice),
                gasLimit: web3.utils.toHex(gasLimit),
                to: contractAddress,
                data: encoded_tx,
                chainId: 0x08
            };
            // console.log('transaction ', transactionObject)
            web3.eth.accounts
                .signTransaction(transactionObject, privateKey)
                .then(signedTx => {
                    web3.eth.sendSignedTransaction(
                        signedTx.rawTransaction,
                        async function (err, hash) {
                            if (!err) {
                                console.log("hash is : ", hash);
                                return response.status(200).json({
                                    msg: "Transaction is in mining state. For more info please watch transaction hash on rinkeby explorer",
                                    hash: hash
                                });
                            } else {
                                return response.status(400).json({
                                    msg: `Bad Request ${err}`
                                });
                            }
                        }
                    );
                });
        } else {
            return response.status(400).json({
                msg: `Your private or public address is not correct`
            });
        }
    } catch (e) {
        return response.status(400).json({
            msg: "invalid transaction signing",
            e,
            statuscode: 4
        });
    }
});

router.get("/getBalance/:walletAddress/:contractAddress", (req, response) => {
  let walletAddress = req.params.walletAddress;
  let contractAddress = req.params.contractAddress
  axios
      .get(
          "https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=" +
          contractAddress +
          "&address=" +
          walletAddress +
          "&tag=latest&apikey=9YV6AJIJ4TGAYBKQ6QEQ2BEQQ5KKKCHA5Q"
      )
      .then(res => {
          let balance = res.data.result;
          console.log(balance)
          balance = balance / (10 ** 10);
         // console.log(balance);
          response.json({
              balance: balance
          });
      });
});

router.get("/getInfo/:contract_address", async function (req, res) {

  let contractAddress = req.params.contract_address;

  try {
      const instance = await new web3.eth.Contract(abi, contractAddress);

      await instance.methods.getValues().call((req, data) => {

          res.json({
              instanceAddress: contractAddress,
              values: {
                  value1: data._value1,
                  value2: data._value2,

              }
          });
      });

  } catch (e) {
      return res.status(400).json({
          msg: "invalid contract address",
          e,
          statuscode: 4
      });
  }
});


router.get("/track/:wallet_address/:contract_address", async (req, response) => {
    try {
        let contractAddress = req.params.contract_address;
        const contract = await new web3.eth.Contract(abi, contractAddress);
        contract.getPastEvents(
            "Transfer", {
                fromBlock: 0,
                toBlock: "latest"
            },
            (error, event) => {
                if (!error) {
                    console.log(event.length);

                    let _data = [];

                    if (Array.isArray(event)) {
                        event = event.filter(res => {
                            return (
                                String(res.returnValues.from).toUpperCase() !==
                                String(req.params.wallet_address).toUpperCase() ||
                                String(res.returnValues.to).toUpperCase() !==
                                String(req.params.wallet_address).toUpperCase()
                            );
                        });

                        _data = event.map(res => {
                            const object = ({
                                from,
                                to,
                                value
                            } = res.returnValues);
                            object.transactionHash = res.transactionHash;
                            delete object["0"];
                            delete object["1"];
                            delete object["2"];

                            return object;
                        });
                    }
                    
                    response.json({
                        _data
                    });
                }
            }
        );
    } catch (e) {
        "There is no event against this wallet addres",
        e;
    }
});

router.get("/fetchtx/:hash", async function (req, response) {
    var finalResponse = null;
    try {
      if (req.params) {
        if (!req.params.hash) {
          ResponseMessage = "hash is missing \n";
          ResponseCode = 206;
        } else {
          let hash = req.params.hash;
  
          if (hash.length == 66) {
            ResponseCode = 200;
            finalResponse = await getTransaction(hash);
            ResponseMessage = "Completed";
          } else {
            ResponseMessage = "Invalid Hash";
            ResponseCode = 400;
          }
        }
      } else {
        ResponseMessage =
          "Transaction cannot proceeds as request params is empty";
        ResponseCode = 204;
      }
    } catch (error) {
      ResponseMessage = `Transaction signing stops with the error ${error}`;
      ResponseCode = 400;
    } finally {
      if (finalResponse == null) {
        return response.status(400).json({
          meta: "Tx not found on network"
        });
      } else {
        return response.status(200).json({
          payload: finalResponse
        });
      }
    }
  });
  
  function getTransaction(hash) {
    var ResponseData;
  
    return new Promise(function (resolve, reject) {
      try {
        web3.eth.getTransaction(hash, async function (err, transaction) {
          if (transaction !== undefined) {
            let inputdecode = await decoder.decodeData(transaction.input);
            console.log(inputdecode.inputs[1].toString());
            var confirmation =
              (await web3.eth.getBlockNumber()) - transaction.blockNumber;
            let time = await web3.eth.getBlock(transaction.blockNumber)
            let info = await getTokenInfo(transaction.to);
            let decimals =
              parseInt(inputdecode.inputs[1].toString()) / 10 ** info.decimals;
            ResponseData = {
              name: info.name,
              symbol: info.symbol,
              decimal: info.decimals,
              from: transaction.from,
              to: transaction.toAddress,
              value: decimals,
              gas_price: transaction.gasPrice,
              hash: transaction.hash,
              confirmations: confirmation,
              timestamp: time.timestamp
            };
            resolve(ResponseData);
          } else {
            reject("Invalid Hash or contract address");
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  
  function getTokenInfo(contractAddress) {
    var ResponseData;
  
    return new Promise(async function (resolve, reject) {
      try {
        const contractInstance = await new web3.eth.Contract(
          abi,
          contractAddress
        );
        const decimal = [];
        await contractInstance.methods.decimals().call((req, res) => {
          decimal.push(res);
        });
        await contractInstance.methods.symbol().call((req, res) => {
          decimal.push(res);
        });
        await contractInstance.methods.name().call((req, res) => {
          decimal.push(res);
        });
  
        ResponseData = {
          name: decimal[2],
          symbol: decimal[1],
          decimals: decimal[0]
        };
        resolve(ResponseData);
      } catch (e) {
        reject(e);
      }
    });
  }
  

module.exports = router;