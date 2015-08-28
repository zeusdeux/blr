const peg          = require('pegjs');
const join         = require('path').join;
const readFileSync = require('fs').readFileSync;


module.exports = peg.buildParser(
  readFileSync(join(__dirname, './blr.pegjs'), 'utf8')
).parse;
