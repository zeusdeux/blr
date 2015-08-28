const parserTests = require('./parser.test');
const interpreterTests = require('./interpreter.test');
const parser = require('../src/parser');
const interpreter = require('../src/interpreter');
const dP = require('debug')('parse');
const dI = require('debug')('interpret');
const s = require('../src/scope');


function exceptionHandler(e) {
  if ('number' === typeof e.offset) {
    dP('Parse error:', e.message);
    dP('    Offset: %d Line: %d Column: %d', e.offset, e.line, e.column);
    dP('    Expected: %s\n    Found: %s', e.expected.map(v => v.description).join(', '), e.found);
  }
  else dP(e.stack);
  process.exit(1);
}

parserTests.forEach(function(fixture) {
  try {
    dP('Fixture: %s', fixture);
    dP('AST: %s', JSON.stringify(parser(fixture), null, 4));
    dP('--------------------------------------------------');
  }
  catch (e) {
    exceptionHandler(e);
  }
});

dP('**************************************************');

interpreterTests.forEach(fixture => {
  try {
    dI('Fixture: %s', fixture);
    // dI('AST: %s', JSON.stringify(parser(fixture), null, 4));
    dI(
      'Return value: %o',
      interpreter(
        s.newScope(new Map().set('print', console.log.bind(console))),
        parser(fixture)
      )
    );
    dI('--------------------------------------------------');
  }
  catch (e) {
    exceptionHandler(e);
  }
});
