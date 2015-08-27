const parserTests = require('./parser.test');
// const interpreterTests = require('./interpreter.test');
const parser = require('../src/parser');
const d = require('debug')('tests');


parserTests.forEach(function(fixture) {
  d(fixture);
  d(JSON.stringify(parser(fixture), null, 4));
  d('--------------------------------------------------');
});
