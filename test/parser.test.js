'use strict';

const fixtures = [
  /* Atoms */
  '1\n', '-1\n', '1.1\n', '-1.1\n', '(1)\n', '(-0.23123)\n',
  'true\n', 'false\n', '(true)\n',
  '"string"\n', '"dude what"\n', '" "\n', '("\t")\n', '"dude what\t"\n',
  'a\n', '_id\n', 'asd123\n', '(asd)\n',

  /* Operator expression */
  '1 + 2\n', '1 * 2\n', '1 / 2\n', 'a - b\n',
  'a < b\n', 'true && false\n',

  /* Var assignment */
  'let a = 10\n', 'let n = -11\n', 'let boop = -11.12\n',
  'let _internal = "dude"\n',
  'let bool = true\n', 'let bool = false\n',
  'let a = (1)\n', 'let obj = (true)\n', 'let obj = ("dude")\n',

  /* Block assignment */
  'let add x y = {\n "dude"\n}\n', 'let add x y = {\n  x + y\n  1\n}\n',

  /* Function invocation */
  'print "test"\n', 'print a b\n', 'print 10\n', 'print (1 + 2)\n',
  'print (true && false) (1 / 2)\n', 'n <= 0\n', 'print "omg a is %d" a\n',

  /* Ternary Expression */
  'true? 1 : 2\n', 'true? {\n  print "true"\n  1\n}:{\n print "false"\n}\n',
  'n 0? 1 : 2;', 'a && b? 1 : false\n',
  '(n <= 1)? {\n  1\n} : {\n (1 + 2)\n}\n',

  /* fib.blr */
  'let fib n = {\n  n <= 1?{\n    1\n}:{\n    fib (n-1) + fib (n-2)\n}\n}\n'
];

module.exports = fixtures;
