// //This module help to listen request
// var express = require('express');
// var router = express.Router();
// const axios = require('axios');

// const crypto = require('crypto');
// const EC = require('elliptic').ec;
// const RIPEMD160 = require('ripemd160');
// const bs58 = require('bs58');
// const buffer = require('buffer');
// const ec = new EC('secp256k1');
// var bitcore = require('bitcore-lib');

// var Insight = require('bitcore-explorers').Insight;
// var insight = new Insight('testnet');

// // ---------------------------------Create Account----------------------------------------------
// router.get('/create_wallet/:currency', function (request, response) {
//     let currency = request.params.currency;

//     if (currency == "BTC" || currency == "btc") {
//         function hasha256(data) {
//             return crypto.createHash('sha256').update(data).digest();
//         } // A small function I created as there is a lot of sha256 hashing.

//         const addrVer = Buffer.alloc(1, 0x6f); // 0x00 P2PKH Mainnet, 0x6f P2PKH Testnet
//         const wifByte = Buffer.alloc(1, 0xEF); // 0x80 Mainnet, 0xEF Testnet

//         const key = ec.genKeyPair();
//         const privKey = key.getPrivate().toString('hex');
//         const pubPoint = key.getPublic();
//         const x = pubPoint.getX(); // elliptic x
//         const y = pubPoint.getY(); // elliptic y

//         // Private Key Hashing
//         const bufPrivKey = Buffer.from(privKey, 'hex');
//         const wifBufPriv = Buffer.concat([wifByte, bufPrivKey], wifByte.length + bufPrivKey.length);
//         const wifHashFirst = hasha256(wifBufPriv);
//         const wifHashSecond = hasha256(wifHashFirst);
//         const wifHashSig = wifHashSecond.slice(0, 4);
//         const wifBuf = Buffer.concat([wifBufPriv, wifHashSig], wifBufPriv.length + wifHashSig.length);
//         const wifFinal = bs58.encode(wifBuf);

//         // Public Key Hashing
//         const publicKey = pubPoint.encode('hex');
//         const publicKeyInitialHash = hasha256(Buffer.from(publicKey, 'hex'));
//         const publicKeyRIPEHash = new RIPEMD160().update(Buffer.from(publicKeyInitialHash, 'hex')).digest('hex');
//         const hashBuffer = Buffer.from(publicKeyRIPEHash, 'hex');
//         const concatHash = Buffer.concat([addrVer, hashBuffer], addrVer.length + hashBuffer.length);
//         const hashExtRipe = hasha256(concatHash);
//         const hashExtRipe2 = hasha256(hashExtRipe);
//         const hashSig = hashExtRipe2.slice(0, 4);
//         const bitcoinBinaryStr = Buffer.concat([concatHash, hashSig], concatHash.length + hashSig.length);

//         const bitcoinWifAddress = wifFinal.toString('hex');
//         const bitcoinAddress = bs58.encode(Buffer.from(bitcoinBinaryStr));

//         // Log our new Bitcoin Address and WIF
//         console.log("WIF Private Key : %s", bitcoinWifAddress.toString('hex'));
//         console.log("Bitcoin Address : %s", bitcoinAddress.toString('hex'));
//         var date = new Date();
//         var timestamp = date.getTime();
//         response.json({
//             wallet: {
//                 private: bitcoinWifAddress.toString('hex'),
//                 public: bitcoinAddress.toString('hex'),
//                 currency: currency,
//                 balance: 0,
//                 create_date: date,
//                 sent: 0,
//                 received: 0,
//                 link: `https://www.etherchain.org/account/${bitcoinAddress.toString('hex')}`
//             },
//             message: "",
//             timestamp: timestamp,
//             status: 200,
//             success: true
//         });
//     } else {
//         return response.status(400).json({
//             error: `Invalid Currency ${currency}`,
//             wallet: {},
//             timestamp: timestamp,
//             status: 400,
//             success: false
//         });
//     }
// });


// //-----------------------------Get Transactions of Account----------------------------------------------

// router.get('/track/:currency/:hash', async function (request, response) {

//     let hash = request.params.hash;
//     let currency = request.params.currency;
//     if (currency == "BTC" || currency == "btc") {
//         if (hash.length == 64) {
//             axios.get('/api/tx/' + hash)
//                 .then((res) => {
//                     const transactions = res.data;

//                     response.json({
//                         transaction: {
//                             hash: transactions.txid,
//                             currency: currency,
//                             from: transactions.vin[0].addr,
//                             to: transactions.vout[0].scriptPubKey.addresses[0],
//                             amount: transactions.vout[0].value,
//                             fee: transactions.fees,
//                             block: transactions.blockheight,
//                             n_confirmation: transactions.confirmations,
//                             link: `https://test-bch-insight.bitpay.com/api/tx/${hash}`
//                         },
//                         message: "",
//                         timestamp: transactions.time,
//                         status: 200,
//                         success: true
//                     });
//                 }).catch(err => response.status(404).json({
//                     hash: `Hash not Found ${err}`
//                 }))
//         } else if (hash.length == 34) {

//             axios.get(
//                 "https://test-bch-insight.bitpay.com/api/txs/?address=" + hash
//             ).then(transaction =>
//                 response.status(200).json({
//                     transaction: transaction.data
//                 }))
//         } else {
//             response.status(400).json({
//                 error: "Invalid Hash or Wallet Address"
//             })
//         }
//     } else {
//         var date = new Date();
//         var timestamp = date.getTime();
//         return response.status(400).json({
//             error: `Invalid Currency ${currency}`,
//             wallet: {},
//             timestamp: timestamp,
//             status: 400,
//             success: false
//         });
//     }
// });
// //-----------------------------Send Btc from 1 account to the others----------------------------------------------

