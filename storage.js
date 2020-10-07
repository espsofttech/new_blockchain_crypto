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
    "constant": false,
    "inputs": [{
        "name": "_name",
        "type": "string"
    }, {
        "name": "addr",
        "type": "address"
    }],
    "name": "add_uni",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "_hash",
        "type": "string"
    }, {
        "name": "addr",
        "type": "address"
    }],
    "name": "store_hash",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "addr",
        "type": "address"
    }],
    "name": "get_hash",
    "outputs": [{
        "name": "_hash",
        "type": "string[]"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "",
        "type": "address"
    }],
    "name": "data",
    "outputs": [{
        "name": "name",
        "type": "string"
    }, {
        "name": "userAddress",
        "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "addr",
        "type": "address"
    }],
    "name": "get_uni",
    "outputs": [{
        "name": "_name",
        "type": "string"
    }, {
        "name": "_addr",
        "type": "address"
    }, {
        "name": "_hash",
        "type": "string[]"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}]

var contractAddress = '0x1959a2248591b1d44113e55480a77d571fb74347';


router.get("/getUni/:address", async function (req, res) {
    let data;

    try {
        const instance = await new web3.eth.Contract(abi, contractAddress);


        await instance.methods.get_uni(req.params.address).call((req, res) => {
            let obj = {
                name: res._name,
                userAddress: res._addr,
                hash: res._hash,
            }
            data = obj
        });

        return res.json({
            data,
        });

    } catch (e) {
        return res.status(400).json({
            msg: "Internal server error",
            e,
            statuscode: 4
        });
    }
});

router.get("/getHash/:address", async function (req, res) {
    let data;

    try {
        const instance = await new web3.eth.Contract(abi, contractAddress);


        await instance.methods.get_hash(req.params.address).call((req, res) => {
            data = res
        });

        return res.json({
            data,
        });

    } catch (e) {
        return res.status(400).json({
            msg: "Internal server error",
            e,
            statuscode: 4
        });
    }
})

router.post("/addUni", async function (request, response) {
    let fromAddress = request.body.from_address;
    let privateKey = request.body.from_private_key;
    let name = request.body.name;
    let address = request.body.address;

    try {
        const bbal = await web3.eth.getBalance(fromAddress);
        console.log(typeof bbal)
        if (bbal == "0") {
            response.status(400).json("You do not have sufficient balance");
        }

        const contract = await new web3.eth.Contract(abi, contractAddress);
        let count = await web3.eth.getTransactionCount(fromAddress);

        web3.eth.defaultAccount = fromAddress;
        const tx_builder = await contract.methods.add_uni(name, address);

        let encoded_tx = tx_builder.encodeABI();

        let gasPrice = await web3.eth.getGasPrice();


        let gasLimit = 100000
        let transactionObject = {
            nonce: web3.utils.toHex(count),
            from: fromAddress,
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(gasLimit),
            to: contractAddress,
            data: encoded_tx,
            chainId: 0x01
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
                        return response.status(200).json({
                            msg: "Transaction is in mining state. For more info please watch transaction hash on rinkeby explorer",
                            hash: hash
                        });

                    } else {
                        return response.status(400).json({
                            msg: `Bad RequeorderBookst ${err}`
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

router.post("/storeHash", async function (request, response) {
    let fromAddress = request.body.from_address;
    let privateKey = request.body.from_private_key;
    let hash = request.body.hash;
    let address = request.body.address;

    try {
        const bbal = await web3.eth.getBalance(fromAddress);
        console.log(typeof bbal)
        if (bbal == "0") {
            response.status(400).json("You do not have sufficient balance");
        }

        const contract = await new web3.eth.Contract(abi, contractAddress);
        let count = await web3.eth.getTransactionCount(fromAddress);

        web3.eth.defaultAccount = fromAddress;
        const tx_builder = await contract.methods.store_hash(hash, address);

        let encoded_tx = tx_builder.encodeABI();

        let gasPrice = await web3.eth.getGasPrice();

        let gasLimit = 200000

        let transactionObject = {
            nonce: web3.utils.toHex(count),
            from: fromAddress,
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(gasLimit),
            to: contractAddress,
            data: encoded_tx,
            chainId: 0x01
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
                        return response.status(200).json({
                            msg: "Transaction is in mining state. For more info please watch transaction hash on rinkeby explorer",
                            hash: hash,
                        });
                    } else {
                        return response.status(400).json({
                            msg: `Bad RequeorderBookst ${err}`
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

router.post("/editUni", async function (request, response) {
    let fromAddress = request.body.from_address;
    let privateKey = request.body.from_private_key;
    let name = request.body.name;
    let address = request.body.address;

    try {
        const bbal = await web3.eth.getBalance(fromAddress);
        console.log(typeof bbal)
        if (bbal == "0") {
            response.status(400).json("You do not have sufficient balance");
        }

        const contract = await new web3.eth.Contract(abi, contractAddress);
        let count = await web3.eth.getTransactionCount(fromAddress);

        web3.eth.defaultAccount = fromAddress;
        const tx_builder = await contract.methods.add_uni(name, address);

        let encoded_tx = tx_builder.encodeABI();

        let gasPrice = await web3.eth.getGasPrice();
        let gasLimit = 100000

        let transactionObject = {
            nonce: web3.utils.toHex(count),
            from: fromAddress,
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(gasLimit),
            to: contractAddress,
            data: encoded_tx,
            chainId: 0x01
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
                        return response.status(200).json({
                            msg: "Transaction is in mining state. For more info please watch transaction hash on rinkeby explorer",
                            hash: hash,
                        });

                    } else {
                        return response.status(400).json({
                            msg: `Bad RequeorderBookst ${err}`
                        });
                    }
                });
            })

    } catch (e) {
        return response.status(400).json({
            msg: "invalid transaction signing",
            e,
            statuscode: 4
        });
    }
});


module.exports = router;