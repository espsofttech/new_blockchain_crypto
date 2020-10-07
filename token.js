//This module help to listen request
var express = require("express");
var router = express.Router();
var axios = require("axios");
const Web3 = require("web3");
const web3 = new Web3();
const ethUtil = require("ethereumjs-util");
const ethereum_address = require("ethereum-address");
const InputDataDecoder = require("ethereum-input-data-decoder");

web3.setProvider(
  new web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/9f6265427d624a2cb75d432e1ce8014c"
  )
);

var abi = require('human-standard-token-abi')

const decoder = new InputDataDecoder(abi);

 //var contractAddress = "0x071dc402d73644a6f0bc9abad002d20c11e38823";
//----------------------------------Send Tokens----------------------------------------------
// let contract = new web3.eth.Contract(abi, contractAddress);
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

      console.log(typeof tokenValue);

      web3.eth.defaultAccount = fromAddress;

      console.log("0000000");
      const tx_builder = await contract.methods.transfer(toAddress, tokenValue.toString());

      console.log("11211212");
      let encoded_tx = tx_builder.encodeABI();

      let gasPrice = await web3.eth.getGasPrice();

      // let gasLimit = 300000;

      // console.log("gasg limit : ", gasLimit);

      let transactionObject1 = {
        from: fromAddress,
        to: contractAddress,
        data: encoded_tx,
        chainId: 0x01
      };

      var estimatedGas = await web3.eth.estimateGas(transactionObject1);
      console.log("estimatedGas = ", estimatedGas);

      var gasValue = estimatedGas * gasPrice;
      console.log("gasvalue = ", gasValue);

      let transactionObject = {
        nonce: web3.utils.toHex(count),
        from: fromAddress,
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit: web3.utils.toHex(estimatedGas),
        to: contractAddress,
        data: encoded_tx,
        chainId: 0x01
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

router.get("/getBalance/:wallet_address/:contract_address",async (req, response) => {
    let walletAddress = req.params.wallet_address;
    let contractAddress = req.params.contract_address;
    try {
      const instance = await new web3.eth.Contract(abi, contractAddress);
      instance.methods.balanceOf(walletAddress).call((error, balance) => {
        if (!error) {
          balance = web3.utils.fromWei(balance, "ether");
          response.status(200).json({
            balance
          });
        }
      });
    } catch (e) {
      return response.status(400).json({
        msg: "invalid wallet or contract address",
        e,
        statuscode: 4
      });
    }
  }
);

router.get("/token_balance/:wallet_address/:contract_address",async (req, response) => {
  let walletAddress = req.params.wallet_address;
  let contractAddress = req.params.contract_address;
  try {
    const instance = await new web3.eth.Contract(abi, contractAddress);
    instance.methods.balanceOf(walletAddress).call((error, balance) => {
      if (!error) {
        balance = web3.utils.fromWei(balance, "ether");
        response.status(200).json({
          balance
        });
      }
    });
  } catch (e) {
    return response.status(400).json({
      msg: "invalid wallet or contract address",
      e,
      statuscode: 4
    });
  }
}
);

router.get("/getinfo/:contract_address", async (req, response) => {
  let data = [];
  let contractAddress = req.params.contract_address;
  try {
    const instance = await new web3.eth.Contract(abi, contractAddress);
    await instance.methods.name().call((req, res) => {
      data.push(res);
      console.log(res);
    });
    await instance.methods.symbol().call((req, res) => {
      data.push(res);
    });
    await instance.methods.decimals().call((req, res) => {
      data.push(res);
    });
    await instance.methods.totalSupply().call((req, res) => {
      data.push(res);
    });

    response.json({
      contractAddress: contractAddress,
      name: data[0],
      symbol: data[1],
      decimals: data[2],
      totalSupply: data[3] / 10 ** data[2]
    });
  } catch (e) {
    return response.status(400).json({
      msg: "invalid contract address",
      e,
      statuscode: 4
    });
  }
});

// router.get(
//   "/track/:wallet_address/:contract_address",
//   async (req, response) => {
//     try {
//       let contractAddress = req.params.contract_address;
//       const contract = await new web3.eth.Contract(abi, contractAddress);

//       contract.getPastEvents(
//         "Transfer", {
//           fromBlock: 9700560,
//           toBlock: 9700570
//         },
//         (error, event) => {
//           if (!error) {
//             console.log(event.length);

//             let _data = [];

//             if (Array.isArray(event)) {
//               event = event.filter(res => {
//                 return (
//                   String(res.returnValues.from).toUpperCase() ===
//                   String(req.params.wallet_address).toUpperCase() ||
//                   String(res.returnValues.to).toUpperCase() ===
//                   String(req.params.wallet_address).toUpperCase()
//                 );
//               });

//               _data = event.map(res => {
//                 const object = ({
//                   from,
//                   to,
//                   value
//                 } = res.returnValues);
//                 object.transactionHash = res.transactionHash;
//                 delete object["0"];
//                 delete object["1"];
//                 delete object["2"];

//                 return object;
//               });
//             }

//             _data.forEach(function (element, index) {
//               // console.log(element.value);
//               console.log(_data[index].value);
//               _data[index].value = web3.utils.fromWei(element.value, "ether");
//             });

//             response.json({
//               _data
//             });
//           }
//           // else
//           //   response.status(400).json({
//           //     error: error
//           //   });
//         }
//       );
//     } catch (e) {
//       "There is no event against this wallet addres",
//       e;
//     }
//   }
// );

router.get("/:hash/fetchtx", async function (req, response) {
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

router.get("/track/:wallet_address/:contract_address", async function (req, res) {
  var transactions = [];
  try {
    let tx = await axios.get(
      `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${req.params.contract_address}&address=${req.params.wallet_address}&sort=asc&apikey=R3NZBT5BV4WK3VER42TJ3B5UK4WYEDZENH`
    );
    console.log(tx.data.result);
    tx.data.result.map(async itemApi => {
      var unixtimestamp = itemApi.timeStamp;
      var date = new Date(unixtimestamp * 1000)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      let obj = {
        from: itemApi.from,
        to: itemApi.to,
        hash: itemApi.hash,
        value: itemApi.value / 10 ** itemApi.tokenDecimal,
        date: date,
        timestamp: itemApi.timeStamp,
        nonce: itemApi.nonce,
        confirmations: itemApi.blockNumber,
        block: itemApi.blockNumber,
        gas_price: itemApi.gasPrice,
        gas_used: itemApi.gas,
        name: itemApi.tokenName,
        symbol: itemApi.tokenSymbol,
        decimal: itemApi.tokenDecimal,
      };

      transactions.push(obj);

    });
    return res.status(200).json({
      _data: transactions
    });

    // });
  } catch (error) {
    let errors = {
      error: {
        code: 1,
        message: `General error: ` + error
      }
    };
    return res.status(500).json({
      meta: errors,
      source: "offical"
    });
    //  return res.status(500).json({ error: err.toString() });
  }
});

// router.get("/test/:startblock", async (req, response) => {

//     try {

//         contract.getPastEvents({}, {
//                 fromBlock: req.params.startblock,
//                 toBlock: "latest"
//             },
//             async (error, event) => {
//                 if (!error) {
//                     console.log(event.length);
//                     const block = await web3.eth.getBlockNumber();
//                     console.log(block);
//                     let _data = [];
//                     let _filter1 = new Array(3);

//                     if (Array.isArray(event)) {
//                         _data = event.map(res => {
//                             const object = ({
//                                 from,
//                                 to,
//                                 value
//                             } = res.returnValues);
//                             object.transactionHash = res.transactionHash;
//                             delete object["0"];
//                             delete object["1"];
//                             delete object["2"];

//                             return object;
//                         });

//                     }

//                     _data.filter(res => {
//                         if (res.from != null && res.to != null && res.from != undefined && res.to != undefined) {
//                             _filter1.push(res.from, res.to);
//                         }

//                     })
//                     _filter1 = _filter1.map(JSON.stringify).reverse()
//                         .filter(function (item, index, arr) {
//                             return arr.indexOf(item, index + 1) === -1;
//                         })
//                         .reverse().map(JSON.parse);

//                     let _balArray = [];
//                     for (var i = 0; i < _filter1.length; i++) {
//                         console.log("address", _filter1[i]);
//                         var balance = await contract.methods.balanceOf(_filter1[i]).call()

//                         balance = balance / 10 ** 18;
//                         console.log("balance", balance)
//                         _balArray.push(balance)

//                     }

//                     await response.json({
//                         holders: _filter1,
//                         balances: _balArray
//                     })
//                 } else
//                     response.status(400).json({
//                         error: error
//                     });
//             }
//         );
//     } catch (e) {
//         "There is no event against this wallet addres",
//         e;
//     }

// });

module.exports = router;