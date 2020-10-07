var express = require("express");
var router = express.Router();
const Web3 = require("web3");
const web3 = new Web3();

web3.setProvider(
    new web3.providers.HttpProvider(
        "https://ropsten.infura.io/v3/0148422f7f26401b9c90d085d2d3f928"
    )
);

var abi = [{
        "constant": true,
        "inputs": [{
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "balanceOf",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "name": "_initialSupply",
                "type": "uint256"
            },
            {
                "name": "_uri",
                "type": "string"
            }
        ],
        "name": "create",
        "outputs": [{
            "name": "_id",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "name": "_interfaceId",
            "type": "bytes4"
        }],
        "name": "supportsInterface",
        "outputs": [{
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_ids",
                "type": "uint256[]"
            },
            {
                "name": "_values",
                "type": "uint256[]"
            },
            {
                "name": "_data",
                "type": "bytes"
            }
        ],
        "name": "safeBatchTransferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
                "name": "_owners",
                "type": "address[]"
            },
            {
                "name": "_ids",
                "type": "uint256[]"
            }
        ],
        "name": "balanceOfBatch",
        "outputs": [{
            "name": "",
            "type": "uint256[]"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "name": "_uri",
                "type": "string"
            },
            {
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "setURI",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "name": "_operator",
                "type": "address"
            },
            {
                "name": "_approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "nonce",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "name": "",
            "type": "uint256"
        }],
        "name": "creators",
        "outputs": [{
            "name": "",
            "type": "address"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "name": "_id",
                "type": "uint256"
            },
            {
                "name": "_to",
                "type": "address[]"
            },
            {
                "name": "_quantities",
                "type": "uint256[]"
            }
        ],
        "name": "mint",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [{
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_id",
                "type": "uint256"
            },
            {
                "name": "_value",
                "type": "uint256"
            },
            {
                "name": "_data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "name": "_operator",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "TransferSingle",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "name": "_operator",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_ids",
                "type": "uint256[]"
            },
            {
                "indexed": false,
                "name": "_values",
                "type": "uint256[]"
            }
        ],
        "name": "TransferBatch",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "name": "_owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_operator",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": false,
                "name": "_value",
                "type": "string"
            },
            {
                "indexed": true,
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "URI",
        "type": "event"
    }
]
let contractAddress = '0x11af272b988f3cc5070b48b9d1af3b01d058ae0c';


router.get("/getBalance/:address/:tokenId", async function (req, res) {
    let arraydata


    try {
        const instance = await new web3.eth.Contract(abi, contractAddress);

        await instance.methods.balanceOf(req.params.address, req.params.tokenId).call((req, res) => {
            arraydata = res
        });


        res.json({
            instanceAddress: contractAddress,
            walletAddress: req.params.address,
            balance: arraydata,
            tokenId: req.params.tokenId
        });
    } catch (e) {
        return res.status(400).json({
            msg: "invalid contract address",
            e,
            statuscode: 4
        });
    }
});

router.post("/create", async function (request, response) {
    let fromAddress = request.body.from_address;
    let privateKey = request.body.from_private_key;
    let uri = request.body.uri;
    let initialSupply = request.body.initial_supply;

    try {
        const bbal = await web3.eth.getBalance(fromAddress);

        if (bbal == "0") {
            response.status(400).json("You do not have sufficient balance");
        }

        const contract = await new web3.eth.Contract(abi, contractAddress);
        let count = await web3.eth.getTransactionCount(fromAddress);

        web3.eth.defaultAccount = fromAddress;
        const tx_builder = await contract.methods.create(initialSupply, uri);

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
            chainId: 0x03
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

router.post("/mintToken", async function (request, response) {
    let fromAddress = request.body.from_address;
    let privateKey = request.body.from_private_key;
    let tokenId = request.body.token_id;
    let to_address = request.body.to_address;
    let quantity = request.body.quantity;


    try {
        const bbal = await web3.eth.getBalance(fromAddress);

        if (bbal == "0") {
            response.status(400).json("You do not have sufficient balance");
        }

        const contract = await new web3.eth.Contract(abi, contractAddress);
        let count = await web3.eth.getTransactionCount(fromAddress);

        web3.eth.defaultAccount = fromAddress;
        const tx_builder = await contract.methods.mint(tokenId, to_address, quantity);

        let encoded_tx = tx_builder.encodeABI();

        let gasPrice = await web3.eth.getGasPrice();
        console.log('gasprice', gasPrice);
        let gasLimit = 500000;
        let transactionObject = {
            nonce: web3.utils.toHex(count),
            from: fromAddress,
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(gasLimit),
            to: contractAddress,
            data: encoded_tx,
            chainId: 0x03
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

module.exports = router;