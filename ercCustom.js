var express = require("express");
var router = express.Router();
const Web3 = require("web3");
const web3 = new Web3();
const ethUtil = require("ethereumjs-util");
const ethereum_address = require("ethereum-address");

web3.setProvider(
  new web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/0148422f7f26401b9c90d085d2d3f928"
  )
);

var abi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_upgradedAddress", type: "address" }],
    name: "deprecate",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "deprecated",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_evilUser", type: "address" }],
    name: "addBlackList",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "issuer",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "upgradedAddress",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "balances",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "approveTransfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "maximumFee",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "unpause",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getIssuer",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_maker", type: "address" }],
    name: "getBlackListStatus",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "", type: "address" },
      { name: "", type: "address" },
    ],
    name: "allowed",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "paused",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "who", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "pause",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "newBasisPoints", type: "uint256" },
      { name: "newMaxFee", type: "uint256" },
    ],
    name: "setParams",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "approveTransferMethod",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "amount", type: "uint256" }],
    name: "issue",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "disApproveTransferMethod",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_contributors", type: "address[]" },
      { name: "_balances", type: "uint256[]" },
    ],
    name: "multisendToken",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "amount", type: "uint256" }],
    name: "redeem",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "remaining", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "basisPointsRate",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "isBlackListed",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_clearedUser", type: "address" }],
    name: "removeBlackList",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "MAX_UINT",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_blackListedUser", type: "address" }],
    name: "destroyBlackFunds",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "admin",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "_initialSupply", type: "uint256" },
      { name: "_name", type: "string" },
      { name: "_symbol", type: "string" },
      { name: "_decimals", type: "uint256" },
      { name: "_admin", type: "address" },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "amount", type: "uint256" }],
    name: "Issue",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "amount", type: "uint256" }],
    name: "Redeem",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "newAddress", type: "address" }],
    name: "Deprecate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "feeBasisPoints", type: "uint256" },
      { indexed: false, name: "maxFee", type: "uint256" },
    ],
    name: "Params",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "_blackListedUser", type: "address" },
      { indexed: false, name: "_balance", type: "uint256" },
    ],
    name: "DestroyedBlackFunds",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "_user", type: "address" }],
    name: "AddedBlackList",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "_user", type: "address" }],
    name: "RemovedBlackList",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: true, name: "spender", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  { anonymous: false, inputs: [], name: "Pause", type: "event" },
  { anonymous: false, inputs: [], name: "Unpause", type: "event" },
];

router.get("/getApproveStatus", async function (req, res) {
  let arraydata = [];

  let contractAddress = req.query.contract_address;

  if (
    contractAddress == "" ||
    contractAddress == null ||
    contractAddress == undefined
  ) {
    return res.status(400).json({
      msg: "contract address should not be empty",
    });
  }
  try {
    const instance = await new web3.eth.Contract(abi, contractAddress);

    await instance.methods.approveTransfer().call((req, res) => {
      arraydata.push(res);
    });

    res.json({
      instanceAddress: contractAddress,

      approveTransferStatus: arraydata[0],
    });
  } catch (e) {
    return res.status(400).json({
      msg: "invalid contract address",
      e,
      statuscode: 4,
    });
  }
});

router.get("/getBalance", async function (req, res) {
  let arraydata = [];

  let contractAddress = req.query.contract_address;
  let walletAddress = req.query.wallet_address;

  if (
    contractAddress == "" ||
    contractAddress == null ||
    contractAddress == undefined ||
    walletAddress == "" ||
    walletAddress == null ||
    walletAddress == undefined
  ) {
    return res.status(400).json({
      msg: "wallet address or contract address should not be empty",
    });
  }

  try {
    const instance = await new web3.eth.Contract(abi, contractAddress);

    await instance.methods.balanceOf(walletAddress).call((req, res) => {
      arraydata.push(res);
    });

    return res.json({
      instanceAddress: contractAddress,
      balance: arraydata[0] / 10 ** 18,
    });
  } catch (e) {
    return res.status(400).json({
      msg: "invalid contract address",
      e,
      statuscode: 4,
    });
  }
});

