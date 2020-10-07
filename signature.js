//This module help to listen request
var express = require("express");
var router = express.Router();
var bitcoin = require('bitcoinjs-lib') // v3.x.x
var bitcoinMessage = require('bitcoinjs-message') // 
// ---------------------------------Create Account----------------------------------------------
router.get("/sign", async function (request, response) {

    try {

        var keyPair = bitcoin.ECPair.fromWIF(request.body.wifKey)
        console.log(keyPair)
        var privateKey = keyPair.d.toBuffer(32)
        var message = request.body.message;
        var signature = bitcoinMessage.sign(message, privateKey, keyPair.compressed)
        console.log(signature.toString('base64'))
        response.json({
            sign: signature.toString('base64'),
            message: message
        })

    } catch (error) {
        response.json({
            err: 'General error : ' + error
        })
    }

});

// ---------------------------------Create Account----------------------------------------------
router.get("/verify", async function (request, response) {

    try {
        var address = request.body.address
        var signature = request.body.signature
        var message = request.body.message
        let res = bitcoinMessage.verify(message, address, signature);
        if (res == true) {
            response.json({
                isValid: res
            })
        } else {
            response.json({
                isValid: res
            })
        }
    } catch (error) {
        response.json({
            err: 'General error : ' + error
        })
    }

});

module.exports = router;