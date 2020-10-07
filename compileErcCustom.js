//it compile the solidity contract in contract folder
const path = require('path') //we read the file inbox.sol not use require('path here') it create problem in different linux unix compatibilti
const fs = require('fs');
const solc = require('solc')
const inboxPath = path.resolve(__dirname, 'ErcCustom.sol')
const source = fs.readFileSync(inboxPath, 'utf8'); //byte code we deployee to the ethereum network this byte store and execute on the blockchain it contain our code
// //  console.log(solc.compile(source.toString(),1));
// const bytecode = solc.compile(source.toString(), 1)
// console.log(bytecode)
// console.log(bytecode)

console.log('compiled -- ')
module.exports = solc.compile(source.toString(), 1).contracts[':ErcCustom']