// router.post('/transfer/:currency/:from/:to/:value/:privKey', async function (request, response) {

//     let fromAddress = request.params.from;
//     let toAddress = request.params.to;
//     let fromPrivateKey = request.params.privKey;
//     let value = parseInt(request.params.value);
//     let currency = request.params.currency;

//     if (currency == "BTC" || currency == "btc") {

//         if (toAddress.length < 34 || toAddress.length > 34) {
//             return response.status(400).json({
//                 toAddress: 'Invalid Wallet Address'
//             });
//         }
//         let privateKey = bitcore.PrivateKey.fromWIF(fromPrivateKey);
//         let _fromAddress = privateKey.toAddress();
//         // console.log('oldd  ', _fromAddress)
//         // let newAdd = _fromAddress;
//         // console.log('des', newAdd.toString());

//         // if (fromAddress != newAdd.toString()) {
//         //     return response.status(400).json({
//         //         fromAddress: 'From Address does not match with the private key'
//         //     });
//         // }

//         insight.getUnspentUtxos(_fromAddress, function (error, utxos) {
//             if (error) {
//                 console.log(error);
//                 return response.status(400).json({
//                     msg: `Transaction signing stops with the error ${error}`
//                 });
//             } else {
//                 console.log(utxos)

//                 var tx = bitcore.Transaction();
//                 tx.from(utxos);
//                 console.log('hyyy')
//                 tx.to(toAddress, value);
//                 console.log('zz')
//                 tx.change(_fromAddress);
//                 tx.fee(50000);
//                 tx.sign(privateKey);
//                 console.log("Transaction: ");
//                 console.log(tx.toObject());
//                 tx.serialize();
//                 console.log("Serialized Output:");
//                 console.log(tx.serialize());

//                 insight.broadcast(tx.toString(), function (err, returnedTxId) {
//                     if (err) {
//                         console.log(err);
//                         return response.status(400).json({
//                             msg: `Transaction broadcasting failed due to unresolved error ${err}`
//                         });
//                     } else {
//                         console.log(returnedTxId);
//                         setTimeout(function () {

//                             axios.get('https://test-bch-insight.bitpay.com/api/tx/' + returnedTxId)
//                                 .then((res) => {
//                                     const transactions = res.data;
//                                     console.log(transactions);
//                                     return response.status(200).json({
//                                         transaction: {
//                                             hash: transactions.txid,
//                                             currency: currency,
//                                             from: transactions.vin[0].addr,
//                                             to: transactions.vout[0].scriptPubKey.addresses[0],
//                                             amount: transactions.vout[0].value,
//                                             fee: transactions.fees,
//                                             block: transactions.blockheight,
//                                             n_confirmation: transactions.confirmations,
//                                             link: `https://test-bch-insight.bitpay.com/api/tx/${transactions.txid}`
//                                         },
//                                         message: "",
//                                         timestamp: transactions.time,
//                                         status: 200,
//                                         success: true
//                                     });
//                                 }).catch(err =>
//                                     response.status(404).json({
//                                         hash: `Hash not Found ${err}`
//                                     }))
//                         }, 1000);
//                     }


//                 })
//             }
//         });
//     } else {
//         var date = new Date();
//         var timestamp = date.getTime();
//         return await response.status(400).json({
//             error: `Invalid Currency ${currency}`,
//             wallet: {},
//             timestamp: timestamp,
//             status: 400,
//             success: false
//         });
//     }
// });

// //-----------------------------Get Balance of Account----------------------------------------------

// router.get('/check_balance/:currency/:walletAddress', async function (request, response) {

//     let walletAddress = request.params.walletAddress;
//     let currency = request.params.currency;

//     if (currency == "BTC" || currency == "btc") {
//         if (walletAddress.length < 34 || walletAddress.length > 34) {
//             return response.status(400).json({
//                 walletAddress: 'Invalid Wallet Address'
//             });
//         }

//         insight.address(walletAddress, function (err, res) {
//             if (err) {
//                 console.log(err)
//                 return response.status(400).json({
//                     msg: `Wallet Address ${walletAddress} not found. Search Stop on error : ${err}`
//                 })
//             } else {
//                 const balance = (res.balance / 100000000);
//                 axios
//                     .get(
//                         "https://testnet.blockexplorer.com/api/txs/?address=" + walletAddress
//                     )
//                     .then(res => {
//                         let transactions = res.data;
//                         var date = new Date();
//                         var timestamp = date.getTime();
//                         let sent = 0;
//                         let received = 0;

//                         for (let i = 0; i < transactions.txs.length; i++) {
//                             String(transactions.txs[i].vin[0].addr)
//                                 .toUpperCase()
//                                 .localeCompare(String(walletAddress).toUpperCase()) == 0 ?
//                                 (sent += 1) :
//                                 String(transactions.txs[i].vout[0].scriptPubKey.addresses[0])
//                                 .toUpperCase()
//                                 .localeCompare(String(walletAddress).toUpperCase()) == 0 ?
//                                 (received += 1) :
//                                 "";
//                         }
//                         response.json({
//                             wallet: {
//                                 address: walletAddress,
//                                 currency: currency,
//                                 balance: balance,
//                                 create_date: date,
//                                 sent: sent,
//                                 received: received,
//                                 link: `https://testnet.blockexplorer.com/address/${walletAddress}`
//                             },
//                             message: "",
//                             timestamp: timestamp,
//                             status: 200,
//                             success: true
//                         });
//                     });
//             }
//         })
//     } else {
//         var date = new Date();
//         var timestamp = date.getTime();
//         return response.status(400).json({
//             error: `Invalid Currency ${currency}`,
//             wallet: {},
//             timestamp: timestamp,
//             status: 400,
//             success: false
//         });
//     }
// });

// module.exports = router;