router.post("/approveTransfer", async function (request, response) {
  let fromAddress = request.body.from_address;
  let privateKey = request.body.from_private_key;
  let contractAddress = request.body.contract_address;

  try {
    const bbal = await web3.eth.getBalance(fromAddress);

    if (bbal == "0") {
      response.status(400).json("You do not have sufficient balance");
    }

    const contract = await new web3.eth.Contract(abi, contractAddress);
    let count = await web3.eth.getTransactionCount(fromAddress);

    web3.eth.defaultAccount = fromAddress;
    const tx_builder = await contract.methods.approveTransferMethod();

    let encoded_tx = tx_builder.encodeABI();

    let gasPrice = await web3.eth.getGasPrice();
    let gasLimit = 500000;
    let transactionObject = {
      nonce: web3.utils.toHex(count),
      from: fromAddress,
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      to: contractAddress,
      data: encoded_tx,
      chainId: 0x03,
    };
    // console.log('transaction ', transactionObject)
    web3.eth.accounts
      .signTransaction(transactionObject, privateKey)
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(signedTx.rawTransaction, async function (
          err,
          hash
        ) {
          if (!err) {
            console.log("hash is : ", hash);
            return response.status(200).json({
              msg:
                "Transaction is in mining state. For more info please watch transaction hash on ropsten explorer",
              hash: hash,
            });
          } else {
            return response.status(400).json({
              msg: `Bad Request ${err}`,
            });
          }
        });
      })
      .catch((err) => {
        return response.status(400).json({
          msg: `Your contract parameters are not correct:  ${err}`,
        });
      });
  } catch (e) {
    return response.status(400).json({
      msg: "invalid transaction signing",
      e,
      statuscode: 4,
    });
  }
});

router.post("/disapproveTransfer", async function (request, response) {
  let fromAddress = request.body.from_address;
  let privateKey = request.body.from_private_key;
  let contractAddress = request.body.contract_address;

  try {
    const bbal = await web3.eth.getBalance(fromAddress);

    if (bbal == "0") {
      response.status(400).json("You do not have sufficient balance");
    }

    const contract = await new web3.eth.Contract(abi, contractAddress);
    let count = await web3.eth.getTransactionCount(fromAddress);

    web3.eth.defaultAccount = fromAddress;
    const tx_builder = await contract.methods.disApproveTransferMethod();

    let encoded_tx = tx_builder.encodeABI();

    let gasPrice = await web3.eth.getGasPrice();
    console.log("gasprice", gasPrice);
    let gasLimit = 500000;
    let transactionObject = {
      nonce: web3.utils.toHex(count),
      from: fromAddress,
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      to: contractAddress,
      data: encoded_tx,
      chainId: 0x03,
    };
    // console.log('transaction ', transactionObject)
    web3.eth.accounts
      .signTransaction(transactionObject, privateKey)
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(signedTx.rawTransaction, async function (
          err,
          hash
        ) {
          if (!err) {
            console.log("hash is : ", hash);
            return response.status(200).json({
              msg:
                "Transaction is in mining state. For more info please watch transaction hash on ropsten explorer",
              hash: hash,
            });
          } else {
            return response.status(400).json({
              msg: `Bad Request ${err}`,
            });
          }
        });
      })
      .catch((err) => {
        return response.status(400).json({
          msg: `Your contract parameters are not correct:  ${err}`,
        });
      });
  } catch (e) {
    return response.status(400).json({
      msg: "invalid transaction signing",
      e,
      statuscode: 4,
    });
  }
});

