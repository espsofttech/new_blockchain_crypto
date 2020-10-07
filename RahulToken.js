//This module help to listen request
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

router.get("/getBalance/:wallet_address/:contract_address", async (req, response) => {
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
});

router.get("/getinfo/:contract_address", async (req, response) => {
    let data = [];
    let contractAddress = req.params.contract_address;
    try {
        const instance = await new web3.eth.Contract(abi, contractAddress);
        await instance.methods.name().call((req, res) => {
            data.push(res);
            console.log(res)
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
        })

    } catch (e) {
        return response.status(400).json({
            msg: 'invalid contract address',
            e,
            statuscode: 4
        })
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
module.exports = router;