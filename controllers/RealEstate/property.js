var express = require("express");
var router = express.Router();
const Web3 = require("web3");
const web3 = new Web3();

web3.setProvider(
  new web3.providers.HttpProvider(
    "https://mainnet.infura.io/v3/0148422f7f26401b9c90d085d2d3f928"
  )
);

var abi = [{
    constant: true,
    inputs: [],
    name: "watchProperty",
    outputs: [{
        name: "_buildingName",
        type: "bytes32"
      },
      {
        name: "_unitAddress",
        type: "bytes32"
      },
      {
        name: "_unitNumber",
        type: "bytes32"
      },
      {
        name: "_city",
        type: "bytes32"
      },
      {
        name: "_country",
        type: "bytes32"
      },
      {
        name: "_coveredArea",
        type: "bytes32"
      },
      {
        name: "_numberOfParking",
        type: "bytes32"
      },
      {
        name: "_propertyPrice",
        type: "uint256"
      },
      {
        name: "_isMortage",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getSellerInfo",
    outputs: [{
        name: "_sellerName",
        type: "bytes32"
      },
      {
        name: "_sellerAddress",
        type: "bytes32"
      },
      {
        name: "_sellerCity",
        type: "bytes32"
      },
      {
        name: "_sellerCountry",
        type: "bytes32"
      },
      {
        name: "_sellerPhone",
        type: "bytes32"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{
        name: "newOwner",
        type: "address"
      },
      {
        name: "_purchaserName",
        type: "bytes32"
      },
      {
        name: "_purchaserAddress",
        type: "bytes32"
      },
      {
        name: "_purchaserCity",
        type: "bytes32"
      },
      {
        name: "_purchaserCountry",
        type: "bytes32"
      },
      {
        name: "_purchaserPhone",
        type: "bytes32"
      }
    ],
    name: "transferOwnership",
    outputs: [{
      name: "",
      type: "bool"
    }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{
      name: "_isMortage",
      type: "bool"
    }],
    name: "setMortage",
    outputs: [{
      name: "",
      type: "bool"
    }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getPurchaserInfo",
    outputs: [{
        name: "_purchaserName",
        type: "bytes32"
      },
      {
        name: "_purchaserAddress",
        type: "bytes32"
      },
      {
        name: "_purchaserCity",
        type: "bytes32"
      },
      {
        name: "_purchaserCountry",
        type: "bytes32"
      },
      {
        name: "_purchaserPhone",
        type: "bytes32"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{
      name: "newPrice",
      type: "uint256"
    }],
    name: "setNewPrice",
    outputs: [{
      name: "",
      type: "bool"
    }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{
        name: "_sellerName",
        type: "bytes32"
      },
      {
        name: "_sellerAddress",
        type: "bytes32"
      },
      {
        name: "_sellerCity",
        type: "bytes32"
      },
      {
        name: "_sellerCountry",
        type: "bytes32"
      },
      {
        name: "_sellerPhone",
        type: "bytes32"
      },
      {
        name: "_buildingName",
        type: "bytes32"
      },
      {
        name: "_unitAddress",
        type: "bytes32"
      },
      {
        name: "_unitNumber",
        type: "bytes32"
      },
      {
        name: "_city",
        type: "bytes32"
      },
      {
        name: "_country",
        type: "bytes32"
      },
      {
        name: "_coveredArea",
        type: "bytes32"
      },
      {
        name: "_numberOfParking",
        type: "bytes32"
      },
      {
        name: "_propertyPrice",
        type: "uint256"
      },
      {
        name: "_isMortage",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [{
        indexed: true,
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  }
];

router.get("/watchProperty/:contract_address", async function (req, res) {
  let arraydata = [];

  let contractAddress = req.params.contract_address;

  try {
    const instance = await new web3.eth.Contract(abi, contractAddress);

    await instance.methods.watchProperty().call((req, res) => {
      arraydata.push(res);
    });
    await instance.methods.getSellerInfo().call((req, res) => {
      arraydata.push(res);
    });
    await instance.methods.getPurchaserInfo().call((req, res) => {
      arraydata.push(res);
    });

    res.json({
      instanceAddress: contractAddress,
      watchProperty: {
        buildingName: web3.utils.hexToUtf8(arraydata[0][0]),
        unitAddress: web3.utils.hexToUtf8(arraydata[0][1]),
        unitNumber: web3.utils.hexToUtf8(arraydata[0][2]),
        city: web3.utils.hexToUtf8(arraydata[0][3]),
        country: web3.utils.hexToUtf8(arraydata[0][4]),
        coveredArea: web3.utils.hexToUtf8(arraydata[0][5]),
        numberOfParking: web3.utils.hexToUtf8(arraydata[0][6]),
        propertyPrice: arraydata[0][7],
        isMortage: arraydata[0][8],
        sellerName: web3.utils.hexToUtf8(arraydata[1][0]),
        sellerAddress: web3.utils.hexToUtf8(arraydata[1][1]),
        sellerCity: web3.utils.hexToUtf8(arraydata[1][2]),
        sellerCountry: web3.utils.hexToUtf8(arraydata[1][3]),
        sellerPhone: web3.utils.hexToUtf8(arraydata[1][4]),
        purchaseName: web3.utils.hexToUtf8(arraydata[2][0]),
        purchaseAddress: web3.utils.hexToUtf8(arraydata[2][1]),
        purchaseCity: web3.utils.hexToUtf8(arraydata[2][2]),
        purchaseCountry: web3.utils.hexToUtf8(arraydata[2][3]),
        purchaserPhone: web3.utils.hexToUtf8(arraydata[2][4])
      }
    });
  } catch (e) {
    return res.status(400).json({
      msg: "invalid contract address",
      e,
      statuscode: 4
    });
  }
});

router.post("/setPrice", async function (request, response) {
  let fromAddress = request.body.from_address;
  let privateKey = request.body.from_private_key;
  let contractAddress = request.body.contract_address;
  let price = request.body.price;

  try {
    const bbal = await web3.eth.getBalance(fromAddress);

    if (bbal == "0") {
      response.status(400).json("You do not have sufficient balance");
    }

    const contract = await new web3.eth.Contract(abi, contractAddress);
    let count = await web3.eth.getTransactionCount(fromAddress);

    web3.eth.defaultAccount = fromAddress;
    const tx_builder = await contract.methods.setNewPrice(price);

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
      chainId: 0x04
    };
    // console.log('transaction ', transactionObject)
    web3.eth.accounts
      .signTransaction(transactionObject, privateKey)
      .then(signedTx => {
        web3.eth.sendSignedTransaction(signedTx.rawTransaction, async function (
          err,
          hash
        ) {
          if (!err) {
            console.log("hash is : ", hash);
            return response.status(200).json({
              msg: "Transaction is in mining state. For more info please watch transaction hash on ropsten explorer",
              hash: hash
            });
          } else {
            return response.status(400).json({
              msg: `Bad Request ${err}`
            });
          }
        });
      })
      .catch(err => {
        return response.status(400).json({
          msg: `Your contract parameters are not correct:  ${err}`
        });
      });
  } catch (e) {
    return response.status(400).json({
      msg: "invalid transaction signing",
      e,
      statuscode: 4
    });
  }
});

router.post("/setMortage", async function (request, response) {
  let fromAddress = request.body.from_address;
  let privateKey = request.body.from_private_key;
  let contractAddress = request.body.contract_address;
  let isMortage = request.body.isMortage;

  try {
    const bbal = await web3.eth.getBalance(fromAddress);

    if (bbal == "0") {
      response.status(400).json("You do not have sufficient balance");
    }

    const contract = await new web3.eth.Contract(abi, contractAddress);
    let count = await web3.eth.getTransactionCount(fromAddress);

    web3.eth.defaultAccount = fromAddress;
    const tx_builder = await contract.methods.setMortage(isMortage);

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
      chainId: 0x04
    };
    // console.log('transaction ', transactionObject)
    web3.eth.accounts
      .signTransaction(transactionObject, privateKey)
      .then(signedTx => {
        web3.eth.sendSignedTransaction(signedTx.rawTransaction, async function (
          err,
          hash
        ) {
          if (!err) {
            console.log("hash is : ", hash);
            return response.status(200).json({
              msg: "Transaction is in mining state. For more info please watch transaction hash on ropsten explorer",
              hash: hash
            });
          } else {
            return response.status(400).json({
              msg: `Bad Request ${err}`
            });
          }
        });
      })
      .catch(err => {
        return response.status(400).json({
          msg: `Your contract parameters are not correct:  ${err}`
        });
      });
  } catch (e) {
    return response.status(400).json({
      msg: "invalid transaction signing",
      e,
      statuscode: 4
    });
  }
});

router.post("/transferOwnership", async function (request, response) {
  let fromAddress = request.body.from_address;
  let privateKey = request.body.from_private_key;
  let contractAddress = request.body.contract_address;
  let newOwner = request.body.newOwnerAddress;
  let purchaserName = web3.utils.utf8ToHex(request.body.purchaserName);
  let purchaserAddress = web3.utils.utf8ToHex(request.body.purchaserAddress);
  let purchaserCity = web3.utils.utf8ToHex(request.body.purchaserCity);
  let purchaserCountry = web3.utils.utf8ToHex(request.body.purchaserCountry);
  let purchaserPhone = web3.utils.utf8ToHex(request.body.purchaserPhone);

  //   try {
  const bbal = await web3.eth.getBalance(fromAddress);

  if (bbal == "0") {
    response.status(400).json("You do not have sufficient balance");
  }
  const contract = await new web3.eth.Contract(abi, contractAddress);
  let count = await web3.eth.getTransactionCount(fromAddress);

  web3.eth.defaultAccount = fromAddress;
  const tx_builder = await contract.methods.transferOwnership(
    newOwner,
    purchaserName,
    purchaserAddress,
    purchaserCity,
    purchaserCountry,
    purchaserPhone
  );

  let encoded_tx = tx_builder.encodeABI();

  let gasPrice = await web3.eth.getGasPrice();
  let gasLimit = 200000;

  console.log("gasg limit : ", gasLimit);

  let transactionObject = {
    nonce: web3.utils.toHex(count),
    from: fromAddress,
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(gasLimit),
    to: contractAddress,
    data: encoded_tx,
    chainId: 0x04
  };
  // console.log('transaction ', transactionObject)
  web3.eth.accounts
    .signTransaction(transactionObject, privateKey)
    .then(signedTx => {
      web3.eth.sendSignedTransaction(signedTx.rawTransaction, async function (
        err,
        hash
      ) {
        if (!err) {
          console.log("hash is : ", hash);
          return response.status(200).json({
            msg: "Transaction is in mining state. For more info please watch transaction hash on ropsten explorer",
            hash: hash
          });
        } else {
          return response.status(400).json({
            msg: `Bad Request ${err}`
          });
        }
      });
    })
    .catch(err => {
      return response.status(400).json({
        msg: `Your contract parameters are not correct:  ${err}`
      });
    });
  //   } catch (e) {
  //     return response.status(400).json({
  //       msg: "invalid transaction signing",
  //       e,
  //       statuscode: 4
  //     });
  //   }
});

module.exports = router;