var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var signature = require("./signature");

app.use(cors());
app.use(
  bodyParser.json({
    type: "application/json",
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


var eth = require("./eth");
var testeth = require("./testeth");

var erc1404 = require("./erc1404");

var token = require("./token");

var testtoken = require("./testtoken");


var ercCustom = require("./ercCustom");



var erc1155 = require("./erc1155");

var deployErcCustom = require("./deployErcCustom");

var storage = require("./storage");

app.use("/api/eth", eth);

app.use("/api/testeth", testeth);



app.use("/api/signature", signature);


app.use("/api/tok", token);
app.use("/api/storage", storage);
app.use("/api/testtok", testtoken);


app.use("/api/erc", ercCustom);
app.use("/api/erccustom", deployErcCustom);



app.use("/api/erc1155", erc1155);

app.use("/api/erc1404", erc1404);



app.get("/", function (request, response) {
  response.contentType("application/json");
  response.end(JSON.stringify("Node is running"));
});

app.get("*", function (req, res) {
  return res.status(404).json({
    msg: "Page Not Found",
  });
});

app.post("*", function (req, res) {
  return res.status(404).json({
    msg: "Page Not Found",
  });
});

if (module === require.main) {
  var server = app.listen(process.env.PORT || 7001, function () {
    var port = server.address().port;
    console.log("App listening on port %s", port);
  });
}
