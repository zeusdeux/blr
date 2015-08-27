'use strict';

const fixtures = [
  /* Atoms */
  '1\n', '-1\n', '1.1\n', '-1.1\n',
  'true\n', 'false\n',
  '"string"\n',
  'a\n', '_id\n', 'asd123\n',
  '[1 2 3 "a"]\n', '[\n  1\n  2\n]\n',
  '{:a 10 :b 20}\n', '{\n  :a 20\n:b 30\n}',

  /* Var assignment */
  'let a = 10\n', 'let n = -11\n', 'let boop = -11.12\n',
  'let _internal = "dude"\n',
  'let bool = true\n', 'let bool = false\n',
  'let arr = [1 2 3 "a"]\n', 'let arr2 = [\n  1\n  2\n]\n',
  'let obj = {:a 10 :b 20}\n', 'let obj = {\n  :a 20\n:b 30\n}',
];

module.exports = fixtures;
