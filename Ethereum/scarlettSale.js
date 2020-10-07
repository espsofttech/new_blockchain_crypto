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
	"constant": false,
	"inputs": [{
		"name": "_amount",
		"type": "uint256"
	}],
	"name": "withdrawTokens",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "_saleSupply",
	"outputs": [{
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "weiRaised",
	"outputs": [{
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "_endTime",
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
		"name": "recipients",
		"type": "address[]"
	}, {
		"name": "values",
		"type": "uint256[]"
	}],
	"name": "transferFunds",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "wallet",
	"outputs": [{
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "owner",
	"outputs": [{
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"name": "beneficiary",
		"type": "address"
	}],
	"name": "buyTokens",
	"outputs": [],
	"payable": true,
	"stateMutability": "payable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "hasEnded",
	"outputs": [{
		"name": "",
		"type": "bool"
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
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "_startTime",
	"outputs": [{
		"name": "",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "token",
	"outputs": [{
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{
		"name": "wallet",
		"type": "address"
	}, {
		"name": "token",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "constructor"
}, {
	"payable": true,
	"stateMutability": "payable",
	"type": "fallback"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"name": "purchaser",
		"type": "address"
	}, {
		"indexed": true,
		"name": "beneficiary",
		"type": "address"
	}, {
		"indexed": false,
		"name": "value",
		"type": "uint256"
	}, {
		"indexed": false,
		"name": "amount",
		"type": "uint256"
	}],
	"name": "TokensPurchased",
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
}]
var contractAddress = '0xd7F54a12dD9eB3EDA301d53B928829EB13358d66'
//----------------------------------Send Tokens----------------------------------------------
// let contract = new web3.eth.Contract(abi, contractAddress);
router.post("/buy", async function (request, response) {
	let fromAddress = request.body.from_address;
	let privateKey = request.body.from_private_key;
	let etherValue = request.body.value;

	try {
		let bufferedKey = ethUtil.toBuffer(privateKey);

		if (
			ethereum_address.isAddress(fromAddress) &&
			ethereum_address.isAddress(fromAddress) &&
			ethUtil.isValidPrivate(bufferedKey)
		) {

			etherValue = web3.utils.toWei(etherValue, "ether");
			const contract = await new web3.eth.Contract(abi, contractAddress);
			let count = await web3.eth.getTransactionCount(fromAddress);

			web3.eth.defaultAccount = fromAddress;

			console.log("0000000");
			const tx_builder = await contract.methods.buyTokens(fromAddress);

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
				value: web3.utils.toHex(etherValue),
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
							}
							console.log(err)
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


module.exports = router;