router.post("/transfer", async function (request, response) {
  let fromAddress = request.body.from_address;
  let privateKey = request.body.from_private_key;
  let contractAddress = request.body.contract_address;

  let toAddress = request.body.to_address;
  let tokenValue = request.body.value;
  try {
    let bufferedKey = ethUtil.toBuffer(privateKey);

    if (
      ethereum_address.isAddress(fromAddress) &&
      ethereum_address.isAddress(fromAddress) &&
      ethUtil.isValidPrivate(bufferedKey)
    ) {
      const contract = await new web3.eth.Contract(abi, contractAddress);

      tokenValue = web3.utils.toWei(tokenValue, "ether");

      console.log(tokenValue);
      let count = await web3.eth.getTransactionCount(fromAddress);

      web3.eth.defaultAccount = fromAddress;

      const tx_builder = await contract.methods.transfer(toAddress, tokenValue);

      let encoded_tx = tx_builder.encodeABI();

      let gasPrice = await web3.eth.getGasPrice();

      // let gasLimit = 300000;

      // console.log("gasg limit : ", gasLimit);

      // var estimatedGas = await web3.eth.estimateGas(transactionObject1);
      // console.log("estimatedGas = ", estimatedGas);

      // var gasValue = estimatedGas * gasPrice;
      // console.log("gasvalue = ", gasValue);

      let transactionObject = {
        nonce: web3.utils.toHex(count),
        from: fromAddress,
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit: web3.utils.toHex(200000),
        to: contractAddress,
        data: encoded_tx,
        chainId: 0x03,
      };

      // console.log('transaction ', transactionObject)
      web3.eth.accounts
        .signTransaction(transactionObject, privateKey)
        .then((signedTx) => {
          web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            async function (err, hash) {
              if (!err) {
                console.log("hash is : ", hash);
                return response.status(200).json({
                  msg:
                    "Transaction is in mining state. For more info please watch transaction hash on rinkeby explorer",
                  hash: hash,
                });
              } else {
                return response.status(400).json({
                  msg: `Bad Request ${err}`,
                });
              }
            }
          );
        });
    } else {
      return response.status(400).json({
        msg: `Your private or public address is not correct`,
      });
    }
  } catch (e) {
    return response.status(400).json({
      msg: `internal server error`,
      e,
    });
  }
});

router.post("/airdrop", async function (request, response) {
  let fromAddress = request.body.from_address;
  let privateKey = request.body.from_private_key;
  let toAddress = request.body.to_address;
  let tokenValue = request.body.value;
  let contractAddress = request.body.contract_address;

  try {
    if (!privateKey.startsWith("0x")) {
      privateKey = "0x" + privateKey;
    }
    let bufferedKey = ethUtil.toBuffer(privateKey);
    console.log("xxx");

    if (
      ethereum_address.isAddress(fromAddress) &&
      ethereum_address.isAddress(fromAddress) &&
      ethUtil.isValidPrivate(bufferedKey)
    ) {
      const contract = await new web3.eth.Contract(abi, contractAddress);
      let count = await web3.eth.getTransactionCount(fromAddress);

      web3.eth.defaultAccount = fromAddress;

      console.log("0000000");
      console.log("toKEN leynt, ", tokenValue.length);

      for (let i = 0; i < tokenValue.length; i++) {
        tokenValue[i] = web3.utils.toWei(tokenValue[i], "ether");
      }

      const tx_builder = await contract.methods.multisendToken(
        toAddress,
        tokenValue
      );
      console.log(toAddress)
      console.log(tokenValue)

      console.log("11211212");
      let encoded_tx = tx_builder.encodeABI();

      let gasPrice = await web3.eth.getGasPrice();

      // let gasLimit = 300000;

      // console.log("gasg limit : ", gasLimit);

      // let transactionObject1 = {
      //   from: fromAddress,
      //   to: contractAddress,
      //   data: encoded_tx,
      //   chainId: 0x01,
      // };


      // var estimatedGas = await web3.eth.estimateGas({
      //   data: transactionObject1.data,
      //   from: transactionObject1.from,
      // });
      // console.log("estimatedGas = ", estimatedGas);
      // var gasValue = estimatedGas * gasPrice;

      // console.log("gasvalue = ", gasValue);
      let transactionObject = {
        nonce: web3.utils.toHex(count),
        from: fromAddress,
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit: web3.utils.toHex(5000000),
        to: contractAddress,
        data: encoded_tx,
        chainId: 0x03,
      };

      web3.eth.accounts
        .signTransaction(transactionObject, privateKey)
        .then((signedTx) => {
          web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            async function (err, hash) {
              if (!err) {
                console.log("hash is : ", hash);
                return response.status(200).json({
                  msg:
                    "Transaction is in mining state. For more info please watch transaction hash on rinkeby explorer",
                  hash: hash,
                });
              } else {
                return response.status(400).json({
                  msg: `Bad Request ${err}`,
                });
              }
            }
          );
        })
        .catch((err) => {
          return response.status(400).json({
            msg: `Your private or public address is not correct`,
          });
        });
    } else {
      return response.status(400).json({
        msg: `Your private or public address is not correct`,
      });
    }
  } catch (e) {
    return response.status(400).json({
      msg: "invalid transaction signing",
      e,
      statuscode: 4,
    });
  }
});
module.exports = router;
